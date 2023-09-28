import { getRequest } from '@/lib/fetch';

export const useReview = () => {
  const onGetProductReview = async (productId, page) => {
    const productReview = await getRequest({
      endPoint: `/api/product/user-review?productId=${productId}&reviewPage=${page}`,
    });

    return productReview;
  };

  const onGetProductReviewRating = async (productId) => {
    const productReviewRating = await getRequest({
      endPoint: `/api/product/user-review?productId=${productId}`,
    });

    return productReviewRating;
  };
  return { onGetProductReview, onGetProductReviewRating };
};
