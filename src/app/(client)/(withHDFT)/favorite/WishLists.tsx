'use client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { useWishList } from '@/hooks/useWishList';
import { CommonSvg } from '@/assets/CommonSvg';
import { useEffect } from 'react';

function WishLists() {
  const { wishList } = useWishList();

  useEffect(() => {
    console.log('wishList', wishList);
  }, [wishList]);

  return (
    <section className="lg:px-10 px-5 py-10 mt-20 md:mt-30">
      <div className=" mx-auto flex flex-col space-y-4 text-center">
        <section
          id="wish-lists"
          aria-labelledby="wish-lists-heading"
          className="space-y-6"
        >
          <div className="flex justify-between flex-wrap ">
            <h2 className=" text-2xl font-medium sm:text-3xl">
              Sản phẩm ưa thích
            </h2>
            <Link aria-label="Products" href="/products">
              <div
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  })
                )}
              >
                Xem tất cả
              </div>
            </Link>
          </div>
          <Swiper
            style={
              {
                '--swiper-navigation-size': '44px',
                '--swiper-navigation-top-offset': '40%',
                '--swiper-navigation-sides-offset': '10px',
                '--swiper-navigation-color': '#000000',
                '--swiper-navigation-color-hover': '#000000',
                '--swiper-button-next': '12px',
              } as React.CSSProperties
            }
            slidesPerView={1}
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
            {wishList ? (
              wishList?.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            ) : (
              <Loader />
            )}

            {wishList?.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                {CommonSvg.cart({
                  className: 'mb-4 h-16 w-16 text-muted-foreground',
                })}

                <div className="text-xl font-medium text-muted-foreground">
                  Danh sách sản phẩm yêu thích của bạn còn trống
                </div>
              </div>
            )}
          </Swiper>
        </section>
      </div>
    </section>
  );
}

export default WishLists;
