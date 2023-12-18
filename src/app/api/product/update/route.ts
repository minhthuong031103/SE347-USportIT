import prisma from '@/lib/prisma';
import { uploadthingApi } from '@/lib/uploadthingServer';

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('productId');
  if (!id) return new Response(JSON.stringify({}), { status: 400 });
  const formData = await req.formData();
  console.log('🚀 ~ file: route.ts:19 ~ POST ~ formData:', formData);

  const thumbnail = formData.getAll('thumbnail');
  //If thumbnail is new
  //Upload images to uploadthing
  const uploadThumbnail = async () => {
    if (thumbnail?.[0].lastModified > 0) {
      const res = await uploadthingApi.uploadFiles(thumbnail);
      const formattedThumbnail = res?.map((image) => ({
        id: image.data.key,
        name: image.data.name,
        url: image.data.url,
      }));
      console.log(
        '🚀 ~ file: route.ts:22 ~ formattedThumbnail ~ formattedThumbnail:',
        formattedThumbnail
      );
      return JSON.stringify(formattedThumbnail?.[0]) || ''; // Use || instead of ??
    } else {
      return thumbnail?.[0].toString() || '';
    }
  };

  const newThumbnail = await uploadThumbnail();

  const images = formData.getAll('images');
  //Upload images that are new
  //(images that are already uploaded are not uploaded again)
  const newImages = images.filter((image) =>
    image.lastModified > 0 ? image : null
  );

  //Upload images to uploadthing
  const uploadImages = await uploadthingApi
    .uploadFiles(newImages)
    .then((res) => {
      const formattedImages = res?.map((image) => ({
        id: image.data.key,
        name: image.data.name,
        url: image.data.url,
      }));

      return JSON.stringify(formattedImages) ?? '';
    });

  //Add new images to old images
  //Get old images
  const temp = images.filter((image) =>
    image.lastModified > 0 ? null : image
  );
  const oldImages = [];
  temp.forEach((image) => {
    oldImages.push(JSON.parse(image.toString()));
  });
  //Combine old images and new images
  const allImages = await [...oldImages, ...JSON.parse(uploadImages)];

  //Update product
  const updateProduct = await prisma.product.update({
    where: {
      id: parseInt(id ?? '0'),
    },
    data: {
      name: formData.get('name')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? '',
      price: parseFloat(formData.get('price')?.toString() ?? '0'),
      thumbnail: newThumbnail,
      images: JSON.stringify(allImages),
      categoryId: parseInt(formData.get('category')?.toString() ?? '0'),
      typeId: parseInt(formData.get('productType')?.toString() ?? '0'),
      subcategoryId: parseInt(formData.get('subCategory')?.toString() ?? '0'),
      genderId: parseInt(formData.get('gender')?.toString() ?? '0'),
    },
  });
  if (updateProduct) {
    //Started upload sizes
    //Get sizes from formData (FormDataEntryValue type)
    // Get the string from formData
    const sizesString = formData.getAll('sizes'); // Get the string from formData

    const sizes = [];
    sizesString.forEach((size) => {
      sizes.push(JSON.parse(size.toString()));
    });

    const sizeToUpdate = sizes.filter((size) => size.id);
    const sizeToCreate = sizes.filter((size) => !size.id);

    const productSizeUpdates = sizeToUpdate.map((size) => {
      return prisma.productSize.updateMany({
        where: {
          id: size.id, // Specify the unique identifier for the size you want to update
        },
        data: {
          quantity: size.quantity, // Replace with the actual column names and values you want to update
        },
      });
    });

    const productSizeCreate = await prisma.productSize.createMany({
      data: sizeToCreate?.map((size) => ({
        ...size,
        productId: parseInt(id),
      })),
    });

    try {
      const updatedSizes = await Promise.all([
        ...productSizeUpdates,
        productSizeCreate,
      ]);

      const ret = { updateProduct, updatedSizes };

      if (updatedSizes) {
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
    } catch (error) {
      console.error('Error occurred while updating sizes:', error);
    }
  } else {
    return new Response(
      JSON.stringify({
        status: 400,
      })
    );
  }
}
