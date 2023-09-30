'use client';
import Loader from '@/components/Loader';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const ProductUserMayLike = ({ data }) => {
  console.log(JSON.stringify(data?.images));
  return (
    <div>
      <div>You may also like:</div>

      <Swiper
        style={
          {
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-color': '#000000',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-width': '10px',
            '--swiper-pagination-bullet-height': '10px',
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
        modules={[Pagination]}
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
