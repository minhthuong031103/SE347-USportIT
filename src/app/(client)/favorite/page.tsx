// import ProductCard from '@/components/ProductCard';
// import { useCart } from '@/hooks/useCart';
import { getSession } from '@/lib/auth';
import React from 'react';
import WishLists from './WishLists';

async function page() {
  const session = await getSession();
  // const { cart } = useCart();
  // console.log(cart);

  return (
    // <div>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //     {/* <ProductCard product={cart?.listItem[0]?.data} /> */}
    //   </div>
    // </div>
    <WishLists session={session} />
  );
}

export default page;
