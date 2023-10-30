import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('id');
  if (!productId) return new Response(JSON.stringify({}), { status: 400 });

  const productDetail = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
    include: {
      productSizes: true,
    },
  });
  console.log('🚀 ~ file: route.ts:16 ~ GET ~ productDetail:', productDetail);
  if (!productDetail) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(productDetail), { status: 200 });
}
