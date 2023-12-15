import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const featured = await prisma.product.findMany({
      take: 10,
      where: {
        isdeleted: false,
      },
    });
    if (featured)
      return new Response(JSON.stringify(featured), { status: 200 });
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
