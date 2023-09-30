'use client';
import Loader from '@/components/Loader';
import ReviewDetail from '@/components/ReviewDetail';
import ProductReviewPaginationBar from '@/components/new-york/pagination';
import { useReview } from '@/hooks/useReview';
import { useUser } from '@/hooks/useUser';
import { parseJSON } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

const ProductReview = ({ product }) => {
  //Total page size (5 pages in total)
  const pageSize = 5;

  //Get review data from useReview hook
  const { onGetProductReview } = useReview();
  //Get user data from useUser hook
  const { onGetUserDetail } = useUser();

  //State of current page for pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [data, setData] = useState<any | null>(null);
  //const router = useRouter();

  //Set page state when change review page index
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  //Update page when change review page index
  useEffect(() => {
    try {
      const getReviewData = async () => {
        const fetchedReviewData = await onGetProductReview(
          product.id,
          currentPage
        );
        const reviewWithUserData = await Promise.all(
          parseJSON(JSON.stringify(fetchedReviewData)).map(async (review) => {
            const userData = await onGetUserDetail(review.userId);
            return { ...review, user: userData };
          })
        );
        setData(reviewWithUserData);
        //router.push(`?reviewPage=1`);
      };
      getReviewData();
    } catch (err) {
      console.log(err);
    }
    //router.replace(`?reviewPage=${currentPage}`, { scroll: false });
  }, [currentPage]);

  return (
    <div className="z-40 space-y-2 pb-16 flex flex-col items-center">
      <div>
        {data ? (
          data?.map((item, index) => (
            <div className="p-1">
              <ReviewDetail key={item + index} data={item} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
      <ProductReviewPaginationBar
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      ></ProductReviewPaginationBar>
    </div>
  );
};

export default ProductReview;
