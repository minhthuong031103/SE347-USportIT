import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const gender = await prisma.gender.findMany({});
    if (gender) return new Response(JSON.stringify(gender), { status: 200 });
  } catch (e) {
    console.log('e', e);
    return new Response(JSON.stringify(e), { status: 500 });
  }
}
