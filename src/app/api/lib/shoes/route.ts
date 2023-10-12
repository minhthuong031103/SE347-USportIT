import prisma from '@/lib/prisma';
export async function GET() {
  try {
    const gender = await prisma.subcategory.findMany({
      where: {
        productTypeId: 1,
      },
    });
    if (gender) return new Response(JSON.stringify(gender), { status: 200 });
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
