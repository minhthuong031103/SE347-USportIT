// import Image from 'next/image';
'use client';
import ProductCard from '@/components/ProductCard';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from '@components/ui/button';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { CartSheet } from '@components/CartSheet';
import { Badge } from '@components/ui/badge';
export const getData = async () => {
  const res = await fetch('/api/product/featured');
  console.log(res);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 2110);
  });
};

// const priceBar = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   margin: '10px 0',
// };

export default function Productss() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  console.log(featuredProducts);
  useEffect(() => {
    const getFeaturedProducts = async () => {
      const res = await fetch('/api/product/featured');
      const data = await res.json();
      if (data) {
        setFeaturedProducts(data);
      }
    };
    getFeaturedProducts();
  }, []);
  return (
    <main>
      <section className="flex flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <div className="flex flex-row gap-5 items-center ml-auto">
            <Link href={'/favorite'}>
              <Button variant="outline" size="icon" className="relative">
                {1 > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
                  >
                    7
                  </Badge>
                )}
                {
                  <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
                }
              </Button>
            </Link>
            <CartSheet />
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map over your featuredProducts and render each one */}
          {featuredProducts?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
