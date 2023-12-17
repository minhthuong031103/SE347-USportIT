'use client';
import Image from 'next/image';
import Link from 'next/link';
// import React, { useEffect } from 'react';
import { currencyFormat, parseJSON } from '@/lib/utils';
import { useEffect, useState } from 'react';
// import DialogCustom from './ui/dialogCustom';
// import { Label } from './ui/label';
// import { useForm } from 'react-hook-form';
// import { Button } from './ui/button';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { useCart } from '@/hooks/useCart';
import { useWishList } from '@/hooks/useWishList';

// import { Input, Spinner, Textarea } from '@nextui-org/react';
// import { FaCheckCircle, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isInvalid, setIsInvalid] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);
  const { cart } = useCart();
  const { onSelectProduct, onToggleDialog } = useSelectedProduct();
  const { wishList, onAddUserWishList, onRemoveUserWishList } = useWishList();

  useEffect(() => {
    console.log(isAddToCart, isShowDialog);
  }, []);

  useEffect(() => {
    const found = cart?.listItem.find((item) => item.data.id === product?.id);
    if (found) {
      setIsAddToCart(true);
    }
  }, [cart?.listItem]);

  // Kiểm tra khi wishList thay đổi thì cập nhật lại isLiked
  useEffect(() => {
    if (!wishList) return;

    const isProductInWishList = wishList.some(
      (wishListProduct) => wishListProduct.id === product.id
    );
    setIsLiked(isProductInWishList);
  }, [wishList]);

  return (
    <div>
      <div className="relative">
        <Link
          className="
    "
          href={`/product/${product?.id}`}
        >
          <Image
            objectFit="cover"
            width={900}
            height={900}
            src={parseJSON(product?.thumbnail)?.url}
            className="transform duration-200 
    hover:scale-105"
            priority
            quality={100}
            alt="product image"
          />
        </Link>

        <div
          onClick={() => {
            if (!isLiked) {
              onAddUserWishList(product);
            }
            if (isLiked) {
              onRemoveUserWishList(product);
            }
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
            // Doan nay su dung cho favorite
            // if (!isAddToCart) {
            //   setIsShowDialog(true);
            //   await onSelectProduct({ data: product });
            //   onToggleDialog();
            // }
            // setIsAddToCart((prev) => !prev);

            setIsShowDialog(true);
            onSelectProduct({ data: product });
            onToggleDialog();
          }}
          className="transform duration-200 
    hover:scale-105 absolute items-center justify-center cursor-pointer flex left-3 top-3 w-[30px] h-[30px] rounded-full bg-white"
        >
          {/* {isAddToCart ? (
            <AiFillHeart className="text-red-400 w-5 h-5 " />
          ) : (
            <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " />
          )} */}
          <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " />
        </div>
      </div>
      <Link className="" href={`/product/${product?.id}`}>
        <div className="text-start p-4 text-black/[0.9]">
          <h2 className="text-lg font-medium">{product?.name}</h2>
          <div className="flex flex-wrap items-center text-black/[0.5]">
            <p className="mr-2 text-sm font-semibold ">
              {currencyFormat(product?.price)}
            </p>
            {1 && (
              <p className="text-sm font-medium line-through ">
                {currencyFormat(product?.price * 1.3)}
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

        {/* DialogCustom show when click add to cart button */}
      </Link>
    </div>
  );
}
