import React from 'react';
import Test from './Test';
import AddProductDialog from '../(withHDFT)/(home)/AddProductDialog';

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const sort = searchParams ? searchParams?.sort : null;
  // const gender = searchParams ? searchParams?.gender : null;
  // const categories = searchParams ? searchParams?.categories : null;
  // const subcategories = searchParams ? searchParams?.subcategories : null;
  // const price_range = searchParams ?searchParams?.price_range: null;
  // const q = searchParams ? searchParams?.q : null;
  return (
    <div className="w-full h-full">
      <Test
        q={searchParams?.q}
        sort={searchParams?.sort}
        gender={searchParams?.gender}
        categories={searchParams?.categories}
        subcategories={searchParams?.subcategories}
        price_range={searchParams?.price_range}
      />
      <AddProductDialog />
    </div>
  );
}
