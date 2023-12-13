'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Image from 'next/image';
// import { currencyFormat, parseJSON } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';

const AddSuccessCartItem = () => {
  const {
    isShowSuccess,
    // selectedProduct,
    onToggleSuccess,
  } = useSelectedProduct();

  if (isShowSuccess) {
    console.log(
      '🚀 ~ file: AddSuccessCartItem.tsx:20 ~ AddSuccessCartItem ~ isShowSuccess:',
      isShowSuccess
    );
    setTimeout(() => {
      onToggleSuccess();
    }, 10000);
  }

  return isShowSuccess ? (
    <Sheet>
      <SheetContent side={'topRight'} className="w-[400px]">
        <SheetHeader>
          <div className="flex flex-row gap-3 items-center">
            <BsFillCheckCircleFill className="text-green-500 mr-2" size={20} />
            <SheetTitle>Added to Cart</SheetTitle>
          </div>
          <div className=" flex flex-row gap-4 w-full">
            <div className="relative aspect-square h-24 w-16 min-w-fit overflow-hidden rounded">
              <Image
                alt="add to cart"
                src={'/assets/placeholder.png'}
                sizes="(max-width: '768px') 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="absolute object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-black text-sm
        font-medium"
              >
                {/* {data.name} */}
                Tên sản phẩm
              </span>
              <span
                className="text-black text-sm
        font-normal"
              >
                Men's shoes
              </span>
              <span
                className="text-black text-sm
        font-normal"
              >
                {/* {data.selectedSize} */}
                38
              </span>

              <span
                className="text-black text-sm
        font-medium"
              >
                {/* {currencyFormat(data.price)} */}
                currencyFormat(500000)
              </span>
            </div>
          </div>
          <div className="flex-row flex w-full py-3">
            <Button variant={'outline'} className="w-full ">
              View Cart
              {/* ({cart?.listItem.length}) */}
            </Button>

            <Button className="w-full">Check out</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ) : null;
};

export default AddSuccessCartItem;
