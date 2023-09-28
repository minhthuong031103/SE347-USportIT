import { getRequest } from '@/lib/fetch';

export const useReview = () => {
  const onGetProductReview = async (productId, page) => {
    const productReview = await getRequest({
      endPoint: `/api/product/user-review?productId=${productId}&reviewPage=${page}`,
    });

    return productReview;
  };

  return { onGetProductReview };
};

export const useReviewCount = () => {
  const onGetProductReviewCount = async (productId) => {
    const productReview = await getRequest({
      endPoint: `/api/product/user-review?productId=${productId}`,
    });

    return productReview;
  };

  return { onGetProductReviewCount };
};
