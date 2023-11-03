'use client';
import React, { useCallback, useEffect, useState } from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { Input, Spinner } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { FaCheckCircle } from 'react-icons/fa';

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
  const [showSuccess, setShowSuccess] = useState(false);
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
    setIsLoading(true);

    if (errors.quantity) {
      return;
    }

    // Kiểm tra xem người dùng đã chọn đủ thông tin chưa
    if (!selectedSize) {
      toast.error('Size selection is required');
      return;
    } else if (!selectedQuantity) {
      toast.error('Quantity selection is required');
      return;
    }

    if (data.quantity > selectedQuantity) {
      console.log(
        '🚀 ~ file: AddProductDialog.tsx:52 ~ onSubmit ~ selectedQuantity:',
        selectedQuantity
      );
      toast.error('Quantity cannot exceed available stock');
      return;
    }

    if (!selectedSize) {
      setShowError(true);
      return;
    }

    console.log(
      '🚀 ~ file: AddProductDialog.tsx:65 ~ onSubmit ~ selectedProduct:',
      selectedProduct
    );
    try {
      await onAddToCart({
        data: selectedProduct,
        quantity: data.quantity,
        selectedSize: selectedSize,
      });
      setIsLoading(false);
      setShowSuccess(true);

      // Chờ cho đến khi onAddToCart hoàn thành trước khi gọi onToggleDialog
      setTimeout(() => {
        onToggleDialog();
        onToggleSuccess();
        resetFormAndState();
      }, 2000);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
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
    setShowSuccess(false);
    setIsLoading(false);
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
            Choose product details
          </span>
          <span className="text-[10px] sm:text-sm text-gray-500">
            Choose the right product details
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
            <div className="text-md font-semibold">Select size</div>
            <div className="text-md font-medium text-black/[0.5] cursor pointer">
              Select guide
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
            <div className="text-red-600 mt-1">Size selection is required</div>
          )}
          {/* Show error */}
        </div>

        <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
          <Label className="font-semibold text-[10px] sm:text-[14px]">
            Quantity
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
        </div>

        <div className="flex w-full mt-5 justify-center items-center">
          <Button
            className="w-[50%] inset-0 border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold text-white rounded-md"
            onClick={onSubmit}
            disabled={!isValid}
          >
            Submit
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 items-center justify-center">
        {/* Loading Dialog */}
        {isLoading && selectedSize && selectedQuantity && (
          <DialogCustom
            className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
            isModalOpen={isLoading}
            notShowClose={true}
          >
            <div className="flex flex-col gap-3 items-center justify-center">
              <Spinner size="lg" />
              <div className="text-center font-semibold text-xs sm:text-sm">
                Adding to cart ...
              </div>
            </div>
          </DialogCustom>
        )}

        {/* Success Dialog */}
        {showSuccess && (
          <DialogCustom
            className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
            isModalOpen={!isLoading}
            notShowClose={true}
          >
            <div className="flex flex-col gap-3 items-center justify-center">
              <FaCheckCircle className="text-gray-700" size={35} />
              <div className="text-center font-semibold text-xs sm:text-sm">
                Added to cart!
              </div>
            </div>
          </DialogCustom>
        )}
      </div>
    </DialogCustom>
  ) : null;
};

export default AddProductDialog;
