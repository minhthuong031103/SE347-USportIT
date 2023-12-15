import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') || new Date().toISOString();
  const to = searchParams.get('to') || new Date().toISOString();
  console.log('from: ' + from + ' to: ' + to);

  const orders = await prisma.order.findMany({
    where: {
      orderDate: {
        gte: from,
        lte: to,
      },
    },
  });
  if (orders.length > 0) {
    return new Response(JSON.stringify({ data: orders, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 404 });
  }
}
