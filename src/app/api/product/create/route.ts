/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { uploadthingApi } from '@/lib/uploadthingServer';
import { Prisma } from '@prisma/client';

interface ProductUpload {
  description: string;
  price: number;
  thumbnail: string;
  images: string;
  categoryId: number;
  typeId: number;
  subcategoryId: number;
  genderId: number;
  name: string;
}
export async function POST(req: Request) {
  const formData = await req.formData();
  console.log('🚀 ~ file: route.ts:19 ~ POST ~ formData:', formData);

  const thumbnail = formData.getAll('thumbnail');
  const images = formData.getAll('images');
  console.log('🚀 ~ file: route.ts:23 ~ POST ~ images:', images);

  const uploadThumbnail = await uploadthingApi
    .uploadFiles(thumbnail)
    .then((res) => {
      console.log('🚀 ~ file: route.ts:27 ~ .then ~ res:', res);
      const formattedThumbnail = res?.map((image) => ({
        id: image.data.key,
        name: image.data.name,
        url: image.data.url,
      }));
      return JSON.stringify(formattedThumbnail?.[0]) ?? '';
    });
  console.log(
    '🚀 ~ file: route.ts:34 ~ POST ~ uploadThumbnail:',
    uploadThumbnail
  );
  const uploadImages = await uploadthingApi.uploadFiles(images).then((res) => {
    console.log('🚀 ~ file: route.ts:27 ~ .then ~ res:', res);
    const formattedImages = res?.map((image) => ({
      id: image.data.key,
      name: image.data.name,
      url: image.data.url,
    }));
    return JSON.stringify(formattedImages) ?? '';
  });
  console.log(
    '🚀 ~ file: route.ts:43 ~ uploadImages ~ uploadImages:',
    uploadImages
  );

  const postProduct = await prisma.product.create({
    data: {
      name: formData.get('name')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: parseFloat(formData.get('price')?.toString() ?? '0'),
      thumbnail: uploadThumbnail,
      images: uploadImages,
      categoryId: parseInt(formData.get('category')?.toString() ?? '0'),
      typeId: parseInt(formData.get('productType')?.toString() ?? '0'),
      subcategoryId: parseInt(formData.get('subCategory')?.toString() ?? '0'),
      genderId: parseInt(formData.get('gender')?.toString() ?? '0'),
    },
  });
  if (postProduct) {
    return new Response(
      JSON.stringify({
        status: 200,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        status: 500,
      })
    );
  }
  //   await uploadthingApi.deleteFiles([
  //     '95f7c1e3-7eef-4940-bf73-6adef86beaed-vpfo60.jpg',
  //     '6257f199-9c1f-4c03-83e9-41f50a94456e-73anx4.jpg',
  //   ]);

  //   uploadthingApi.uploadFiles();
}
