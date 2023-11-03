import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany();
  if (categories.length > 0) {
    return new Response(JSON.stringify({ data: categories, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 500 });
  }
}
