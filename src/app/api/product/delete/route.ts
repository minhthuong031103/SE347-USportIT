import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  console.log('🚀 ~ file: route.ts:5 ~ POST ~ searchParams:', searchParams);

  const id = parseInt(searchParams.get('productId') || '0');

  if (id === 0) {
    return new Response(JSON.stringify({ message: 'Invalid ID' }), {
      status: 400,
    });
  }

  const deleteProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      isdeleted: true,
    },
  });

  if (deleteProduct) {
    return new Response(JSON.stringify({ message: 'Success', status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'Failed', status: 400 }));
  }
}
