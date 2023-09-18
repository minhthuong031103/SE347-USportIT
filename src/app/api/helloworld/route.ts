import prisma from '@/lib/prisma';

const log = async () => {
  const userFound = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });
  return userFound;
};

export async function GET() {
  const user = await log();

  return new Response(JSON.stringify({ user }), { status: 200 });
}

// select * from user where email = 'email' and password = 'password'
