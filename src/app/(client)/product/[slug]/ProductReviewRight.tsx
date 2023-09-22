import { CommonSvg } from '@/assets/CommonSvg';
import React from 'react';

const ProductReviewRight = () => {
  return (
    <div className="flex flex-col overflow-auto items-start w-auto space-y-6 pb-16">
      <div className="flex flex-row p-1 md:w-full items-center">
        <div className="flex gap-4 justify-left items-center mb-0.5 mx-1">
          {[1].map(() => {
            return CommonSvg.startFilled();
          })}
        </div>
        <span className="flex flex-d text-xl font-bold items-center justify-center">
          4.8
        </span>
        <span className="inline-block text-lg ml-8 font-semibold">
          10000 reviews
        </span>
      </div>
      <div className="flex flex-row w-full justify-start">
        <ul className="w-full justify-center items-center">
          <li className="flex flex-row ml-1 border-collapse">
            <div className="w-16 text-md font-bold">5 Stars</div>
            <div className="h-5 w-[80%] lg:w-[85%]  ml-5 bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[90%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="flex-grow inline-block text-md ml-4 text-right">
              90%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse">
            <div className="w-16 text-md font-bold">4 Stars</div>
            <div className="h-5 w-[80%] lg:w-[85%] ml-5 bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[5%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="flex-grow inline-block text-md ml-4 text-right">
              5%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse">
            <div className="w-16 text-md font-bold">3 Stars</div>
            <div className="h-5 w-[80%] lg:w-[85%] ml-5 bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[5%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="flex-grow inline-block text-md ml-4 text-right">
              5%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse">
            <div className="w-16 text-md font-bold">2 Stars</div>
            <div className="h-5 w-[80%] lg:w-[85%] ml-5 bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[0%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="flex-grow inline-block text-md ml-4 text-right">
              0%
            </span>
          </li>
          <li className="flex flex-row ml-1 border-collapse">
            <div className="w-16 text-md font-bold ">1 Star</div>
            <div className="h-5 w-[80%] lg:w-[85%] ml-5 bg-slate-400 border-1 rounded-lg">
              <div className="h-5 w-[0%] bg-slate-800 border-1 rounded-xl"></div>
            </div>
            <span className="flex-grow inline-block text-md ml-4 text-right">
              0%
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewRight;
