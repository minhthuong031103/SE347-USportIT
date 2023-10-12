import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('productId')) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  //Get the productId and reviewPage parameters
  const productId = parseInt(searchParams.get('productId') ?? '0');
  const page = parseInt(searchParams.get('page') || '0');
  const limit = parseInt(searchParams.get('limit') || '0');

  const totalReview = await prisma.review.count({
    where: {
      productId,
    },
  });

  //If reviewPage is a parameter, return 3 reviews per page
  //Based on the reviewPage parameter
  const productReview = await prisma.review.findMany({
    where: {
      //Retrieve only 3 reviews per page
      productId: productId,
    },
    include: {
      user: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      reviewDate: 'desc',
    },
  });

  const data = {
    data: [...productReview],
    totalPages: Math.ceil(totalReview / limit),
  };

  if (!productReview) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request: Request) {
  const re = await request.json();
  const res = await prisma.review.create({
    data: {
      title: re.title,
      rating: re.rating,
      userId: re.userId,
      productId: re.productId,
      reviewDate: re.reviewDate,
      text: re.text,
      images: JSON.stringify(re.image),
    },
  });
  if (!res) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(res), { status: 200 });
}
