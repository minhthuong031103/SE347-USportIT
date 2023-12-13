'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { currencyFormat } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CheckoutModal from './checkout/CheckoutModal';

function RightCart({ checkedItems }) {
  const { cart } = useCart();
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    const newTotal = Object.values(checkedItems)
      .filter((item) => item !== null) // Lọc ra các mục đã được chọn
      .reduce(
        (sum: number, item: any) => sum + item.data.price * item.quantity,
        0
      );
    setTotal(newTotal);
  }, [checkedItems]);

  console.log(cart);
  return (
    <div className="sticky bottom-0 lg:top-[100px] z-20 bg-white lg:bg-transparent">
      <h2 className="text-lg font-semibold">Summary</h2>
      <div className="grid gap-1.5 lg:gap-4 pr-6 text-sm ">
        <Separator className="mb-2" />
        <div className="flex">
          <span className="flex-1">Subtotal</span>
          <span>{currencyFormat(10000000)}</span>
        </div>
        <div className="flex">
          <span className="flex-1">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex">
          <span className="flex-1">Taxes</span>
          <span>Calculated at checkout</span>
        </div>
        <Separator className="mt-2" />
        <div className="flex">
          <span className="flex-1">Total</span>
          <span>{currencyFormat(total)}</span>
        </div>
        <div>
          <Button
            className="w-full h-full"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Check out
          </Button>

          {isModalOpen && (
            <div>
              {/* <CheckoutForm
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          /> */}

              <CheckoutModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RightCart;
