import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // if (!body.userId) return new Response('Unauthorized', { status: 401 });
    // const user = await prisma.user.findUnique({
    //   where: { id: body.userId },
    // });
    // const billing_url = `${process.env.NEXT_PUBLIC_SITE_URL}/agency/goi-dich-vu`;

    // if (!user) return new Response('Unauthorized', { status: 401 });
    try {
      const stripeSession = await stripe.paymentIntents.create({
        amount: 1000000,
        currency: 'vnd',
        payment_method_types: ['card'],
        metadata: {
          // userId: user.id,
          amount: body.amount,
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
