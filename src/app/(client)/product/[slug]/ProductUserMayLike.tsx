'use client';
import Loader from '@/components/Loader';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const ProductUserMayLike = ({ data }) => {
  return (
    <div>
      <div>You may also like:</div>

      <Swiper
        style={
          {
            '--swiper-navigation-size': '44px',
            '--swiper-navigation-top-offset': '50%',
            '--swiper-navigation-sides-offset': '10px',
            '--swiper-navigation-color': '#000000',
            '--swiper-navigation-color-hover': '#000000',
            '--swiper-button-next': '12px',
          } as React.CSSProperties
        }
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation]}
        className="w-full h-auto overflow-visible relative"
      >
        {parseJSON(data?.images) ? (
          parseJSON(data?.images).map((product, index) => (
            <SwiperSlide key={index}>
              <Image
                src={product.url}
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </SwiperSlide>
          ))
        ) : (
          <Loader />
        )}
      </Swiper>
    </div>
  );
};

export default ProductUserMayLike;
