import { getRequest, postRequest } from '@/lib/fetch';

export const useReview = () => {
  const onGetProductReview = async (productId, page) => {
    const productReview = await getRequest({
      endPoint: `/api/product/user-review?productId=${productId}&page=${page}&limit=3`,
    });
    console.log(productReview);
    return productReview;
  };

  const onPostProductReview = async (data) => {
    const productReview = await postRequest({
      endPoint: '/api/product/user-review',
      formData: data,
      isFormData: true,
    });
    console.log(productReview);
    return productReview;
  };

  const onGetProductReviewRating = async (productId) => {
    const productReviewRating = await getRequest({
      endPoint: `/api/product/user-review/rating?productId=${productId}`,
    });

    return productReviewRating;
  };
  return { onGetProductReview, onPostProductReview, onGetProductReviewRating };
};
