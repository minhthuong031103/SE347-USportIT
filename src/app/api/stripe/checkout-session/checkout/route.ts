import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('🚀 ~ file: route.ts:7 ~ POST ~ body:', body);

    // if (!body.userId) return new Response('Unauthorized', { status: 401 });
    // const user = await prisma.user.findUnique({
    //   where: { id: body.userId },
    // });
    // const billing_url = `${process.env.NEXT_PUBLIC_SITE_URL}/agency/goi-dich-vu`;

    // if (!user) return new Response('Unauthorized', { status: 401 });
    try {
      const stripeSession = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: 'vnd',
        payment_method_types: ['card'],
        metadata: {
          // userId: user.id,
          checkedItems: JSON.stringify(body.checkedItems),
          amount: body.amount,
          userFullName: body.userFullName,
          userEmail: body.userEmail,
          userAddress: body.userAddress,
          uuid: body.uuid,
        },
      });
      console.log(
        '🚀 ~ file: route.ts:32 ~ POST ~ stripeSession:',
        stripeSession
      );
      return new Response(
        JSON.stringify({ clientSecret: stripeSession.client_secret }),
        {
          status: 200,
        }
      );
    } catch (e) {
      console.log(e);
      return new Response('Unauthorized', { status: 401 });
    }
  } catch (e) {
    console.log(e);
  }
}
