import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = parseInt(searchParams.get('orderId') || '0');
    if (!orderId) return new Response(JSON.stringify({}), { status: 400 });

    const orderDetail = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
        orderItems: true,
      },
    });
    const data = {
      data: orderDetail,
    };

    console.log('🚀 ~ file: route.ts:16 ~ GET ~ orderDetail:', orderDetail);
    if (!orderDetail) return new Response(JSON.stringify({}), { status: 404 });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log('🚀 ~ file: route.ts:16 ~ GET ~ error:', error);
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
