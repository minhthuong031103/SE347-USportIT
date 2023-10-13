import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productTypeValue = searchParams.get('productTypeValue') || '';
  const subCategories = await prisma.subcategory.findMany({
    where: {
      productType: {
        name: productTypeValue,
      },
    },
  });
  if (subCategories.length > 0) {
    return new Response(JSON.stringify({ data: subCategories, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
