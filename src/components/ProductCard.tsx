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
import { useFavorite } from '@/hooks/useFavorite';
import { useCart } from '@/hooks/useCart';

// import { Input, Spinner, Textarea } from '@nextui-org/react';
// import { FaCheckCircle, FaStar, FaExclamationTriangle } from 'react-icons/fa';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  console.log(
    '🚀 ~ file: ProductCard.tsx:26 ~ ProductCard ~ isAddToCart:',
    isAddToCart
  );
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  console.log(
    '🚀 ~ file: ProductCard.tsx:27 ~ ProductCard ~ isShowDialog:',
    isShowDialog
  );
  // const [isLoading, setIsLoading] = useState(false);
  // const [isInvalid, setIsInvalid] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);

  const { onAddFavorite, onDeleteFavorite } = useFavorite();
  const { cart } = useCart();
  const { onSelectProduct, onToggleDialog } = useSelectedProduct();
  // const { handleSubmit, control, reset } = useForm();

  // const onSubmit = async (data) => {
  //   await setIsInvalid(false);
  //   console.log(
  //     'isInvalid = ' +
  //       isInvalid +
  //       ' rating = ' +
  //       rating +
  //       ' isTitleValid = ' +
  //       isTitleValid +
  //       ' isContentValid = ' +
  //       isContentValid
  //   );
  //   // Reset isInvalid to false when the dialog is opened
  //   if (rating === 0) {
  //     setIsInvalid(true); // Set isInvalid to true if rating is 0
  //     return;
  //   }
  //   if (data.title === '') {
  //     setIsTitleValid(false);
  //     setIsInvalid(true); // Set isInvalid to true if title is empty
  //     return;
  //   } else {
  //     setIsTitleValid(true);
  //   }
  //   if (data.text === '') {
  //     setIsContentValid(false);
  //     setIsInvalid(true); // Set isInvalid to true if content is empty
  //     return;
  //   } else {
  //     setIsContentValid(true);
  //   }
  //   //If all input is valid, then submit
  //   // Set loading state to true when submitting for submiting dialog

  //   setIsLoading(true);
  //   const userId = await onGetSession();
  //   // const images = await startUpload([...files]).then((res) => {
  //   //   const formattedImages = res?.map((image) => ({
  //   //     id: image.key,
  //   //     name: image.key.split('_')[1] ?? image.key,
  //   //     url: image.url,
  //   //   }));
  //   //   return formattedImages ?? null;
  //   // });

  //   // const [data] = useQuery('key', func(), {});
  //   const ret = await onPostProductReview(
  //     JSON.stringify({
  //       ...data,
  //       rating: parseInt(data.rating),
  //       image: [...images],
  //       userId: userId,
  //       productId: product.id,
  //       reviewDate: new Date(),
  //     })
  //   );

  //   if (ret) {
  //     console.log(ret);
  //     // Set loading state to false and show success dialog
  //     setIsLoading(false);
  //     setShowSuccess(true);

  //     // Reset form and other state variables after submission after 2sec
  //     setTimeout(() => {
  //       reset();
  //       // setFiles([]);
  //       setRating(0);
  //       setHover(0);
  //       setIsShowDialog(false);
  //       setIsLoading(false);
  //       setShowSuccess(false);
  //       setIsInvalid(false);
  //     }, 2000);
  //     reviewItemRefetch();
  //     reviewRatingRefetch();
  //   }
  // };

  useEffect(() => {
    const found = cart.listItem.find((item) => item.data.id === product?.id);
    if (found) {
      setIsAddToCart(true);
    }
  }, [cart.listItem]);

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
              onAddFavorite({ data: product });
            }
            if (isLiked) {
              onDeleteFavorite({ data: product });
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
