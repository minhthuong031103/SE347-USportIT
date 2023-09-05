'use client';

import { Button } from '@/components/new-york/button';
import { currencyFormat } from '@/lib/utils';
import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';

const data = {
  name: 'Nike Air Force 1 07 Craft',
  subtitle: 'Men’s Shoe',
  price: 3000000,
  original_price: 4000000,
  description: `The Nike Air Force 1 '07 Craft puts a fresh spin on the street legend. Its crisp leather upper features intricate stitching and overlays for added durability. A classic Air-Sole unit provides lightweight cushioning for all-day comfort.`,
  size: [
    {
      size: 'EU 38.5',
      number: 0,
    },
    {
      size: 'EU 39',
      number: 1,
    },
    {
      size: 'EU 40',
      number: 2,
    },
    {
      size: 'EU 41',
      number: 3,
    },
    {
      size: 'EU 42',
      number: 4,
    },
    {
      size: 'EU 43',
      number: 5,
    },
    {
      size: 'EU 44',
      number: 6,
    },
    {
      size: 'EU 45',
      number: 7,
    },
    {
      size: 'EU 46',
      number: 8,
    },
  ],
};

function ProductDetailRight() {
  const [selectedSize, setSizeSelected] = useState(null);
  const [showError, setShowError] = useState(false);
  console.log(JSON.stringify(data.size));
  return (
    <div className="flex-[1] py-3">
      {/* Product Title */}
      <div className="text-[34px] font-semibold mb-2 leading-tight">
        {data.name}
      </div>

      {/* Product Subtitle */}
      <div className="text-lg font-semibold mb-5">{data.subtitle}</div>

      {/* Product Price */}
      <div className="text-lg font-semibold ">{currencyFormat(data.price)}</div>

      {data.original_price && (
        <div>
          <p className="text-base font-medium line-through ">
            {currencyFormat(data.original_price)}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {' '}
            17% off
          </p>
        </div>
      )}

      {/* Product size */}

      <div className="mb-10">
        {/* Heading */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Select size</div>
          <div className="text-md font-medium text-black/[0.5] cursor pointer">
            Select guide
          </div>
        </div>
        {/* Heading */}

        {/* Size start */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {data.size.map((size, index) => (
            <div
              onClick={
                size.number > 0
                  ? () => {
                      setSizeSelected(size.size);
                      setShowError(false);
                    }
                  : () => {}
              }
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium
    hover:bg-slate-300 
      cursor-pointer ${
        size.number > 0
          ? 'hover:border-black cursor-pointer'
          : 'cursor-not-allowed disabled bg-black/[0.1] opacity-50'
      } ${selectedSize === size.size ? 'border-black' : ''} `}
            >
              {size.size}
            </div>
          ))}
        </div>
        {/* Size end */}

        {/* Show error */}
        {showError && (
          <div className="text-red-600 mt-1">Size selection is required</div>
        )}
        {/* Show error */}
      </div>

      {/* Product size */}

      <Button
        className="w-full py-4 rounded-full bg-black text-white text-lg
                font-medium transition-transform active:scale-95 mb-3 hover:opacity-75
                "
        onClick={() => {
          if (!selectedSize) {
            setShowError(true);
            document.getElementById('sizesGrid')?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }
        }}
      >
        Add to cart
      </Button>
      <Button
        variant={'outline'}
        className="w-full py-4 rounded-full border border-black
        text-lg font-medium transition-transform active:scale-95 flex items-center
        justify-center gap-2 hover:opacity-75 mb-10
                "
      >
        Wish List
        <IoMdHeartEmpty size={20} />
      </Button>

      <div>
        <div className="text-lg font-bold mb-5">Product Details</div>
        <div className="markdown text-md mb-5">{data.description}</div>
      </div>
    </div>
  );
}

export default ProductDetailRight;
