import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  if (!productId) return new Response(JSON.stringify({}), { status: 400 });
  const selectedSize = searchParams.get('selectedSize');
  if (!selectedSize) return new Response(JSON.stringify({}), { status: 400 });

  const productDetail = await prisma.product.findUnique({
    where: {
      id: parseInt(productId),
    },
    include: {
      productSizes: true,
    },
  });
  if (!productDetail) return new Response(JSON.stringify({}), { status: 404 });
  const selectedProductSizes = productDetail.productSizes.filter(
    (productSize) => productSize.size === selectedSize
  );
  return new Response(JSON.stringify(selectedProductSizes), { status: 200 });
}
