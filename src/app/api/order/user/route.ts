import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId)
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });

  const user = parseInt(userId);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = parseInt(searchParams.get('search') || '0');

  const all = await prisma.order.findMany({
    skip: (page - 1) * limit,
    take: limit,
    where: {
      userId: user,
    },
    include: {
      user: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  const total = await prisma.order.count({
    where: {
      userId: user,
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
