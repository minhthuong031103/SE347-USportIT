'use client';
import ReviewDetail from '@/components/ReviewDetail';
import { useReview } from '@/hooks/useReview';

import React from 'react';
import { Pagination, Skeleton } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
const ProductReview = ({ product }) => {
  //State of current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const onSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  const { onGetProductReview, onGetProductReviewRating } = useReview();
  //Get review data per page from API
  // Define a query key and fetch function for fetching review data
  const reviewDataQueryKey = ['productReview', product.id, currentPage];
  const fetchReviewData = async () => {
    const fetchedReviewData = await onGetProductReview(product.id, currentPage);
    return fetchedReviewData;
  };

  // Define a query key and fetch function for fetching review rating data
  const reviewRatingQueryKey = ['productReviewRating', product.id];
  const fetchReviewRatingData = async () => {
    const fetchedReviewRatingData = await onGetProductReviewRating(product.id);
    return fetchedReviewRatingData;
  };

  // Fetch review data
  const {
    data: reviewData,
    isFetched: isReviewDataFetched,
    refetch: refetchReviewData,
  } = useQuery(reviewDataQueryKey, fetchReviewData, {
    staleTime: 1000 * 60 * 1,
    keepPreviousData: true,
  });

  // Fetch review rating data
  const { data: reviewRatingData, refetch: refetchReviewRatingData } = useQuery(
    reviewRatingQueryKey,
    fetchReviewRatingData,
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
    }
  );

  return (
    <div ref={ref} className="pt-4">
      <div className="z-40 space-y-2 pt-4 flex flex-col items-center">
        <div className="flex flex-col w-full gap-y-3 items-center">
          {isFetched
            ? data?.data?.map((item) => (
                <div className="p-1 w-full" key={item.id}>
                  <ReviewDetail data={item} />
                </div>
              ))
            : [1, 2, 3].map((item) => (
                <div className="p-1 w-full" key={item}>
                  <Skeleton className="rounded" disableAnimation>
                    <ReviewDetail data={{ title: 'ABCDEF' }} />
                  </Skeleton>
                </div>
              ))}
        </div>
      </div>
      <div className="w-full py-5">
        <ProductReviewItem
          reviewItemData={reviewData}
          currentPage={currentPage}
          setCurrentPage={onSetCurrentPage}
          isFetched={isReviewDataFetched}
        />
      </div>
    </div>
  );
};

export default ProductReview;
