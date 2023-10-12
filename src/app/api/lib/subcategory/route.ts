import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('productTypeId')) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  const productTypeId = parseInt(searchParams.get('productTypeId') ?? '0');
  const data = await prisma.subcategory.findMany({
    where: {
      productTypeId,
    },
  });

  if (!data) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}
