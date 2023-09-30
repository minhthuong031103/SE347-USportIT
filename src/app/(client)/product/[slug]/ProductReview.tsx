'use client';
import Loader from '@/components/Loader';
import ReviewDetail from '@/components/ReviewDetail';
import { useReview } from '@/hooks/useReview';

import React from 'react';
import { Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
const ProductReview = ({ product }) => {
  //Get review data from useReview hook
  const { onGetProductReview } = useReview();
  //State of current page for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  const ref = React.useRef(null);

  //Set page state when change review page index
  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage(page);
  };
  //Get review data from API
  const getReviewData = async () => {
    const fetchedReviewData = await onGetProductReview(product.id, currentPage);
    return fetchedReviewData;
  };
  //Update page when change review page index
  const { data, isFetched } = useQuery(
    ['productReview', product.id, currentPage],
    () => getReviewData(),
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
    }
  );

  return (
    <div ref={ref} className="pt-4">
      <div className="z-40 space-y-2 pt-4 flex flex-col items-center">
        <div className="flex flex-col gap-y-3">
          {isFetched ? (
            data?.data?.map((item) => (
              <div className="p-1" key={item.id}>
                <ReviewDetail data={item} />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
        <Pagination
          showControls
          total={data?.totalPages}
          initialPage={1}
          onChange={(page) => {
            onPageChange(page);
          }}
          page={currentPage}
        />
      </div>
    </div>
  );
};

export default ProductReview;
