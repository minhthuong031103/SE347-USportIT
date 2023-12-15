import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.userId)
    return new Response(JSON.stringify({ message: 'userId is required' }), {
      status: 400,
    });
  const t = await prisma.$transaction([
    prisma.user.update({
      data: {
        name: body.name,
        avatar: body.avatar,
      },
      where: {
        id: parseInt(body.userId),
      },
    }),
    prisma.address.updateMany({
      where: {
        userId: parseInt(body.userId),
        selected: true,
      },
      data: {
        selected: false,
      },
    }),
    prisma.address.update({
      where: {
        id: parseInt(body.selectedAddress),
      },
      data: {
        selected: true,
      },
    }),
  ]);
  if (!t)
    return new Response(JSON.stringify({ message: 'error' }), { status: 400 });
  return new Response(JSON.stringify({ message: 'success', t }));
}
