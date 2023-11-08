import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';

  const all = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      name: {
        contains: search,
      },
      isdeleted: false,
    },
    include: {
      productSizes: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  const total = await prisma.product.count({
    where: {
      name: {
        contains: search,
      },
      isdeleted: false,
    },
  });
  const totalPage = Math.ceil(total / limit);
  const data = {
    data: all,
    totalItems: total,
    totalPage,
  };
  return new Response(JSON.stringify(data), { status: 200 });
}
