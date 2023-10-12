'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Zoom } from './ui/zoom-image';

// Hook for checking if element is truncated or not
const useTruncatedElement = ({ ref }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  // Check if element is truncated
  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => {
    setIsShowingMore((prev) => !prev);
  };

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  };
};

const ReviewDetail = ({ data }) => {
  const ref = useRef(null);

  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  //Check images json string
  //console.log(' ==> ' + JSON.parse(data.images));
  //Create star array
  const starArray = Array.from(
    { length: data.rating },
    (_, index) => index + 1
  );
  const blankStarArray = Array.from(
    { length: 5 - data.rating },
    (_, index) => index + 1
  );
  return (
    <div className="flex w-full flex-col gap-[8px] lg:gap-[16px] border-b-2 border-x-zinc-900 px-5 py-6">
      <div className="flex flex-col sm:flex-row relative sm:items-center">
        <span className="font-bold text-sm md:text-xl">{data.title}</span>
        <span className="sm:ml-auto font-extralight text-[11px] md:text-sm xs:mt-1 mt-2 text-neutral-500">
          {new Date(data.reviewDate).toLocaleString()}
        </span>
      </div>
      <div className="flex gap-4 mb-0.5">
        {' '}
        {starArray.map((item) => {
          return (
            <div key={starArray.indexOf(item)}>
              {' '}
              {CommonSvg.startFilled('black', 5, 5)}
            </div>
          );
        })}
        {blankStarArray.map((item) => {
          return (
            <div key={starArray.indexOf(item)}>
              {' '}
              {CommonSvg.startFilled('gray', 5, 5)}
            </div>
          );
        })}
      </div>
      <span className="font-semibold text-sm md:text-lg">
        {data.user ? data.user.name : 'Anonymous'}
      </span>

      <div className="flex flex-row w-full h-fill gap-[10px]">
        {parseJSON(data.images).map((item, index) => (
          <div key={`${item.id}-${index}`}>
            <Zoom>
              <Image
                src={item.url}
                alt={item.name}
                className="h-12 sm:h-16 w-12 sm:w-16 shrink-0 rounded-md object-cover object-center"
                width={500}
                height={500}
              />
            </Zoom>
          </div>
        ))}
      </div>

      <div>
        <p
          ref={ref}
          className={`break-words ${
            !isShowingMore && 'text-sm md:text-lg line-clamp-3'
          }`}
        >
          {data.text}
        </p>
        {isTruncated && (
          <button
            className="font-semibold text-sm md:text-lg"
            onClick={toggleIsShowingMore}
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
