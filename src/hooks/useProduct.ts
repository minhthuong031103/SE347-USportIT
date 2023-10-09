import { getRequest } from '@/lib/fetch';
import { type z } from 'zod';
import prisma from '@/lib/prisma';
import type { getProductsSchema } from '@/lib/validations/product';

export const useProduct = () => {
  const onGetProductDetail = async (slug) => {
    const productDetail = await getRequest({
      endPoint: `${process.env.API_HOST}/api/product/detail?productId=${slug}`,
    });
    // const data = await productDetail?.json();

    return productDetail;
  };

  const getProductsAction = async (
    input: z.infer<typeof getProductsSchema>
  ) => {
    const { sort, price_range, categories, subcategories, limit, offset } =
      input;

    const [column, order] =
      (sort?.split('.') as [keyof Product, 'asc' | 'desc']) || [];
    const [minPrice, maxPrice] = price_range?.split('-')?.map(Number) || [0, 0];
    const categoriesArray = categories?.split('.') || [];
    const subcategoriesArray = subcategories?.split('.') || [];

    const where = {
      AND: [
        categoriesArray.length
          ? { category: { in: categoriesArray } }
          : undefined,
        subcategoriesArray.length
          ? { subcategory: { in: subcategoriesArray } }
          : undefined,
        minPrice ? { price: { gte: minPrice } } : undefined,
        maxPrice ? { price: { lte: maxPrice } } : undefined,
      ].filter(Boolean),
    };

    const items = await prisma.product.findMany({
      where,
      orderBy: {
        [column || 'id']: order || 'desc',
      },
      take: limit,
      skip: offset,
    });

    const count = await prisma.product.count({
      where,
    });

    return {
      items,
      count,
    };
  };

  return { onGetProductDetail, getProductsAction };
};
