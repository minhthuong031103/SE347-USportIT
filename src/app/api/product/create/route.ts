/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadthingApi } from '@/lib/uploadthingServer';
import { Anaheim } from 'next/font/google';

export async function POST(req: Request) {
  const formData = await req.formData();

  console.log('🚀 ~ file: route.ts:6 ~ POST ~ formData:', formData);
  const files = formData.getAll('files');
  console.log('🚀 ~ file: route.ts:8 ~ POST ~ files:', files);

  const upload = await uploadthingApi.uploadFiles(files);
  await uploadthingApi.deleteFiles([
    '95f7c1e3-7eef-4940-bf73-6adef86beaed-vpfo60.jpg',
    '6257f199-9c1f-4c03-83e9-41f50a94456e-73anx4.jpg',
  ]);

  return new Response(
    JSON.stringify({
      formData,
    }),
    { status: 200 }
  );
  //   uploadthingApi.uploadFiles();
}
