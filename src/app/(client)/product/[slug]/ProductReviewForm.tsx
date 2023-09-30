'use client';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import React from 'react';

const ProductReviewForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div className="z-50 flex flex-col items-center justify-center overflow-hidden">
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
