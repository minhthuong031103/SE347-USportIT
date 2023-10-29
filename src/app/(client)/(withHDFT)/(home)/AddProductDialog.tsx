'use client';
import React, { useEffect, useState } from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSelectedProduct } from '@/hooks/useSelectedProduct';
import { parseJSON } from '@/lib/utils';
import Image from 'next/image';
import { useProduct } from '@/hooks/useProduct';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@nextui-org/react';
// import { yup } from 'yup';

const AddProductDialog = ({
  // reset,
  // setRating,
  // setHover,
  // setIsInvalid,
  onSubmit,
  rating,
  // hover,
  isInvalid,
  isLoading,
  showSuccess,
}) => {
  const { isShowDialog, selectedProduct, onToggleDialog } =
    useSelectedProduct();
  const [selectedSize, setSizeSelected] = useState(null);
  const [showError, setShowError] = useState(false);
  const [selectDetailData, setSelectDetailData] = useState('');

  /* Form Validation */
  /*   const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError('Quantity must be a number') // Thông báo lỗi kiểu dữ liệu
      .required('Quantity is required') // Thông báo lỗi khi trống
      .positive('Quantity must be a positive number') // Kiểm tra số dương
      .integer('Quantity must be an integer'), // Kiểm tra số nguyên
  }); */

  const { onGetProductDetail } = useProduct();
  const { control, handleSubmit, getValues } = useForm({
    // validationSchema: schema,
  });

  useEffect(() => {
    /* Get product detail */
    const getProductDetails = async () => {
      const fetchProductDetails = await onGetProductDetail(
        selectedProduct?.data.id
      );
      if (fetchProductDetails) {
        console.log(fetchProductDetails);
      }
      const data = parseJSON(JSON.stringify(fetchProductDetails));
      setSelectDetailData(data);
    };

    if (isShowDialog) {
      getProductDetails();
      console.log(
        '🚀 ~ file: AddProductDialog.tsx:57 ~ useEffect ~ getValues:',
        getValues('title')
      );
    }
  }, [isShowDialog]);

  return isShowDialog ? (
    <DialogCustom
      warningOnClose={true}
      className="flex justify-center items-center w-[90%] lg:w-[60%] h-[90%]"
      isModalOpen={isShowDialog}
      setIsModalOpen={onToggleDialog}
      callBack={() => {
        // Reset form details and state variables
        // when the dialog is closed
        // reset();
        // setRating(0);
        // setHover(0);
        // setIsInvalid(false);
      }}
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
            <Image
              src={parseJSON(selectedProduct?.data.images)[0].url}
              alt={selectedProduct?.name}
              width={60}
              height={50}
              className="rounded-md object-cover object-center"
            />
            <span className="text-[10px] sm:text-sm text-gray-700">
              {selectedProduct?.data.name}
            </span>
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
          <div id="sizesGrid" className="grid grid-cols-3 gap-2">
            {selectDetailData.productSizes?.map((size, index) => (
              <div
                onClick={
                  size.quantity > 0
                    ? () => {
                        setSizeSelected(size.size);
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
            ))}
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
                <Input
                  radius="sm"
                  type="text"
                  size="sm"
                  value={field.value}
                  onChange={field.onChange}
                />
              );
            }}
          />
        </div>

        <div className="flex w-full mt-5 justify-center items-center">
          <Button
            className="w-[50%] inset-0 border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold text-white rounded-md"
            onClick={async () => {
              try {
                await handleSubmit(onSubmit)();
              } catch (e) {
                // Handle submission error if needed
              }
            }}
          >
            Submit
          </Button>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center">
          {/* Loading Dialog */}
          {isLoading &&
            !showSuccess &&
            rating !== 0 &&
            isTitleValid &&
            isContentValid && (
              <DialogCustom
                className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                isModalOpen={isLoading}
                notShowClose={true}
              >
                <div className="flex flex-col gap-3 items-center justify-center">
                  <Spinner size="lg" />
                  <div className="text-center font-semibold text-xs sm:text-sm">
                    Submitting Review...
                  </div>
                </div>
              </DialogCustom>
            )}

          {/* Invalid Dialog */}
          {isInvalid ? (
            <DialogCustom
              className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
              isModalOpen={!isLoading}
            >
              <div className="flex flex-col gap-3 items-center justify-center">
                {rating === 0 ? (
                  <>
                    <FaExclamationTriangle
                      className="text-gray-700"
                      size={35}
                    />
                    <div className="text-center font-semibold text-xs sm:text-sm">
                      Please type in your rating!
                    </div>
                  </>
                ) : !isTitleValid ? (
                  <>
                    <FaExclamationTriangle
                      className="text-gray-700"
                      size={35}
                    />
                    <div className="text-center font-semibold text-xs sm:text-sm">
                      Please type in your title!
                    </div>
                  </>
                ) : !isContentValid ? (
                  <>
                    <FaExclamationTriangle
                      className="text-gray-700"
                      size={35}
                    />
                    <div className="text-center font-semibold text-xs sm:text-sm">
                      Please type in your content!
                    </div>
                  </>
                ) : null}
              </div>
            </DialogCustom>
          ) : null}

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
                  Review Submitted!
                </div>
              </div>
            </DialogCustom>
          )}
        </div>
      </div>
    </DialogCustom>
  ) : null;
};

export default AddProductDialog;
