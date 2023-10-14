import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '0');

  const productCount = await prisma.product.count({});

  const products = await prisma.product.findMany({
    take: limit,
    skip: page * limit,
  });

  const response = {
    data: [...products],
    page,
    totalPages: productCount / limit,
    totalItems: productCount,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
