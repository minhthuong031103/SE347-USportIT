import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = parseInt(searchParams.get('search') || '0');

  const all = await prisma.order.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      id: search === 0 ? undefined : search,
    },
    include: {
      user: true,
      orderItems: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  //Add new field: Username
  all.forEach((order) => {
    if (order.userId != null) {
      order.username = order.user?.name;
    } else {
      order.username = 'Anonymous';
    }
  });

  const total = await prisma.order.count({
    where: {
      id: search === 0 ? undefined : search,
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
