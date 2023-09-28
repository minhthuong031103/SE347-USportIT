import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const productDetail = await prisma.product.findUnique({
    where: {
      id: parseInt(productId ?? '0'),
    },
  });
  if (!productDetail) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(productDetail), { status: 200 });
}
