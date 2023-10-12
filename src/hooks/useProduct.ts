'use client';

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
          ? { categoryId: { in: categoriesArray } }
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

  const fetchProduct = async ({
    page,
    sort,
    categories,
    subcategories,
    price_range,
  }) => {
    // Construct the base endpoint
    let endpoint = 'api/product/search?limit=8';
    console.log('page:', page);
    // Add parameters if they exist and are not null or undefined
    if (page !== null && page !== undefined) {
      endpoint += `&page=${page}`;
    }

    if (sort !== null && sort !== undefined) {
      endpoint += `&sort=${sort}`;
    }
    // Add other parameters similarly
    if (categories !== null && categories !== undefined) {
      endpoint += `&categories=${categories}`;
    }
    if (subcategories !== null && subcategories !== undefined) {
      endpoint += `&subcategories=${subcategories}`;
    }
    if (price_range !== null && price_range !== undefined) {
      endpoint += `&price_range=${price_range}`;
    }
    // Make the API request
    const products = await getRequest({ endPoint: endpoint });

    // Handle the response and return the necessary data
    console.log(products);
    return {
      data: products.data,
      totalPages: products.totalPages,
      totalItems: products.totalItems,
      page: products.page,
    };
  };

  return { onGetProductDetail, getProductsAction, fetchProduct };
};
