'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/dialog';
import React from 'react';

const ProductReviewForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="border-transparent hover:scale-105 hover:transition hover:duration-200 font-semibold text-white"
          onClick={() => setIsVisible(!isVisible)}
        >
          Write a Review
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div>hello</div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductReviewForm;
