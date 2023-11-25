import prisma from '@/lib/prisma';

export async function GET() {
  const productTypes = await prisma.productType.findMany();
  if (productTypes.length > 0) {
    return new Response(JSON.stringify({ data: productTypes, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
