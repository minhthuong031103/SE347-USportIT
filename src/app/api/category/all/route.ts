import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  if (categories) {
    return new Response(JSON.stringify(categories), { status: 200 });
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
