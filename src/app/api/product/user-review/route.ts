import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const page = searchParams.get('reviewPage');
  const productReview = await prisma.review.findMany({
    where: {
      //Retrive only 3 reviews per page
      id: {
        gt: (parseInt(page ?? '0') - 1) * 3,
        lte: parseInt(page ?? '0') * 3,
      },
      productId: parseInt(productId ?? '0'),
    },
    take: 3,
  });
  if (!productReview) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(productReview), { status: 200 });
}
