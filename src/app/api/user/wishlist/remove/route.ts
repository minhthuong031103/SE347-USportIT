import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  if (!searchParams.get('userId')) {
    return new Response(JSON.stringify({}), { status: 400 });
  }
  const userId = parseInt(searchParams.get('userId'));
  if (!searchParams.get('productId')) {
    return new Response(JSON.stringify({}), { status: 400 });
  }
  const productId = parseInt(searchParams.get('productId'));

  try {
    const addWishList = await prisma.wishlist.update({
      where: {
        userId: userId,
      },

      data: {
        products: {
          disconnect: { id: productId },
        },
      },
    });

    return new Response(JSON.stringify(addWishList), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
