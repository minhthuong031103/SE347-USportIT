'use client';
import React from 'react';

import { useSearchParams } from 'next/navigation';
import Test from './Test';

export default function ProductsPage() {
  const search = useSearchParams();
  const sort = search ? search.get('sort') : null;
  const gender = search ? search.get('gender') : null;
  const categories = search ? search.get('categories') : null;
  const subcategories = search ? search.get('subcategories') : null;
  const price_range = search ? search.get('price_range') : null;

  console.log('sort:', sort);
  console.log('gender:', gender);
  console.log('categories:', categories);
  console.log('subcategories:', subcategories);
  console.log('price_range:', price_range);
  return (
    <div className="w-full h-full">
      <Test
        sort={sort}
        gender={gender}
        categories={categories}
        subcategories={subcategories}
        price_range={price_range}
      />
    </div>
  );
}
