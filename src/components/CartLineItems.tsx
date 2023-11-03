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
import { useEffect, useRef, useState } from 'react';
import { Skeleton, Spinner } from '@nextui-org/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';

// import { ScrollArea } from '@/components/ui/scroll-area';
// import { Separator } from '@/components/ui/separator';
// import { UpdateCart } from '@/components/checkout/update-cart';
// import { Icons } from '@/components/icons';

interface CartLineItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CartLineItem[];
  isScrollable?: boolean;
  isEditable?: boolean;
  variant?: 'default' | 'minimal';
  checkedItems: { [key: string]: boolean };
  setCheckedItems: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

const CartItem = ({ item, isChecked, onCheck }) => {
  const {
    onIncreaseItemFromCart,
    onDecreaseItemFromCart,
    onDeleteItemFromCart,
  } = useCart();

  const [prevQuantity, setPrevQuantity] = useState(item.quantity);
  // Thêm trạng thái loading
  const [isLoading, setIsLoading] = useState(false);
  const [productSizeQuantity, setProductSizeQuantity] = useState(null);
  const [disableIncrease, setDisableIncrease] = useState(false);
  const itemKey = `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchProductSizeQuantity = async () => {
      const response = await fetch(
        `/api/product/quantity?productId=${item?.data?.id}&selectedSize=${item?.selectedSize}`
      );
      const data = await response.json();
      console.log(
        '🚀 ~ file: CartLineItems.tsx:44 ~ fetchProductDetail ~ data:',
        data
      );
      setProductSizeQuantity(data);
    };
    fetchProductSizeQuantity();
  }, [item]);

  useEffect(() => {
    if (
      productSizeQuantity &&
      item.quantity >= productSizeQuantity[0]?.quantity
    ) {
      setDisableIncrease(true);
      setIsDisabled(true);
    } else {
      setDisableIncrease(false);
    }
  }, [item, productSizeQuantity]);

  const handleIncreaseItemQuantity = async () => {
    setIsLoading(true);
    setPrevQuantity(item.quantity);
    await onIncreaseItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
    });
    onCheck(itemKey, false, item); // Loại bỏ item khỏi checkedItems
  };

  const handleDecreaseItemQuantity = async () => {
    setIsLoading(true);
    setPrevQuantity(item.quantity);
    await onDecreaseItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
    });
    onCheck(itemKey, false, item); // Loại bỏ item khỏi checkedItems
  };

  const handleDeleteItem = async () => {
    setIsLoading(true);
    await onDeleteItemFromCart({
      data: item?.data,
      selectedSize: item?.selectedSize,
      quantity: item?.quantity,
    });
    onCheck(itemKey, false, item); // Loại bỏ item khỏi checkedItems
  };

  useEffect(() => {
    if ((isLoading && item.quantity != prevQuantity) || !item) {
      setIsLoading(false);
    }
  }, [item]);
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b ">
      <div
        className={`shrink-0 aspect-square w-[120px] ${
          isDisabled ? 'blur-sm' : ''
        }`}
      >
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-lg" /> // Sử dụng Skeleton khi isLoading là true
        ) : (
          <div className="flex flex-row space-x-2 items-center justify-center">
            <Input
              width={30}
              height={30}
              type="checkbox"
              disabled={isDisabled}
              checked={isChecked}
              onChange={(e) => onCheck(itemKey, e.target.checked, item)}
            />

            <Image
              src={parseJSON(item?.data?.thumbnail)?.url}
              alt={item?.data?.name}
              width={90}
              height={80}
            />
          </div>
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
                    className="h-8 w-11 rounded-none border-x-0 text-black 
                    text-sm items-center justify-center"
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
                  disabled={isLoading || disableIncrease}
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
  checkedItems,
  setCheckedItems,
  ...props
}: CartLineItemsProps) {
  const Wrapper = isScrollable ? ScrollArea : Slot;

  // Start control checkbox

  const handleCheck = (id, isChecked, item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: isChecked ? item : null,
    }));
  };

  // End control checkbox

  // Start set-up infinite scroll
  const fetchCartItem = async (page: number) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const start = (page - 1) * 3;
    return items.slice(start, start + 3);
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['cartQuery'],
    async ({ pageParam = 1 }) => {
      const response = await fetchCartItem(pageParam);
      return response;
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [items.slice(0, 3)],
        pageParams: [1],
      },
    }
  );

  const lastCartRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastCartRef.current,
    threshold: 0.5,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry]);

  const _items = data?.pages.flatMap((page) => page);

  // End set-up infinite scroll
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
        {_items?.map((item, i) => {
          if (i === _items.length - 1) {
            return (
              <div
                ref={ref}
                key={`${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`}
              >
                <CartItem
                  item={item}
                  isChecked={checkedItems[item?.data?.id]}
                  onCheck={handleCheck}
                />
              </div>
            );
          }

          return (
            <div
              key={`${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`}
            >
              <CartItem
                item={item}
                isChecked={checkedItems[item.data.id]}
                onCheck={handleCheck}
              />
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      )}
    </Wrapper>
  );
}
