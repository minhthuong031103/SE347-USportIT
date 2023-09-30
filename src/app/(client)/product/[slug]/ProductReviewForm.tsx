'use client';
import { Button } from '@/components/new-york/button';
import Modal from '@/components/new-york/modal';
import React from 'react';

const ProductReviewForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div className="z-50 flex flex-d flex-col items-center justify-center overflow-hidden">
      <Button
        className="border-transparent hover:scale-105 hover:transition hover:duration-200 font-semibold text-white"
        onClick={() => setIsVisible(!isVisible)}
      >
        Write a Review
      </Button>
      <Modal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
      ></Modal>
    </div>
  );
};

export default ProductReviewForm;
