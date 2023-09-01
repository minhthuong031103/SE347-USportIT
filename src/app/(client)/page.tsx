'use client';

import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/new-york/button';
import HomeBanner from '@/components/HomeBanner';
import Image from 'next/image';
import { AspectRatio } from '@/components/new-york/aspect-ratio';
const productCategories = [
  {
    title: 'Shoes',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_329,c_limit/37cc7ef0-37f9-40d0-b103-a8c2a54fae7b/nike-just-do-it.jpg',
  },
  {
    title: 'Clothes',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2efb08cb-b882-4822-a248-49df682c32ec/jordan-23-engineered-t-shirt-6fXhgT.png',
  },
  {
    title: 'Accessories',
    image:
      'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/i1-4356ff52-793f-441e-adbd-59524a61150c/utility-elite-training-backpack-TvH6S5.png',
  },
];
const page = () => {
  return (
    <div className="mt-10 flex h-full w-full flex-col">
      <HomeBanner />
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          An e-commerce skateshop built with everything new in Next.js 13
        </h1>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-4  md:grid-cols-3 px-10">
          {productCategories.map((category) => (
            <Link
              aria-label={`Go to ${category.title}`}
              key={category.title}
              href={`/categories/${category.title}`}
            >
              <div className="group relative overflow-hidden rounded-md">
                <AspectRatio ratio={5 / 4}>
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                  <Image
                    src={category.image}
                    alt={category.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="w-full h-[600px]"></div>
      <div className="w-full h-[600px]"></div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        logout
      </Button>
    </div>
  );
};
export default page;
