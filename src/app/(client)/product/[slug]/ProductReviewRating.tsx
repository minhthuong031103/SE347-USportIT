'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import { useReview } from '@/hooks/useReview';
import { parseJSON } from '@/lib/utils';
import React, { useLayoutEffect, useState } from 'react';

interface TotalReviewRating {
  totalReview: number;
  totalFiveStar: number;
  totalFourStar: number;
  totalThreeStar: number;
  totalTwoStar: number;
  totalOneStar: number;
}

const ProductReviewRating = ({ product }) => {
  //Create review rating state
  const [reviewRating, setReviewRating] = useState<any | TotalReviewRating>([]);
  const { onGetProductReviewRating } = useReview();

  //Fetch review rating data when first render
  useLayoutEffect(() => {
    try {
      const getReviewData = async () => {
        const fetchedReviewData = await onGetProductReviewRating(product.id);
        const ret = parseJSON(JSON.stringify(fetchedReviewData));
        setReviewRating(ret);
      };
      getReviewData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const averageRating = () => {
    if (reviewRating) {
      const totalStar =
        reviewRating?.totalFiveStar * 5 +
        reviewRating?.totalFourStar * 4 +
        reviewRating?.totalThreeStar * 3 +
        reviewRating?.totalTwoStar * 2 +
        reviewRating?.totalOneStar;
      return totalStar / reviewRating?.totalReview;
    }
  };

  const fiveStarPercentage = () => {
    if (reviewRating) {
      return (
        (reviewRating?.totalFiveStar / reviewRating?.totalReview) * 100 + '%'
      );
    }
  };
  console.log(fiveStarPercentage());
  const fourStarPercentage = () => {
    if (reviewRating) {
      return (
        (reviewRating?.totalFourStar / reviewRating?.totalReview) * 100 + '%'
      );
    }
  };
  const threeStarPercentage = () => {
    if (reviewRating) {
      return (
        (reviewRating?.totalThreeStar / reviewRating?.totalReview) * 100 + '%'
      );
    }
  };
  const twoStarPercentage = () => {
    if (reviewRating) {
      return (
        (reviewRating?.totalTwoStar / reviewRating?.totalReview) * 100 + '%'
      );
    }
  };
  const oneStarPercentage = () => {
    if (reviewRating) {
      return (
        (reviewRating?.totalOneStar / reviewRating?.totalReview) * 100 + '%'
      );
    }
  };

  return (
    <div className="flex flex-col overflow-auto items-start w-auto space-y-6 pb-16">
      <div className="flex flex-row p-1 w-full items-center justify-center">
        <div className="flex gap-4 mb-0.5 mx-1">
          {[1].map(() => {
            return CommonSvg.startFilled('black');
          })}
        </div>
        <span className="flex flex-d text-2xl font-bold items-center justify-center">
          {averageRating()}
        </span>
        <span className="inline-block text-2xl ml-8 font-semibold">
          {reviewRating?.totalReview}{' '}
          {reviewRating?.totalReview > 1 ? 'Reviews' : 'Review'}
        </span>
      </div>
      <div className="flex flex-row w-full justify-center items-center ">
        <ul className="w-full justify-center items-center">
          <li
            key="five-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              5 Stars
            </div>
            <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
              <div
                className={`h-4 bg-slate-800 border-1 rounded-xl`}
                style={{ width: fiveStarPercentage() }}
              ></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
              {(reviewRating?.totalFiveStar / reviewRating?.totalReview) * 100}%
            </span>
          </li>
          <li
            key="four-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
              <div
                className={`h-4 bg-slate-800 border-1 rounded-xl`}
                style={{ width: fourStarPercentage() }}
              ></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
              {(reviewRating?.totalFourStar / reviewRating?.totalReview) * 100}%
            </span>
          </li>
          <li
            key="three-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              3 Stars
            </div>
            <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
              <div
                className={`h-4 bg-slate-800 border-1 rounded-xl`}
                style={{ width: threeStarPercentage() }}
              ></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
              {(reviewRating?.totalThreeStar / reviewRating?.totalReview) * 100}
              %
            </span>
          </li>
          <li
            key="two-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              2 Stars
            </div>
            <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
              <div
                className={`h-4 bg-slate-800 border-1 rounded-xl`}
                style={{ width: twoStarPercentage() }}
              ></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
              {(reviewRating?.totalTwoStar / reviewRating?.totalReview) * 100}%
            </span>
          </li>
          <li
            key="one-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">1 Star</div>
            <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
              <div
                className={`h-4 bg-slate-800 border-1 rounded-xl`}
                style={{ width: oneStarPercentage() }}
              ></div>
            </div>
            <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
              {(reviewRating?.totalOneStar / reviewRating?.totalReview) * 100}%
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewRating;
