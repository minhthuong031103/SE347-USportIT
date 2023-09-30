'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import { Skeleton } from '@/components/ui/skeleton';
import { useReview } from '@/hooks/useReview';
import { parseJSON } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

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
  const [reviewRating, setReviewRating] = useState<TotalReviewRating>();
  const { onGetProductReviewRating } = useReview();
  console.log(reviewRating);
  //Fetch review rating data when first render
  useEffect(() => {
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

  const starArray = Array.from(
    { length: Math.round(averageRating() as number) },
    (_, index) => index + 1
  );
  const blankStarArray = Array.from(
    { length: 5 - Math.round(averageRating() as number) },
    (_, index) => index + 1
  );
  // if (!reviewRating)
  //   return (
  //     <div className="flex items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  return (
    <div className="flex flex-col overflow-auto items-center justify-center w-auto space-y-6 pb-16">
      <div className="flex flex-row p-1 w-full,//  items-center justify-center">
        <div className="flex gap-4 mb-0.5 mx-1"></div>
        <div>
          {reviewRating ? (
            <div className="flex flex-col p-1 w-full gap-[15px] items-center justify-center ">
              <div>
                <div className="flex flex-row p-1 w-full gap-4 items-center justify-center">
                  {starArray.map((item) => {
                    return (
                      <div key={starArray.indexOf(item)}>
                        {' '}
                        {CommonSvg.startFilled('black', 8, 8)}
                      </div>
                    );
                  })}
                  {blankStarArray.map((item) => {
                    return (
                      <div key={starArray.indexOf(item)}>
                        {' '}
                        {CommonSvg.startFilled('gray', 8, 8)}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-row p-1 w-full items-center justify-center">
                <div className="mx-1 mb-1">
                  {[1].map((item) => {
                    return (
                      <div key={item}>
                        {' '}
                        {CommonSvg.startFilled('black', 5, 5)}
                      </div>
                    );
                  })}
                </div>
                <span className="flex flex-d text-2xl font-bold items-center justify-center">
                  {averageRating()}
                </span>
                <span className="inline-block text-2xl ml-8 font-semibold">
                  {reviewRating
                    ? reviewRating.totalReview > 1
                      ? `${reviewRating.totalReview} Reviews`
                      : 'Review'
                    : ' '}
                </span>
              </div>
            </div>
          ) : (
            <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
          )}
        </div>
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
            {reviewRating ? (
              <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
                <div
                  className={`h-4 bg-slate-800 border-1 rounded-xl`}
                  style={{ width: fiveStarPercentage() }}
                ></div>
              </div>
            ) : (
              <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
            )}

            {reviewRating ? (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                {(reviewRating?.totalFiveStar / reviewRating?.totalReview) *
                  100}
                %
              </span>
            ) : (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                0 %
              </span>
            )}
          </li>
          <li
            key="four-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            {reviewRating ? (
              <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
                <div
                  className={`h-4 bg-slate-800 border-1 rounded-xl`}
                  style={{ width: fourStarPercentage() }}
                ></div>
              </div>
            ) : (
              <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
            )}

            {reviewRating ? (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                {(reviewRating?.totalFourStar / reviewRating?.totalReview) *
                  100}
                %
              </span>
            ) : (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                0 %
              </span>
            )}
          </li>
          <li
            key="three-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            {reviewRating ? (
              <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
                <div
                  className={`h-4 bg-slate-800 border-1 rounded-xl`}
                  style={{ width: threeStarPercentage() }}
                ></div>
              </div>
            ) : (
              <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
            )}

            {reviewRating ? (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                {(reviewRating?.totalThreeStar / reviewRating?.totalReview) *
                  100}
                %
              </span>
            ) : (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                0 %
              </span>
            )}
          </li>
          <li
            key="two-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            {reviewRating ? (
              <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
                <div
                  className={`h-4 bg-slate-800 border-1 rounded-xl`}
                  style={{ width: twoStarPercentage() }}
                ></div>
              </div>
            ) : (
              <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
            )}

            {reviewRating ? (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                {(reviewRating?.totalTwoStar / reviewRating?.totalReview) * 100}
                %
              </span>
            ) : (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                0 %
              </span>
            )}
          </li>
          <li
            key="one-star"
            className="flex flex-row ml-1 border-collapse pb-2 items-center justify-evenly"
          >
            <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
              4 Stars
            </div>
            {reviewRating ? (
              <div className="h-4 xl:w-[75%] md:w-[60%] w-[55%] bg-slate-400 border-1 rounded-lg">
                <div
                  className={`h-4 bg-slate-800 border-1 rounded-xl`}
                  style={{ width: oneStarPercentage() }}
                ></div>
              </div>
            ) : (
              <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[55%]" />
            )}

            {reviewRating ? (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                {(reviewRating?.totalOneStar / reviewRating?.totalReview) * 100}
                %
              </span>
            ) : (
              <span className="lg:w-[10%] w-[5%] inline-block text-xs lg:text-sm pl-1 text-center">
                0 %
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductReviewRating;
