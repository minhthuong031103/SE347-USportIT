'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Zoom } from './new-york/zoom-image';

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
    <div className="flex w-full flex-col gap-[8px] lg:gap-[16px] border rounded-xl p-4 py-6">
      <div className="flex flex-row relative items-center">
        <span className="font-bold text-xl">{data.title}</span>
        {/* <span className="absolute inset-y-0 right-0 font-light fill-slate-400 ">
          {data.date}
        </span> */}
      </div>
      <div className="flex gap-4 mb-0.5 mx-1">
        {' '}
        {starArray.map(() => {
          return CommonSvg.startFilled('black');
        })}
        {blankStarArray.map(() => {
          return CommonSvg.startFilled('gray');
        })}
      </div>
      <span className="font-semibold text-xl">
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
          className={`break-words ${!isShowingMore && 'line-clamp-3'}`}
        >
          {data.text}
        </p>
        {isTruncated && (
          <button className="font-semibold" onClick={toggleIsShowingMore}>
            {isShowingMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
