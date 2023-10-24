export async function POST(req: Request) {
  const formData = await req.formData();
  console.log('🚀 ~ file: route.ts:19 ~ POST ~ formData:', formData);

  const thumbnail = formData.getAll('thumbnail');
  console.log('🚀 ~ file: route.ts:22 ~ POST ~ thumbnail:', thumbnail);
  const images = formData.getAll('images');
  console.log('🚀 ~ file: route.ts:23 ~ POST ~ images:', images);
}
