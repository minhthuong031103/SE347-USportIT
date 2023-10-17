'use client';
import Image from 'next/image';
import Link from 'next/link';
// import React, { useEffect } from 'react';
import { currencyFormat, parseJSON } from '@/lib/utils';
import { useEffect, useState } from 'react';
import DialogCustom from './ui/dialogCustom';
import { Label } from './ui/label';
import { Controller, useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { useFavorite } from '@/hooks/useFavorite';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-hot-toast';

import { Input, Spinner, Textarea } from '@nextui-org/react';
import { FaCheckCircle, FaStar, FaExclamationTriangle } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { onAddFavorite, onDeleteFavorite } = useFavorite();
  const { onAddToCart, onDeleteItemFromCart, cart } = useCart();
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    await setIsInvalid(false);
    console.log(
      'isInvalid = ' +
        isInvalid +
        ' rating = ' +
        rating +
        ' isTitleValid = ' +
        isTitleValid +
        ' isContentValid = ' +
        isContentValid
    );
    // Reset isInvalid to false when the dialog is opened
    if (rating === 0) {
      setIsInvalid(true); // Set isInvalid to true if rating is 0
      return;
    }
    if (data.title === '') {
      setIsTitleValid(false);
      setIsInvalid(true); // Set isInvalid to true if title is empty
      return;
    } else {
      setIsTitleValid(true);
    }
    if (data.text === '') {
      setIsContentValid(false);
      setIsInvalid(true); // Set isInvalid to true if content is empty
      return;
    } else {
      setIsContentValid(true);
    }
    //If all input is valid, then submit
    // Set loading state to true when submitting for submiting dialog

    setIsLoading(true);
    const userId = await onGetSession();
    // const images = await startUpload([...files]).then((res) => {
    //   const formattedImages = res?.map((image) => ({
    //     id: image.key,
    //     name: image.key.split('_')[1] ?? image.key,
    //     url: image.url,
    //   }));
    //   return formattedImages ?? null;
    // });

    // const [data] = useQuery('key', func(), {});
    const ret = await onPostProductReview(
      JSON.stringify({
        ...data,
        rating: parseInt(data.rating),
        image: [...images],
        userId: userId,
        productId: product.id,
        reviewDate: new Date(),
      })
    );

    if (ret) {
      console.log(ret);
      // Set loading state to false and show success dialog
      setIsLoading(false);
      setShowSuccess(true);

      // Reset form and other state variables after submission after 2sec
      setTimeout(() => {
        reset();
        // setFiles([]);
        setRating(0);
        setHover(0);
        setIsShowDialog(false);
        setIsLoading(false);
        setShowSuccess(false);
        setIsInvalid(false);
      }, 2000);
      reviewItemRefetch();
      reviewRatingRefetch();
    }
  };

  useEffect(() => {
    const found = cart.listItem.find((item) => item.data.id === product?.id);
    if (found) {
      setIsAddToCart(true);
      console.log(
        '🚀 ~ file: ProductCard.tsx:27 ~ useEffect ~ cart.listItem:',
        cart.listItem
      );

      console.log(
        '🚀 ~ file: ProductCard.tsx:32 ~ useEffect ~ isAddToCart:',
        isAddToCart
      );
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
            if (!isAddToCart) {
              setIsShowDialog(true);
              onAddToCart({ data: product });
              toast.success('Add to cart successfully');
            } else {
              onDeleteItemFromCart({ data: product });
              toast.success('Delete from cart successfully');
            }
            setIsAddToCart((prev) => !prev);
          }}
          className="transform duration-200 
    hover:scale-105 absolute items-center justify-center cursor-pointer flex left-3 top-3 w-[30px] h-[30px] rounded-full bg-white"
        >
          {isAddToCart ? (
            <AiFillHeart className="text-red-400 w-5 h-5 " />
          ) : (
            <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " />
          )}
          {/* <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " /> */}
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
        {isShowDialog ? (
          <DialogCustom
            warningOnClose={true}
            className="flex justify-center items-center w-[90%] lg:w-[60%] h-[90%]"
            isModalOpen={isShowDialog}
            setIsModalOpen={setIsShowDialog}
            callBack={() => {
              // Reset form details and state varibles
              // when the dialog is closed
              reset();
              setRating(0);
              setHover(0);
              setIsInvalid(false);
            }}
          >
            <div className="flex flex-col w-full h-auto pr-4 gap-6">
              <div className="w-full h-fit flex flex-col pt-2 items-center gap-3">
                <span className="text-[12px] sm:text-sm md:text-base font-semibold">
                  Write a Review
                </span>
                <span className="text-[10px] sm:text-sm text-gray-500">
                  Share your thoughts with the community.
                </span>
                <div className="w-full h-fit mt-2 flex flex-row gap-3 items-center">
                  <Image
                    src={parseJSON(product?.images)[0].url}
                    alt={product.name}
                    width={60}
                    height={50}
                    className="rounded-md object-cover object-center"
                  />
                  <span className="text-[10px] sm:text-sm text-gray-700">
                    {product.name}
                  </span>
                </div>
              </div>

              <div className="flex w-full h-fit mt-3 flex-col gap-3">
                <Label className="font-semibold text-[10px] sm:text-[14px]">
                  Overall Rating
                </Label>
                <div className="flex gap-2 justify-start">
                  {[1, 2, 3, 4, 5].map((star, index) => {
                    const currentRating = index + 1;

                    return (
                      <label
                        className="flex items-center justify-center"
                        key={currentRating}
                      >
                        <Controller
                          name="rating"
                          control={control}
                          defaultValue={''}
                          render={({ field }) => (
                            <>
                              <FaStar
                                style={{ cursor: 'pointer' }}
                                size={24}
                                color={
                                  currentRating <= (hover || rating)
                                    ? '#ffc107'
                                    : '#e4e5e9'
                                }
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(rating)}
                              />
                              <input
                                type="radio"
                                name="rating"
                                className="invisible"
                                value={currentRating}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setRating(currentRating); // Set the rating when the radio button is clicked
                                }}
                              />
                            </>
                          )}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                <Label className="font-semibold text-[10px] sm:text-[14px]">
                  Title
                </Label>
                <Controller
                  control={control}
                  defaultValue={''}
                  name="title"
                  render={({ field }) => {
                    return (
                      <Input
                        radius="sm"
                        type="text"
                        size="sm"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </div>

              <div className="flex flex-col w-full h-fit gap-2">
                <Label className="font-semibold text-[10px] sm:text-[14px]">
                  Content
                </Label>
                <Controller
                  defaultValue={''}
                  name="text"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Textarea
                        className="h-full"
                        minRows={20}
                        size="sm"
                        type="textarea"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label className="font-semibold text-[10px] sm:text-[14px]">
                  Image
                </Label>
                {/* <Controller
                  defaultValue={''}
                  name={'image'}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FileDialog
                        setValue={field.onChange}
                        name="images"
                        maxFiles={8}
                        maxSize={1024 * 1024 * 4}
                        files={files}
                        setFiles={setFiles}
                        isUploading={isUploading}
                        disabled={false}
                      />
                    );
                  }}
                /> */}
                <div className="flex w-full mt-5 justify-center items-center">
                  <Button
                    className="w-[50%] inset-0 border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold text-white rounded-md"
                    onClick={async () => {
                      try {
                        await handleSubmit(onSubmit)();
                      } catch (e) {
                        // Handle submission error if needed
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center justify-center">
                {/* Loading Dialog */}
                {isLoading &&
                  !showSuccess &&
                  rating !== 0 &&
                  isTitleValid &&
                  isContentValid && (
                    <DialogCustom
                      className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                      isModalOpen={isLoading}
                      notShowClose={true}
                    >
                      <div className="flex flex-col gap-3 items-center justify-center">
                        <Spinner size="lg" />
                        <div className="text-center font-semibold text-xs sm:text-sm">
                          Submitting Review...
                        </div>
                      </div>
                    </DialogCustom>
                  )}

                {/* Invalid Dialog */}
                {isInvalid ? (
                  <DialogCustom
                    className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                    isModalOpen={!isLoading}
                  >
                    <div className="flex flex-col gap-3 items-center justify-center">
                      {rating === 0 ? (
                        <>
                          <FaExclamationTriangle
                            className="text-gray-700"
                            size={35}
                          />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Please type in your rating!
                          </div>
                        </>
                      ) : !isTitleValid ? (
                        <>
                          <FaExclamationTriangle
                            className="text-gray-700"
                            size={35}
                          />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Please type in your title!
                          </div>
                        </>
                      ) : !isContentValid ? (
                        <>
                          <FaExclamationTriangle
                            className="text-gray-700"
                            size={35}
                          />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Please type in your content!
                          </div>
                        </>
                      ) : null}
                    </div>
                  </DialogCustom>
                ) : null}

                {/* Success Dialog */}
                {showSuccess && (
                  <DialogCustom
                    className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                    isModalOpen={!isLoading}
                    notShowClose={true}
                  >
                    <div className="flex flex-col gap-3 items-center justify-center">
                      <FaCheckCircle className="text-gray-700" size={35} />
                      <div className="text-center font-semibold text-xs sm:text-sm">
                        Review Submitted!
                      </div>
                    </div>
                  </DialogCustom>
                )}
              </div>
            </div>
          </DialogCustom>
        ) : null}
      </Link>
    </div>
  );
}
