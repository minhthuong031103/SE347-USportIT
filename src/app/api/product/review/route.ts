import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const productReview = await prisma.review.findMany({
    where: {
      id: parseInt(productId ?? '0'),
    },
  });
  if (!productReview) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(productReview), { status: 200 });
}
