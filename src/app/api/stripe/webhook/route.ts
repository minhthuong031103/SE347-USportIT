import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (headers().get('Stripe-Signature') as string) ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature.toString(),
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.log(err?.message);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log('🚀 ~ file: route.ts:29 ~ POST ~ event.type:', event.type);

  // if (!session?.metadata?.userId) {
  //   return new Response(null, {
  //     status: 200,
  //   });
  // }
  console.log(event.type);

  // if (event.type === 'payment_intent.succeeded') {
  //   console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');

  //   console.log(
  //     '🚀 ~ file: route.ts:109 ~ POST ~ session.metadata:',
  //     session.metadata
  //   );
  // }
  if (event.type === 'charge.succeeded') {
    console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');

    const { userFullName, checkedItems, userEmail, userAddress, amount, uuid } =
      session.metadata;
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    let data = {};
    if (!user) {
      data = {
        anonymousUser: uuid,
        anonymousUserName: userFullName,
        anonymousUserEmail: userEmail,
        address: userAddress,
        total: parseFloat(amount),
      };
    } else {
      data = {
        userId: user.id,
        address: userAddress,
        total: parseFloat(amount),
      };
    }
    const orderItems = JSON.parse(checkedItems).map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
    }));
    console.log(
      '🚀 ~ file: route.ts:76 ~ orderItems ~ orderItems:',
      orderItems
    );
    console.log('🚀 ~ file: route.ts:66 ~ POST ~ data:', data);
    interface OrderItem {
      productId: number;
      quantity: number;
      selectedSize: string;
    }
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          ...data,
          orderItems: {
            createMany: { data: [...orderItems] },
          },
        },
      }),
    ]);
    for (const item of orderItems) {
      await prisma.productSize.updateMany({
        where: {
          productId: item.productId,
          size: item.selectedSize,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });
    }

    console.log('🚀 ~ file: route.ts:84 ~ POST ~ order:', order);

    //TODO: create order => xong
  }
  return new Response(JSON.stringify('ok'), { status: 200 });
}
