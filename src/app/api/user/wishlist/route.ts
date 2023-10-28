import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    if (!searchParams.get('userId')) {
      return new Response(JSON.stringify({}), { status: 400 });
    }
    const userId = parseInt(searchParams.get('userId'));

    const wishlist = await prisma.wishlist.findFirst({
      include: {
        products: true,
      },
      where: {
        userId,
      },
    });

    if (wishlist) {
      return new Response(JSON.stringify(wishlist.products), { status: 200 });
    } else {
      return new Response(JSON.stringify({}), { status: 404 });
    }
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
