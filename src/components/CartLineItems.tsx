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
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useIntersection } from '@mantine/hooks';
import { useDebouncedCallback } from 'use-debounce';
import toast from 'react-hot-toast';

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
  enableCheck?: boolean;
}

const CartItem = ({ item, isChecked, onCheck, enableCheck }) => {
  const {
    // onAddToCart,
    onUpdateCart,
    // onIncreaseItemFromCart,
    // onDecreaseItemFromCart,
    onDeleteItemFromCart,
  } = useCart();

  const queryClient = useQueryClient();
  // Sử dụng trạng thái cục bộ để theo dõi số lượng sản phẩm
  const [quantity, setQuantity] = useState();
  // Thêm trạng thái loading
  const [isLoading, setIsLoading] = useState(false);

  // console.log(
  //   '🚀 ~ file: CartLineItems.tsx:55 ~ CartItem ~ setIsLoading:',
  //   setIsLoading
  // );

  const itemKey = `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`;

  const debouncedOnUpdateCart = useDebouncedCallback(
    // Hàm cần debounce
    (data, selectedSize, quantity) => {
      onUpdateCart({ data, selectedSize, quantity });
      queryClient.refetchQueries(['useCart']);
      // queryClient.resetQueries(['cartQuery']);
    },
    // Thời gian delay (0.5 giây)
    500
  );

  // Định nghĩa hàm fetchProductSizeQuantity như một hàm bất đồng bộ
  const fetchProductSizeQuantity = async (item) => {
    const response = await fetch(
      `/api/product/quantity?productId=${item?.data?.id}&selectedSize=${item?.selectedSize}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  // Sử dụng useQuery trong component
  const { data: productSizeQuantity } = useQuery({
    queryKey: ['ProductSizeQuantity'],
    queryFn: () => fetchProductSizeQuantity(item),
  });

  const handleIncreaseItemQuantity = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    debouncedOnUpdateCart(item?.data, item?.selectedSize, newQuantity);

    // Loại bỏ item khỏi checkedItems
    if (isChecked) {
      onCheck(itemKey, true, item, newQuantity);
    } else {
      onCheck(itemKey, false, item, newQuantity);
    }
  };

  const handleDecreaseItemQuantity = async () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    debouncedOnUpdateCart(item?.data, item?.selectedSize, newQuantity);
    // Loại bỏ item khỏi checkedItems
    if (isChecked) {
      onCheck(itemKey, true, item, newQuantity);
    } else {
      onCheck(itemKey, false, item, newQuantity);
    }
  };

  const handleDeleteItem = async () => {
    try {
      setIsLoading(true);
      await onDeleteItemFromCart({
        data: item?.data,
        selectedSize: item?.selectedSize,
        quantity: item?.quantity,
      });
      onCheck(itemKey, false, item, 0); // Loại bỏ item khỏi checkedItems

      await new Promise((resolve) => setTimeout(resolve, 4000));
      queryClient.removeQueries(['cartQuery']);
      setIsLoading(false);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Sử dụng useEffect để cập nhật lại số lượng sản phẩm khi item thay đổi
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b ">
      <div
        className={`shrink-0 aspect-square w-[120px] ${
          productSizeQuantity && quantity > productSizeQuantity[0]?.quantity
            ? 'blur-sm'
            : ''
        }`}
      >
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-lg" /> // Sử dụng Skeleton khi isLoading là true
        ) : (
          <div className="flex flex-row space-x-2 items-center justify-center">
            {enableCheck ?? (
              <Input
                width={30}
                height={30}
                type="checkbox"
                disabled={
                  productSizeQuantity &&
                  quantity > productSizeQuantity[0]?.quantity
                }
                checked={isChecked}
                onChange={(e) =>
                  onCheck(itemKey, e.target.checked, item, quantity)
                }
              />
            )}

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
              {item?.data?.subtitle ? item?.data?.subtitle : `Giày`}
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
            <div className="flex items-center gap-1 flex-wrap md:mt-0 mt-4">
              <div className="font-semibold">Kích cỡ:</div>
              {item.selectedSize}
            </div>
            <div className="flex items-center justify-center gap-1 md:flex-row flex-col">
              <div className="font-semibold">Số lượng:</div>

              <div className="flex items-center justify-center">
                <Button
                  id={`${item?.data?.id}-decrement`}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={handleDecreaseItemQuantity}
                  // disabled={isPending}
                  disabled={quantity === 1}
                >
                  {CommonSvg.subtract({ className: 'h-3 w-3' })}
                </Button>

                <div>
                  <Input
                    id={`${item?.data?.id}-quantity`}
                    type="text"
                    min="0"
                    className="h-8 w-11 rounded-none border-x-0 text-black 
                    text-sm mb-3"
                    value={quantity}
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
                  disabled={
                    productSizeQuantity &&
                    quantity > productSizeQuantity[0]?.quantity
                  }
                >
                  {CommonSvg.add({ className: 'h-3 w-3' })}
                  <span className="sr-only">Thêm một sản phẩm</span>
                </Button>
              </div>
            </div>
            <Button
              onClick={() => {
                toast.promise(
                  handleDeleteItem(),
                  {
                    loading: 'Đang xóa khỏi giỏ hàng...',
                    success: 'Xóa khỏi giỏ hàng thành công!',
                    error: (err) => `This just happened: ${err.toString()}`,
                  },
                  {
                    style: {
                      minWidth: '200px',
                      minHeight: '50px',
                    },
                  }
                );
              }}
              size={'sm'}
              variant={'outline'}
              className="md:mt-2 mt-8"
            >
              <Icons.trash className="h-4 w-4 text-primary" />
            </Button>
          </div>
        )}

        {productSizeQuantity && quantity > productSizeQuantity[0]?.quantity ? (
          <div className="font-medium text-red-500">
            Bạn đã nhập vượt quá số lượng sản phẩm có sẵn. Vui lòng giảm số
            lượng sản phẩm.
          </div>
        ) : null}
      </div>
    </div>
  );
};

export function CartLineItems({
  items,
  isScrollable = true,
  className,
  enableCheck,
  checkedItems,
  setCheckedItems,
  ...props
}: CartLineItemsProps) {
  const Wrapper = isScrollable ? ScrollArea : Slot;

  // Start select all checkbox
  const [allSelected, setAllSelected] = useState(false);

  const areAllItemsChecked = () => {
    return items?.every(
      (item) =>
        !!checkedItems[
          `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`
        ]
    );
  };

  useEffect(() => {
    setAllSelected(areAllItemsChecked());
  }, [checkedItems]);

  const unselectAll = () => {
    setCheckedItems({});
    setAllSelected(false);
  };

  const checkAll = () => {
    const newCheckedItems = {};
    items.forEach((item) => {
      const itemKey = `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`;
      newCheckedItems[itemKey] = { ...item, quantity: item.quantity };
    });
    setCheckedItems(newCheckedItems);
    setAllSelected(true);
  };

  // End select all checkbox

  // Start control checkbox

  const handleCheck = (id, isChecked, item, uiQuantity) => {
    setCheckedItems((prevState) => {
      if (isChecked) {
        return { ...prevState, [id]: { ...item, quantity: uiQuantity } };
      } else {
        const newState = { ...prevState };
        delete newState[id];
        return newState;
      }
    });
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
        pages: [items?.slice(0, 3)],
        pageParams: [1],
      },
    }
  );

  // Update infinite scroll khi items thay đổi số lượng
  // const quantities = items.map((item) => item.quantity);

  // Khong xoa doan nay, co 1 bug nao do ma hien tai chua
  // useEffect(() => {
  //   refetch();
  // }, [quantities]);

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
    <div className="h-full w-full">
      {enableCheck ?? (
        <Button
          onClick={allSelected ? unselectAll : checkAll}
          className="mt-4 w-[120px] max-h-max cursor-pointer bg-black"
        >
          {allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
        </Button>
      )}

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
                    isChecked={
                      !!checkedItems[
                        `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`
                      ]
                    }
                    onCheck={handleCheck}
                    enableCheck={enableCheck}
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
                  isChecked={
                    !!checkedItems[
                      `${item?.data?.id}-${item?.data?.name}-${item?.selectedSize}`
                    ]
                  }
                  onCheck={handleCheck}
                  enableCheck={enableCheck}
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
    </div>
  );
}
