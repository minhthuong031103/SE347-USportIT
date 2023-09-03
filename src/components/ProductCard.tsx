import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { currencyFormat } from '@/lib/utils';

import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
export default function ProductCard() {
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isAddToCart, setIsAddToCart] = React.useState<boolean>(false);
  return (
    <div>
      <div className="relative">
        <Link
          className="
    "
          href={`/product/1`}
        >
          <Image
            objectFit="cover"
            width={900}
            height={900}
            src={
              'https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/baccff07-c847-43d5-bdb3-a78b7fd3846e/air-jordan-1-mid-se-craft-shoes-n5bFMW.png'
            }
            className="transform duration-200 
    hover:scale-105"
            priority
            quality={100}
            alt="product image"
          />
        </Link>

        <div
          onClick={() => {
            setIsLiked(!isLiked);
          }}
          className="transform duration-200 
    hover:scale-105 absolute items-center justify-center cursor-pointer flex top-3 right-3 w-[30px] h-[30px] rounded-full bg-white"
        >
          {isLiked ? (
            <AiFillHeart className="text-red-400 w-5 h-5 " />
          ) : (
            <AiOutlineHeart className="text-slate-600 w-5 h-5 " />
          )}
        </div>

        <div
          onClick={() => {
            setIsAddToCart(!isAddToCart);
          }}
          className="transform duration-200 
    hover:scale-105 absolute items-center justify-center cursor-pointer flex left-3 top-3 w-[30px] h-[30px] rounded-full bg-white"
        >
          <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " />
        </div>
      </div>
      <Link
        className="
    "
        href={`/product/1`}
      >
        <div className="text-start p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">Product name</h2>
          <div className="flex flex-wrap items-center text-black/[0.5]">
            <p className="mr-2 text-lg font-semibold ">
              {currencyFormat(900000000)}
            </p>
            {1 && (
              <p className="text-base font-medium line-through ">
                {currencyFormat(9000)}
              </p>
            )}
          </div>
          {1 && (
            <p className="ml-auto text-base font-medium text-green-500">
              {' '}
              12% off
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
