import prisma from '@/lib/prisma';

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  if (!id) {
    return new Response(JSON.stringify({ message: 'id is required' }), {
      status: 400,
    });
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: parseInt(id),
    },

    orderBy: {
      selected: 'desc', // Sort by selected in descending order (true first)
    },
  });
  const newAddresses = addresses.map((address) => {
    return {
      ...address,
      addressValue: `${address.houseNumber} ${address.street}, ${address.ward}, ${address.district}, ${address.city}`,
    };
  });
  return new Response(JSON.stringify(newAddresses));
}

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const selectedAddress = await prisma.address.findFirst({
    where: {
      userId: body.userId,
      selected: true,
    },
  });
  if (!body.userId) {
    return new Response(JSON.stringify({ message: 'userId is required' }), {
      status: 400,
    });
  }
  const address = await prisma.address.create({
    data: {
      city: body.city,
      district: body.district,
      ward: body.ward,
      street: body.street,
      houseNumber: body.houseNumber,
      userId: body.userId,
      selected: !selectedAddress,
    },
  });
  return new Response(JSON.stringify({ message: 'success', address }));
}
