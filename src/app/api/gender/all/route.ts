import prisma from '@/lib/prisma';

export async function GET() {
  const genders = await prisma.gender.findMany();
  if (genders.length > 0) {
    return new Response(JSON.stringify({ data: genders, status: 200 }));
  } else {
    return new Response(JSON.stringify({ message: 'error' }), { status: 404 });
  }
}
