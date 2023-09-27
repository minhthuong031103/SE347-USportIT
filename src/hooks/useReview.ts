import { getRequest } from '@/lib/fetch';

export const useReview = () => {
  const onGetProductReview = async (slug) => {
    const productReview = await getRequest({
      endPoint: `${process.env.API_HOST}/api/product/review?productId=${slug}`,
    });

    // const data = await productReview?.json();

    return productReview;
  };

  return { onGetProductReview };
};
