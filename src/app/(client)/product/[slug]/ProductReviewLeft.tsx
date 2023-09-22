import { CommonSvg } from '@/assets/CommonSvg';
import React from 'react';

const ProductReviewLeft = () => {
  return (
    <div className="flex flex-col overflow-auto items-start w-auto space-y-6 pb-16">
      <div className="flex flex-row p-1 w-full items-center justify-center">
        <div className="flex gap-4 mb-0.5 mx-1">
          {[1].map(() => {
            return CommonSvg.startFilled();
          })}
        </div>
        <span className="flex flex-d text-2xl font-bold items-center justify-center">
          4.8
        </span>
        <span className="inline-block text-xl ml-8 font-semibold">
          10000 reviews
        </span>
      </div>
      <div className="flex flex-row w-full justify-center items-center ">
        <ul className="w-full justify-center items-center">
          <li className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly">
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              5 Stars
            </div>
            <div className="h-5 w-[60%] bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-right">
              90%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly">
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            <div className="h-5 w-[60%] bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-right">
              0%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly">
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              3 Stars
            </div>
            <div className="h-5 w-[60%] bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-right">
              100%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly">
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              2 Stars
            </div>
            <div className="h-5 w-[60%] bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-right">
              0%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly">
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">1 Star</div>
            <div className="h-5 w-[60%] bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-right">
              10%
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewLeft;
