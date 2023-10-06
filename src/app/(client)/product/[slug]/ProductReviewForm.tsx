'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@components/ui/dialog';
import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import Image from 'next/image';
import { parseJSON } from '@/lib/utils';
import { FaStar } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { Label } from '@/components/ui/label';
import { Zoom } from '@/components/ui/zoom-image';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { type FileWithPath } from 'react-dropzone';
import { FileDialog } from '@/app/(authenticated)/admin/add-product/FileDialog';
import { getSession } from 'next-auth/react';
import { useReview } from '@/hooks/useReview';

type FileWithPreview = FileWithPath & {
  preview: string;
};
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const ProductReviewForm = ({ product }) => {
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);
  const { isUploading, startUpload } = useUploadThing('imageUploader');
  const { onPostProductReview } = useReview();
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  const onGetSession = async () => {
    const session = await getSession();
    const userId = parseInt(session?.user?.id);
    return userId;
  };

  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    const userId = await onGetSession();
    const images = await startUpload([...files]).then((res) => {
      const formattedImages = res?.map((image) => ({
        id: image.key,
        name: image.key.split('_')[1] ?? image.key,
        url: image.url,
      }));
      return formattedImages ?? null;
    });

    const ret = await onPostProductReview(
      JSON.stringify({
        ...data,
        rating: parseInt(data.rating),
        image: [...images],
        userId: userId,
        productId: product.id,
        reviewDate: new Date(),
      })
    );

    console.log(ret);
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-center">
        <Dialog>
          <DialogTrigger>
            <Button
              className="z-70 border-transparent hover:scale-105 hover:transition hover:duration-200 font-semibold text-white"
              onClick={() => setIsVisible(!isVisible)}
            >
              Write a Review
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col lg:w-[60%] w-[80%] h-[95%]">
            <div className="w-full h-fit flex flex-col pt-2 items-center">
              <span className="text-[12px] sm:text-sm md:text-base font-semibold">
                Write a Review
              </span>
              <span className="text-[10px] sm:text-sm text-gray-500">
                Share your thoughts with the community.
              </span>
              <div className="w-full h-fit mt-2 flex flex-row gap-3 items-center">
                <Image
                  src={parseJSON(product?.images)[0].url}
                  alt={product.name}
                  width={60}
                  height={50}
                  className="rounded-md object-cover object-center"
                />
                <span className="text-[10px] sm:text-sm text-gray-700">
                  {product.name}
                </span>
              </div>
            </div>

            <div className="flex w-full h-fit mt-3 flex-col gap-1 sm:gap-3">
              <Label className="font-semibold text-[10px] sm:text-[14px]">
                Overall Rating
              </Label>
              <div className="flex gap-2 justify-start">
                {[1, 2, 3, 4, 5].map((star, index) => {
                  const currentRating = index + 1;
                  return (
                    <label
                      className="flex items-center justify-center"
                      key={currentRating}
                    >
                      <Controller
                        name="rating"
                        control={control}
                        defaultValue={''}
                        render={({ field }) => (
                          <>
                            <FaStar
                              style={{ cursor: 'pointer' }}
                              size={24}
                              color={
                                currentRating <= (hover || rating)
                                  ? '#ffc107'
                                  : '#e4e5e9'
                              }
                              onMouseEnter={() => setHover(currentRating)}
                              onMouseLeave={() => setHover(rating)}
                            />
                            <input
                              type="radio"
                              name="rating"
                              className="invisible"
                              value={currentRating}
                              onChange={(e) => {
                                field.onChange(e);
                                setRating(currentRating); // Set the rating when the radio button is clicked
                              }}
                            />
                          </>
                        )}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-1 sm:gap-3">
              <Label className="font-semibold text-[10px] sm:text-[14px]">
                Title
              </Label>
              <Controller
                control={control}
                defaultValue={''}
                name="title"
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

            <div className="flex flex-col w-full h-[40%] gap-1 sm:gap-2">
              <Label className="font-semibold text-[10px] sm:text-[14px]">
                Content
              </Label>
              <Controller
                defaultValue={''}
                name="text"
                control={control}
                render={({ field }) => {
                  return (
                    <Textarea
                      className="h-full"
                      minRows={20}
                      size="sm"
                      type="textarea"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>

            <div className="flex flex-col gap-1 sm:gap-3">
              <Label className="font-semibold text-[10px] sm:text-[14px]">
                Image
              </Label>
              {files?.length ? (
                <div className="flex items-center gap-2">
                  {files.map((file, i) => (
                    <Zoom key={i}>
                      <Image
                        src={file.preview}
                        alt={file.name}
                        className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                        width={80}
                        height={80}
                      />
                    </Zoom>
                  ))}
                </div>
              ) : null}
              <Controller
                defaultValue={''}
                name={'image'}
                control={control}
                render={({ field }) => {
                  return (
                    <FileDialog
                      setValue={field.onChange}
                      name="images"
                      maxFiles={8}
                      maxSize={1024 * 1024 * 4}
                      files={files}
                      setFiles={setFiles}
                      isUploading={isUploading}
                      disabled={false}
                    />
                  );
                }}
              />
            </div>
            <Button
              className="border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold text-white rounded-md"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductReviewForm;
