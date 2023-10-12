import { type Metadata } from 'next';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Products } from '@/components/products';
import { Shell } from '@/components/shells/shell';
import { useProduct } from '@/hooks/useProduct';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Buy products from our stores',
};

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { page, per_page, sort, categories, subcategories, price_range } =
    searchParams ?? {};

  // Products transaction
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 8;
  const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0;
  console.log('aaaaaaaaaaaaaaaaa:', price_range);
  const { getProductsAction } = useProduct();
  const productsTransaction = await getProductsAction({
    limit,
    offset,
    sort: typeof sort === 'string' ? sort : null,
    categories: typeof categories === 'string' ? categories : null,
    subcategories: typeof subcategories === 'string' ? subcategories : null,
    price_range: typeof price_range === 'string' ? price_range : null,
  });

  const pageCount = Math.ceil(productsTransaction.count / limit);

  return (
    <Shell>
      <PageHeader
        id="products-page-header"
        aria-labelledby="products-page-header-heading"
      >
        <PageHeaderHeading size="sm">Products</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Buy products from our stores
        </PageHeaderDescription>
      </PageHeader>
      <Products
        id="products-page-products"
        aria-labelledby="products-page-products-heading"
        products={productsTransaction.items}
        pageCount={pageCount}
        categories={[1, 2, 3]}
      />
    </Shell>
  );
}
