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
    if (reviewRatingData) {
      const totalStar =
        reviewRating?.totalFiveStar * 5 +
        reviewRating?.totalFourStar * 4 +
        reviewRating?.totalThreeStar * 3 +
        reviewRating?.totalTwoStar * 2 +
        reviewRating?.totalOneStar;
      return (totalStar / reviewRating?.totalReview).toFixed(1);
    }
  };

  const fiveStarPercentage = () => {
    if (reviewRatingData) {
      const percentage = (
        (reviewRatingData.totalFiveStar / reviewRatingData.totalReview) *
        100
      ).toFixed(1);
      return `${percentage}%`;
    }
  };
  const fourStarPercentage = () => {
    if (reviewRatingData) {
      const percentage = (
        (reviewRatingData.totalFourStar / reviewRatingData.totalReview) *
        100
      ).toFixed(1);
      return `${percentage}%`;
    }
  };
  const threeStarPercentage = () => {
    if (reviewRatingData) {
      const percentage = (
        (reviewRatingData.totalThreeStar / reviewRatingData.totalReview) *
        100
      ).toFixed(1);
      return `${percentage}%`;
    }
  };
  const twoStarPercentage = () => {
    if (reviewRatingData) {
      const percentage = (
        (reviewRatingData.totalTwoStar / reviewRatingData.totalReview) *
        100
      ).toFixed(1);
      return `${percentage}%`;
    }
  };
  const oneStarPercentage = () => {
    if (reviewRatingData) {
      const percentage = (
        (reviewRatingData.totalOneStar / reviewRatingData.totalReview) *
        100
      ).toFixed(1);
      return `${percentage}%`;
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

  return (
    <div className="flex flex-col overflow-auto items-center justify-center w-auto space-y-6 pb-16">
      <div className="flex flex-row p-1 w-full items-center justify-center">
        <div className="flex gap-4 mb-0.5 mx-1"></div>
        <div className="w-full flex items-center justify-center">
          {reviewRating == null ? (
            <div className="w-full">
              <Skeleton className="w-full">
                <div className="flex flex-col p-1 w-full gap-[15px] items-center justify-center">
                  <div>
                    <div className="flex flex-row p-1 w-full gap-4 items-center justify-center">
                      {starArray.map((item) => {
                        return (
                          <div key={starArray.indexOf(item)}>
                            {' '}
                            {CommonSvg.startFilled('yellow', 6, 6)}
                          </div>
                        );
                      })}
                      {blankStarArray.map((item) => {
                        return (
                          <div key={starArray.indexOf(item)}>
                            {' '}
                            {CommonSvg.startFilled('red', 6, 6)}
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
                      {`${reviewRating ? reviewRating?.totalReview : ''} ${
                        reviewRating?.totalReview > 1 ? 'Reviews' : 'Review'
                      }`}
                    </span>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center ">
                    <ul className="w-full justify-center items-center">
                      <li
                        key="five-star"
                        className="flex flex-row ml-1 border-collapse pb-2 items-center justify-between"
                      >
                        <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
                          5 Stars
                        </div>
                        {reviewRating?.totalReview ? (
                          <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 border-1 rounded-lg">
                            <div
                              className={`h-4 bg-slate-800 border-1 rounded-xl`}
                              style={{ width: fiveStarPercentage() }}
                            ></div>
                          </div>
                        ) : (
                          <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                        )}

                        {reviewRating?.totalReview ? (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            {fiveStarPercentage()}
                          </span>
                        ) : (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            0 %
                          </span>
                        )}
                      </li>
                      <li
                        key="four-star"
                        className="flex flex-row ml-1 border-collapse pb-2 items-center justify-between"
                      >
                        <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
                          4 Stars
                        </div>
                        {reviewRating?.totalReview ? (
                          <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 border-1 rounded-lg">
                            <div
                              className={`h-4 bg-slate-800 border-1 rounded-xl`}
                              style={{ width: fourStarPercentage() }}
                            ></div>
                          </div>
                        ) : (
                          <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                        )}

                        {reviewRating?.totalReview ? (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            {fourStarPercentage()}
                          </span>
                        ) : (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            0 %
                          </span>
                        )}
                      </li>
                      <li
                        key="three-star"
                        className="flex flex-row ml-1 border-collapse pb-2 items-center justify-between"
                      >
                        <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
                          3 Stars
                        </div>
                        {reviewRating?.totalReview ? (
                          <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 border-1 rounded-lg">
                            <div
                              className={`h-4 bg-slate-800 border-1 rounded-xl`}
                              style={{ width: threeStarPercentage() }}
                            ></div>
                          </div>
                        ) : (
                          <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                        )}

                        {reviewRating?.totalReview ? (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            {threeStarPercentage()}
                          </span>
                        ) : (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            0 %
                          </span>
                        )}
                      </li>
                      <li
                        key="two-star"
                        className="flex flex-row ml-1 border-collapse pb-2 items-center justify-between"
                      >
                        <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
                          2 Stars
                        </div>
                        {reviewRating?.totalReview ? (
                          <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 border-1 rounded-lg">
                            <div
                              className={`h-4 bg-slate-800 border-1 rounded-xl`}
                              style={{ width: twoStarPercentage() }}
                            ></div>
                          </div>
                        ) : (
                          <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                        )}

                        {reviewRating?.totalReview ? (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            {twoStarPercentage()}
                          </span>
                        ) : (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            0 %
                          </span>
                        )}
                      </li>
                      <li
                        key="one-star"
                        className="flex flex-row ml-1 border-collapse pb-2 items-center justify-between"
                      >
                        <div className="w-14 text-xs lg:text-sm pr-1 font-bold">
                          1 Star
                        </div>
                        {reviewRating?.totalReview ? (
                          <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 border-1 rounded-lg">
                            <div
                              className={`h-4 bg-slate-800 border-1 rounded-xl`}
                              style={{ width: oneStarPercentage() }}
                            ></div>
                          </div>
                        ) : (
                          <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                        )}

                        {reviewRating?.totalReview ? (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            {oneStarPercentage()}
                          </span>
                        ) : (
                          <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                            0 %
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </Skeleton>
            </div>
          ) : reviewRatingData?.totalReview == 0 ? (
            // Case 2: reviewRatingData is not null, but totalReview is 0
            <div>
              <span className="text-2xl font-light"> No reviews yet!</span>
            </div>
          ) : (
            // Case 3: reviewRatingData is not null and totalReview is not 0
            <div className="flex flex-col p-1 w-full gap-[15px] items-center justify-center">
              <div>
                <div className="flex flex-row p-1 w-full gap-4 items-center justify-center">
                  {starArray.map((item) => {
                    return (
                      <div key={starArray.indexOf(item)}>
                        {' '}
                        {CommonSvg.startFilled('black', 9, 9)}
                      </div>
                    );
                  })}
                  {blankStarArray.map((item) => {
                    return (
                      <div key={starArray.indexOf(item)}>
                        {' '}
                        {CommonSvg.startFilled('gray', 9, 9)}
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
                  {`${reviewRatingData?.totalReview} ${
                    reviewRatingData?.totalReview > 1 ? 'Reviews' : 'Review'
                  }`}
                </span>
              </div>
              <div className="flex flex-row w-full p-8 md:ml-4 mr-4 xs:mr-0">
                <ul className="w-full">
                  <li
                    key="five-star"
                    className="flex flex-row items-center justify-between ml-1 pb-2"
                  >
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                      5 Stars
                    </div>
                    {reviewRating?.totalReview ? (
                      <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 rounded-lg">
                        <div
                          className={`h-4 bg-slate-800 rounded-xl`}
                          style={{ width: fiveStarPercentage() }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                    )}

                    {reviewRating?.totalReview ? (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        {fiveStarPercentage()}
                      </span>
                    ) : (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        0 %
                      </span>
                    )}
                  </li>


                  <li
                    key="four-star"
                    className="flex flex-row ml-1 pb-2 items-center justify-between"
                  >
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                      4 Stars
                    </div>
                    {reviewRating?.totalReview ? (
                      <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 rounded-lg">
                        <div
                          className={`h-4 bg-slate-800 rounded-xl`}
                          className={`h-4 bg-slate-800 rounded-xl`}
                          style={{ width: fourStarPercentage() }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                    )}

                    {reviewRating?.totalReview ? (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        {fourStarPercentage()}
                      </span>
                    ) : (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        0 %
                      </span>
                    )}
                  </li>
                  <li
                    key="three-star"
                    className="flex flex-row ml-1 pb-2 items-center justify-between"
                  >
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                      3 Stars
                    </div>
                    {reviewRating?.totalReview ? (
                      <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 rounded-lg">
                        <div
                          className={`h-4 bg-slate-800 rounded-xl`}
                          className={`h-4 bg-slate-800 rounded-xl`}
                          style={{ width: threeStarPercentage() }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                    )}

                    {reviewRating?.totalReview ? (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        {threeStarPercentage()}
                      </span>
                    ) : (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        0 %
                      </span>
                    )}
                  </li>
                  <li
                    key="two-star"
                    className="flex flex-row ml-1 pb-2 items-center justify-between"
                  >
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                      2 Stars
                    </div>
                    {reviewRating?.totalReview ? (
                      <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 rounded-lg">
                        <div
                          className={`h-4 bg-slate-800 rounded-xl`}
                          className={`h-4 bg-slate-800 rounded-xl`}
                          style={{ width: twoStarPercentage() }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                    )}

                    {reviewRating?.totalReview ? (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        {twoStarPercentage()}
                      </span>
                    ) : (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                      <span className="lg:w-[10%] w-[5%] inline-block text-[12px] sm:text-sm pl-1 text-center">
                        0 %
                      </span>
                    )}
                  </li>
                  <li
                    key="one-star"
                    className="flex flex-row ml-1 pb-2 items-center justify-between"
                  >
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                    <div className="w-14 text-xs sm:text-sm pr-1 font-bold">
                      1 Star
                    </div>
                    {reviewRating?.totalReview ? (
                      <div className="h-4 xl:w-[75%] md:w-[60%] w-[50%] bg-slate-400 rounded-lg">
                        <div
                          className={`h-4 bg-slate-800 rounded-xl`}
                          style={{ width: oneStarPercentage() }}
                        ></div>
                      </div>
                    ) : (
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                      <Skeleton className="h-4 xl:w-[75%] md:w-[60%] w-[50%]" />
                    )}

                    {reviewRating?.totalReview ? (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[11px] sm:text-sm pl-1 text-center">
                        {oneStarPercentage()}
                      </span>
                    ) : (
                      <span className="lg:w-[10%] w-[5%] inline-block text-[11px] sm:text-sm pl-1 text-center">
                        0 %
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductreviewRatingData;
