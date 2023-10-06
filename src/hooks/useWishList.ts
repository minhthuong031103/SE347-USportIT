import { getRequest } from '@/lib/fetch';

export const useWishList = () => {
  const onGetUserWishList = async (userId) => {
    const userWishList = await getRequest({
      endPoint: `/api/user/wishlist?userId=${userId}`,
    });
    if (userWishList) {
      console.log('userWishList', userWishList.products);
    }
    return userWishList;
  };

  return { onGetUserWishList };
};
