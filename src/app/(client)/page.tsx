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
import { AspectRatio } from '@/components/new-york/aspect-ratio';
import { CommonSvg } from '@/assets/CommonSvg';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/new-york/sheet';

const page = () => {
  const windowWidth = useRef(window?.innerWidth);
  return (
    <div className="mt-10 flex h-full w-full flex-col">
      <HomeBanner />

      <ShopAll />
      <Categories />
      <Image
        src={
          'https://images.lifestyleasia.com/wp-content/uploads/sites/6/2020/08/03154422/2020_RTT_Sustainability_Zero-Collection_RN_GROUP_06539_R2_hd_1600-1600x900.jpg'
        }
        className="relative"
        width={windowWidth.current}
        height={windowWidth.current / 2}
        priority
        quality={100}
        objectFit="cover"
        alt="hero image"
      />

      <SalesProduct />
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
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
