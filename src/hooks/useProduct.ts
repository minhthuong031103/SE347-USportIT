import { getRequest } from '@/lib/fetch';

export const useProduct = () => {
  const onGetProductDetail = async (slug) => {
    const productDetail = await getRequest({
      endPoint: `${process.env.API_HOST}/api/product/detail?productId=${slug}`,
    });

    // const data = await productDetail?.json();

    return productDetail;
  };

  return { onGetProductDetail };
};
