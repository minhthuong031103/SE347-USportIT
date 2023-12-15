/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from '@/lib/prisma';
import { uploadthingApi } from '@/lib/uploadthingServer';
import { Prisma } from '@prisma/client';

export async function POST(req: Request) {
  const formData = await req.formData();
  console.log('🚀 ~ file: route.ts:19 ~ POST ~ formData:', formData);

  //Get thumbnail and images
  const thumbnail = formData.getAll('thumbnail');
  const images = formData.getAll('images');

  //Upload thumbnail to uploadthing
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

  //Upload images to uploadthing
  const uploadImages = await uploadthingApi.uploadFiles(images).then((res) => {
    console.log('🚀 ~ file: route.ts:27 ~ .then ~ res:', res);
    const formattedImages = res?.map((image) => ({
      id: image.data.key,
      name: image.data.name,
      url: image.data.url,
    }));
    return JSON.stringify(formattedImages) ?? '';
  });

  //Create product
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
      isdeleted: false,
    },
  });
  //If product created successfully
  if (postProduct) {
    //Started upload sizes
    //Get sizes from formData (FormDataEntryValue type)
    const productId = postProduct.id;
    // Get the string from formData
    const sizesString = formData.getAll('sizes'); // Get the string from formData

    const sizes = [];
    sizesString.forEach((size) => {
      sizes.push(JSON.parse(size.toString()));
    });
    console.log(
      '🚀 ~ file: route.ts:72 ~ sizesString.forEach ~ sizesString:',
      sizes
    );

    const uploadSizes = await prisma.productSize.createMany({
      data: sizes?.map((size) => ({
        ...size,
        productId: productId,
      })),
    });

    const ret = { postProduct, uploadSizes };

    if (uploadSizes) {
      return new Response(
        JSON.stringify({
          data: ret,
          status: 200,
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          status: 400,
        })
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        status: 400,
      })
    );
  }
}

//   await uploadthingApi.deleteFiles([
//     '95f7c1e3-7eef-4940-bf73-6adef86beaed-vpfo60.jpg',
//     '6257f199-9c1f-4c03-83e9-41f50a94456e-73anx4.jpg',
//   ]);

//   uploadthingApi.uploadFiles();
