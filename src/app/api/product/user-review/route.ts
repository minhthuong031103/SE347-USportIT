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

  //Get the productId and reviewPage parameters
  const productId = searchParams.get('productId');
  const page = searchParams.get('reviewPage');

  //Declare an empty object
  let productReview = Object(null);
  //Check if productId is valid
  if (!productId) {
    return new Response(JSON.stringify({}), { status: 404 });
  } else {
    //Check if reviewPage is a parameter
    //If not, return all reviews for the product
    if (!page) {
      //Get the total number of reviews for the product
      const totalReview = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
        },
      });
      //Get the total number of 5 star reviews for the product
      const totalFiveStar = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
          rating: 5,
        },
      });
      //Get the total number of 4 star reviews for the product
      const totalFourStar = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
          rating: 4,
        },
      });
      //Get the total number of 3 star reviews for the product
      const totalThreeStar = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
          rating: 3,
        },
      });
      //Get the total number of 2 star reviews for the product
      const totalTwoStar = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
          rating: 2,
        },
      });
      //Get the total number of 1 star reviews for the product
      const totalOneStar = await prisma.review.count({
        where: {
          productId: parseInt(productId ?? '0'),
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
      productReview = ret;
    } else {
      //If reviewPage is a parameter, return 3 reviews per page
      //Based on the reviewPage parameter
      productReview = await prisma.review.findMany({
        where: {
          //Retrieve only 3 reviews per page
          id: {
            gt: (parseInt(page ?? '0') - 1) * 3,
            lte: parseInt(page ?? '0') * 3,
          },
          productId: parseInt(productId ?? '0'),
        },
        take: 3,
      });
    }
    if (!productReview) {
      return new Response(JSON.stringify({}), { status: 404 });
    }
    return new Response(JSON.stringify(productReview), { status: 200 });
  }
}
