'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';
// import { FaCheckCircle } from 'react-icons/fa';
// import { useQueryClient } from '@tanstack/react-query';

const schema = z.object({
  quantity: z
    .string()
    .refine((val) => val.length > 0, { message: 'Quantity is required' })
    .transform(Number)
    .refine((value) => Number.isInteger(value) && value >= 0, {
      message: 'Quantity must be a nonnegative integer',
    }),
});

const AddProductDialog = () => {
  const {
    isShowDialog,
    selectedProduct,
    onToggleDialog,
    onToggleSuccess,
    // onUnselectProduct,
  } = useSelectedProduct();
  const [selectedSize, setSizeSelected] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [showError, setShowError] = useState(false);
  // const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { onAddToCart } = useCart();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async (data) => {
    if (errors.quantity) {
      return;
    }

    // Kiểm tra xem người dùng đã chọn đủ thông tin chưa
    if (!selectedSize) {
      return Promise.reject('Size selection is required');
    } else if (!selectedQuantity) {
      return Promise.reject('Quantity selection is required');
    }

    if (data.quantity > selectedQuantity) {
      return Promise.reject('Quantity cannot exceed available stock');
    }

    try {
      onToggleDialog();
      await new Promise((resolve) => setTimeout(resolve, 4000));
      onToggleSuccess();
      resetFormAndState();

      await onAddToCart({
        data: selectedProduct,
        quantity: data.quantity,
        selectedSize: selectedSize,
      });
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      return Promise.reject(error);
    }
  });

  useEffect(() => {
    setIsLoading(!selectedProduct);
  }, [selectedProduct]);

  // useEffect(() => {
  //   if (!isShowDialog) {
  //     onUnselectProduct();
  //   }
  // }, [isShowDialog, onUnselectProduct]);

  const resetFormAndState = useCallback(() => {
    reset();
    setSizeSelected(null);
    setSelectedQuantity(null);
    // setShowSuccess(false);
    setIsLoading(true);
  }, []);

  return isShowDialog ? (
    <DialogCustom
      warningOnClose={true}
      className="flex justify-center items-center w-[90%] lg:w-[60%] h-[90%]"
      isModalOpen={isShowDialog}
      setIsModalOpen={onToggleDialog}
      callBack={resetFormAndState}
    >
      <div className="flex flex-col w-full h-auto pr-4 gap-6">
        <div className="w-full h-fit flex flex-col pt-2 items-center gap-3">
          <span className="text-[12px] sm:text-sm md:text-base font-semibold">
            Thông tin Sản phẩm
          </span>
          <span className="text-[10px] sm:text-sm text-gray-500">
            Chọn thông tin chi tiết của sản phẩm
          </span>
          <div className="w-full h-fit mt-2 flex flex-row gap-3 items-center">
            {isLoading ? (
              <Skeleton className="h-20 w-20 rounded-lg" />
            ) : (
              <Image
                src={parseJSON(selectedProduct.images)[0].url}
                alt={selectedProduct?.name}
                width={60}
                height={50}
                className="rounded-md object-cover object-center"
              />
            )}
            {isLoading ? (
              <Skeleton className="w-20 h-10" /> // Sử dụng component Skeleton từ thư viện react-loading-skeleton
            ) : (
              <span className="text-[10px] sm:text-sm text-gray-700">
                {selectedProduct?.name}
              </span>
            )}
          </div>
        </div>

        <div className="mb-10">
          {/* Heading */}
          <div className="flex justify-between mb-2">
            <div className="text-md font-semibold">Chọn kích cỡ</div>
            <div className="text-md font-medium text-black/[0.5] cursor pointer">
              Kích cỡ
            </div>
          </div>
          {/* Heading */}

          {/* Size start */}
          <div id="sizesGrid" className="grid grid-cols-4 gap-2">
            {isLoading ? (
              <>
                <div className="col-span-1">
                  <Skeleton className="h-10 border-2 rounded-md py-2.5" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-10 border-2 rounded-md py-2.5" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-10 border-2 rounded-md py-2.5" />
                </div>
                <div className="col-span-1">
                  <Skeleton className="h-10 border-2 rounded-md py-2.5" />
                </div>
              </>
            ) : (
              selectedProduct.productSizes?.map((size, index) => (
                <div
                  onClick={
                    size.quantity > 0
                      ? () => {
                          setSizeSelected(size.size);
                          setSelectedQuantity(size.quantity);
                          setShowError(false);
                        }
                      : () => {}
                  }
                  key={index}
                  className={`border-2 rounded-md text-center py-2.5 font-medium hover:bg-slate-300 cursor-pointer ${
                    size.quantity > 0
                      ? 'hover:border-black cursor-pointer'
                      : 'cursor-not-allowed disabled bg-black/[0.1] opacity-50'
                  } ${selectedSize === size.size ? 'border-black' : ''} `}
                >
                  {size.size}
                </div>
              ))
            )}
          </div>
          {/* Size end */}

          {/* Show error */}
          {showError && (
            <div className="text-red-600 mt-1">
              Vui lòng chọn kích cỡ sản phẩm
            </div>
          )}
          {/* Show error */}
        </div>

        <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
          <Label className="font-semibold text-[10px] sm:text-[14px]">
            Số lượng
          </Label>
          <Controller
            control={control}
            defaultValue={''}
            name="quantity"
            render={({ field }) => {
              return (
                <div>
                  <Input
                    radius="sm"
                    type="text"
                    size="sm"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  {errors.quantity && (
                    <p className="text-red-500">{errors.quantity.message}</p>
                  )}
                </div>
              );
            }}
          />

          {/* Start In Inventory */}
          <Label className="font-normal italic text-[10px] sm:text-[14px]">
            Tồn kho: {selectedQuantity}
          </Label>
          {/* End In Inventory */}
        </div>

        <div className="flex w-full mt-5 justify-center items-center">
          <Button
            className="w-[50%] inset-0 border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold text-white rounded-md"
            onClick={() => {
              toast.promise(
                onSubmit(),
                {
                  loading: 'Đang thêm vào giỏ hàng ...',
                  success: 'Thêm vào giỏ hàng thành công!',
                  error: (err) => `${err}`,
                },
                {
                  style: {
                    minWidth: '200px',
                    minHeight: '50px',
                  },
                  position: 'bottom-right',
                }
              );
            }}
            disabled={!isValid}
          >
            Xác nhận
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        {/* Loading Dialog */}
        {/* {isAddingToCart && selectedSize && selectedQuantity && (
          <DialogCustom
            className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
            isModalOpen={isAddingToCart}
            notShowClose={true}
          >
            <div className="flex flex-col gap-3 items-center justify-center">
              <Spinner size="lg" />
              <div className="text-center font-semibold text-xs sm:text-sm">
                Adding to cart ...
              </div>
            </div>
          </DialogCustom>
        )} */}

        {/* Success Dialog */}
        {/* {successAdded && (
          <DialogCustom
            className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
            isModalOpen={isAddingToCart}
            notShowClose={true}
          >
            <div className="flex flex-col gap-3 items-center justify-center">
              <FaCheckCircle className="text-gray-700" size={35} />
              <div className="text-center font-semibold text-xs sm:text-sm">
                Added to cart!
              </div>
            </div>
          </DialogCustom>
        )} */}
      </div>
    </DialogCustom>
  ) : null;
};

export default AddProductDialog;
