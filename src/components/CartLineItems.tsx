'use client';

import Image from 'next/image';
import type { CartLineItem } from '@/types';
import { Slot } from '@radix-ui/react-slot';
import { cn, currencyFormat, parseJSON } from '@/lib/utils';
import { Button } from './ui/button';
import { Icons } from '@/assets/Icons';
import { ScrollArea } from './ui/scroll-area';
import { CommonSvg } from '@/assets/CommonSvg';
import { Input } from './ui/input';
import { useCart } from '@/hooks/useCart';
import { useEffect, useState } from 'react';
import { Skeleton } from '@nextui-org/react';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
// import { UpdateCart } from '@/components/checkout/update-cart';
// import { Icons } from '@/components/icons';

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CartLineItem[];
  isScrollable?: boolean;
  isEditable?: boolean;
  variant?: 'default' | 'minimal';
}

const CartItem = ({ item }) => {
  const {
    onIncreaseItemFromCart,
    onDecreaseItemFromCart,
    onDeleteItemFromCart,
  } = useCart();

  const [prevQuantity, setPrevQuantity] = useState(item.quantity);
  // Thêm trạng thái loading
  const [isLoading, setIsLoading] = useState(false);

  const handleIncreaseItemQuantity = async () => {
    setIsLoading(true);
    setPrevQuantity(item.quantity);
    await onIncreaseItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
    });
  };

  const handleDecreaseItemQuantity = async () => {
    setIsLoading(true);
    setPrevQuantity(item.quantity);
    await onDecreaseItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
    });
  };

  const handleDeleteItem = async () => {
    setIsLoading(true);
    await onDeleteItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
      quantity: item?.quantity,
    });
  };

  useEffect(() => {
    if ((isLoading && item.quantity != prevQuantity) || !item) {
      setIsLoading(false);
    }
  }, [item]);
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[120px] ">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-lg" /> // Sử dụng Skeleton khi isLoading là true
        ) : (
          <Image
            src={parseJSON(item?.data?.thumbnail)?.url}
            alt={item?.data?.name}
            width={100}
            height={80}
          />
        )}
      </div>

      <div className="w-full flex flex-col">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-t-lg" />
        ) : (
          <div className="flex flex-col  justify-between">
            <div className="text-sm md:text-lg font-semibold text-black/[0.8]">
              {item?.data?.name}
            </div>
            <div className="text-sm md:text-md font-medium text-black/[0.5] block ">
              {item?.data?.subtitle ? item?.data?.subtitle : `Men's shoes`}
            </div>
            <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
              {currencyFormat(item?.data?.price)}
            </div>
          </div>
        )}

        {isLoading ? (
          <Skeleton className="h-full w-full rounded-b-lg" />
        ) : (
          <div className="flex flex-row flex-wrap justify-between mt-4 gap-2 text-black/[0.5] text-sm md:text-md">
            <div className="flex lg:items-center gap-1 flex-wrap ">
              <div className="font-semibold">Size:</div>
              {item.selectedSize}
            </div>
            <div className="flex items-center justify-center gap-1 md:flex-row flex-col">
              <div className="font-semibold">Quantity:</div>

              <div className="flex items-center  justify-center">
                <Button
                  id={`${item?.data?.id}-decrement`}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={handleDecreaseItemQuantity}
                  // disabled={isPending}
                  disabled={item.quantity === 1 || isLoading}
                >
                  {CommonSvg.subtract({ className: 'h-3 w-3' })}
                </Button>
                <div>
                  <Input
                    id={`${item?.data?.id}-quantity`}
                    type="text"
                    min="0"
                    className="h-8 w-10 rounded-none border-x-0 text-black "
                    value={isLoading ? '...' : item.quantity}
                    disabled
                    // onChange={(e) => {
                    //   startTransition(async () => {
                    //     try {
                    //       await updateCartItemAction({
                    //         productId: cartLineItem.id,
                    //         quantity: Number(e.target.value),
                    //       });
                    //     } catch (err) {
                    //       catchError(err);
                    //     }
                    //   });
                    // }}
                    // disabled={isPending}
                  />
                </div>

                <Button
                  id={`${item?.data?.id}-increment`}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={handleIncreaseItemQuantity}
                  disabled={isLoading}
                >
                  {CommonSvg.add({ className: 'h-3 w-3' })}
                  <span className="sr-only">Add one item</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleDeleteItem}
              size={'sm'}
              variant={'outline'}
              disabled={isLoading}
            >
              <Icons.trash className="h-4 w-4 text-primary" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export function CartLineItems({
  items,
  isScrollable = true,
  className,
  ...props
}: CartLineItemsProps) {
  const Wrapper = isScrollable ? ScrollArea : Slot;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items]);

  return (
    <Wrapper className="h-full">
      <div
        className={cn(
          'flex w-full flex-col gap-5',
          isScrollable && 'pr-6',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-lg" /> // Hiển thị Skeleton khi isLoading là true
        ) : (
          items.map((item) => (
            <CartItem
              key={`${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`}
              item={item}
            />
          ))
        )}
      </div>
    </Wrapper>
  );
}
