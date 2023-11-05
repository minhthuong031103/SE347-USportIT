/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadthingApi } from '@/lib/uploadthingServer';

export async function POST(req: Request) {
  const formData = await req.formData();
  const images = formData.getAll('images');

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
  const ret = { uploadImages };
  if (uploadImages) {
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
}
