import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const userDetail = await prisma.user.findUnique({
    select: {
      name: true,
    },
    where: {
      id: parseInt(userId ?? '0'),
    },
  });
  if (!userDetail) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(userDetail), { status: 200 });
}
