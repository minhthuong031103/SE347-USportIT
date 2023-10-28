'use client';
import React from 'react';
import { CheckoutForm } from './CheckoutForm';
import { Button } from '@/components/ui/button';

export const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Check out
      </Button>

      {isModalOpen && (
        <div>
          <CheckoutForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      )}
    </div>
  );
};
