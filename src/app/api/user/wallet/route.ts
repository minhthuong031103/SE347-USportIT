import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { userId, address } = await req.json();
  if (!userId || !address)
    return new Response(JSON.stringify('User not found'), { status: 403 });
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    include: {
      wallets: true,
    },
  });
  if (!user)
    return new Response(JSON.stringify('User not found'), { status: 403 });
  if (user.wallets.length > 0) {
    return new Response(JSON.stringify('User already has a wallet'), {
      status: 403,
    });
  }
}
