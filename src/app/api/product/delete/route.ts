import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = parseInt(searchParams.get('id') || '0');

  if (id === 0) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), {
      status: 400,
    });
  }

  const deleteProduct = await prisma.product.delete({
    where: {
      id,
    },
  });

  if (deleteProduct) {
    const deleteProductSize = await prisma.productSize.deleteMany({
      where: {
        productId: id,
      },
    });

    if (deleteProductSize) {
      return new Response(JSON.stringify({ message: 'Success' }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: 'Failed' }), {
        status: 400,
      });
    }
  }
  return new Response(JSON.stringify({ message: 'Failed' }), {
    status: 400,
  });
}
