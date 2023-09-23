'use client';
import { CommonSvg } from '@/assets/CommonSvg';
import React, { useLayoutEffect, useRef, useState } from 'react';

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

const ReviewDetail = () => {
  const ref = useRef(null);

  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  //Create mock data
  const mockData = {
    title: "C'est magnifique",
    date: '23 Sept 2023',
    rating: 2,
    name: 'Minh Quan',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        leo dapibus, gravida enim eu, molestie ex. Vestibulum sit amet ante
        vitae ante venenatis hendrerit. Mauris malesuada sem nec lectus sodales
        tristique. Sed scelerisque neque non erat imperdiet posuere. Donec at
        massa vitae mauris luctus venenatis. Integer blandit ut velit sed
        imperdiet. Morbi a lectus nulla. Nam scelerisque nisl eget lorem
        porttitor finibus. Donec ullamcorper gravida placerat. Phasellus
        scelerisque pellentesque eros, et consequat nunc posuere in. Phasellus
        ultricies aliquam ligula non tincidunt. Maecenas a ultrices metus. Ut
        laoreet eget quam non mattis. Vivamus eget enim vel ex vehicula
        porttitor.`,
  };
  //Create star array
  const starArray = Array.from(
    { length: mockData.rating },
    (_, index) => index + 1
  );
  const blankStarArray = Array.from(
    { length: 5 - mockData.rating },
    (_, index) => index + 1
  );
  return (
    <div className="flex flex-col gap-[8px] lg:gap-[16px] border rounded-xl p-4 py-6">
      <div className="flex flex-row relative items-center">
        <span className="font-bold text-xl">{mockData.title}</span>
        <span className="absolute inset-y-0 right-0 font-light fill-slate-400 ">
          {mockData.date}
        </span>
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
      <span className="font-semibold text-xl">Minh Quan</span>
      <div>
        <p
          ref={ref}
          className={`break-words ${!isShowingMore && 'line-clamp-3'}`}
        >
          {mockData.content}
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
