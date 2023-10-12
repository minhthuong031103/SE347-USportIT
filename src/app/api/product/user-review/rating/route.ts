import prisma from '@/lib/prisma';

interface TotalReviewRating {
  totalReview: number;
  totalFiveStar: number;
  totalFourStar: number;
  totalThreeStar: number;
  totalTwoStar: number;
  totalOneStar: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (!searchParams.get('productId')) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  //Get the productId and reviewPage parameters
  const productId = parseInt(searchParams.get('productId') ?? '0');

  const totalReview = await prisma.review.count({
    where: {
      productId,
    },
  });
  //Declare an empty object

  //Check if productId is valid

  //Check if reviewPage is a parameter
  //If not, return all reviews for the product

  //Get the total number of reviews for the product

  //Get the total number of 5 star reviews for the product
  const totalFiveStar = await prisma.review.count({
    where: {
      productId,
      rating: 5,
    },
  });
  //Get the total number of 4 star reviews for the product
  const totalFourStar = await prisma.review.count({
    where: {
      productId,
      rating: 4,
    },
  });
  //Get the total number of 3 star reviews for the product
  const totalThreeStar = await prisma.review.count({
    where: {
      productId,
      rating: 3,
    },
  });
  //Get the total number of 2 star reviews for the product
  const totalTwoStar = await prisma.review.count({
    where: {
      productId,
      rating: 2,
    },
  });
  //Get the total number of 1 star reviews for the product
  const totalOneStar = await prisma.review.count({
    where: {
      productId,
      rating: 1,
    },
  });
  //Create an object that contains the total number of reviews
  //And the total number of reviews for each rating
  const ret: TotalReviewRating = {
    totalReview,
    totalFiveStar,
    totalFourStar,
    totalThreeStar,
    totalTwoStar,
    totalOneStar,
  };

  if (!ret) {
    return new Response(JSON.stringify({}), { status: 404 });
  }
  return new Response(JSON.stringify(ret), { status: 200 });
}

//
