import React from 'react';
import ProductDetailLeft from './ProductDetailLeft';
import ProductDetailRight from './ProductDetailRight';

function page() {
  return (
    <div className="w-full md:py-20">
      <div
        className="w-full max-w-[1280px] px-5
  md:px-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px]">
          <div className=" w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full lg:mx-0">
            <ProductDetailLeft />
          </div>

          <div className="flex-[1] py-5">
            <ProductDetailRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
