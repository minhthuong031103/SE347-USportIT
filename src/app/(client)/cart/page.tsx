import React from 'react';
import LeftCart from './LeftCart';
import RightCart from './RightCart';

function page() {
  return (
    <div className="w-full py-10 md:py-20">
      <div
        className="w-full flex-col max-w-[1280px] px-5
md:px-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px]">
          <div className=" w-full md:w-auto flex-[1.8] max-w-[500px] lg:max-w-full lg:mx-0">
            <LeftCart />
          </div>
          <div className="flex-[1] py-5">
            <RightCart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
