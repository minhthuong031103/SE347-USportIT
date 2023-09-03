'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import { signOut } from 'next-auth/react';
import { Button, buttonVariants } from '@/components/new-york/button';
import HomeBanner from '@/components/HomeBanner';
import { Balancer } from 'react-wrap-balancer';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import ShopByCollection from './ShopByCollection';
import Categories from './Categories';
import Image from 'next/image';
import FeaturedProduct from './FeaturedProduct';
import SalesProduct from './SalesProduct';
import ShopAll from './ShopAll';

const page = () => {
  const windowWidth = useRef(window?.innerWidth);
  return (
    <div className="mt-10 flex h-full w-full flex-col">
      <HomeBanner />
      <ShopAll />
      <Categories />
      <SalesProduct />

      <Image
        src={
          'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1531,c_limit/bb4458f0-855c-4548-a745-97aefec048ea/nike-just-do-it.jpg'
        }
        className="relative"
        width={windowWidth.current}
        height={windowWidth.current / 2}
        priority
        quality={100}
        objectFit="cover"
        alt="hero image"
      />
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          NEVER DONE RISING
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Keep it classic in timeless, easy-to-wear kicks.
        </Balancer>
      </section>
      <FeaturedProduct />

      <section className="mt-12 lg:mt-24">
        <ShopByCollection />
      </section>
    </div>
  );
};
export default page;
