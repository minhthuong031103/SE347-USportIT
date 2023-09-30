'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/dialog';
import { Input } from '@nextui-org/react';
import { cn } from '@/lib/utils';
import React from 'react';

const ProductReviewForm = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger>
          <Button
            className="border-transparent hover:scale-105 hover:transition hover:duration-200 font-semibold text-white"
            onClick={() => setIsVisible(!isVisible)}
          >
            Write a Review
          </Button>
        </DialogTrigger>

        <DialogContent className="flex w-[60%] h-[80%]">
          <div className="flex w-[40%] flex-wrap md:flex-nowrap gap-4">
            <Input
              type="text"
              label="Title"
              labelPlacement={'outside'}
              placeholder="Enter review title"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductReviewForm;
