'use client';
import Loader from '@/components/Loader';
import ReviewDetail from '@/components/ReviewDetail';
import React from 'react';

const ProductReview = () => {
  const data1 = {
    title: "C'est magnifique",
    date: '23 Sept 2023',
    rating: 4,
    name: 'Minh Quan',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        leo dapibus, gravida enim eu, molestie ex. Vestibulum sit amet ante
        vitae ante venenatis hendrerit. Mauris malesuada sem nec lectus sodales
        tristique. Sed scelerisque neque non erat imperdiet posuere. Donec at
        massa vitae mauris luctus venenatis. Integer blandit ut velit sed
        imperdiet. Morbi a lectus nulla. Nam scelerisque nisl eget lorem
        porttitor finibus. Donec ullamcorper gravida placerat. Phasellus
        scelerisque pellentesque eros, et consequat nunc posuere in. Phasellus
        ultricies aliquam ligula non tincidunt. Maecenas a ultrices metus. Ut
        laoreet eget quam non mattis. Vivamus eget enim vel ex vehicula
        porttitor.`,
    images: `[{"id":"67681289-978a-4143-98b3-cdf35d466e1f-32485d.jpg",
    "name":"67681289-978a-4143-98b3-cdf35d466e1f-32485d.jpg",
    "url":"https://utfs.io/f/67681289-978a-4143-98b3-cdf35d466e1f-32485d.jpg"},
    {"id":"302c260a-505a-4825-9b45-25f25a5ab8c9-g8i8yi.webp",
    "name":"302c260a-505a-4825-9b45-25f25a5ab8c9-g8i8yi.webp",
    "url":"https://utfs.io/f/302c260a-505a-4825-9b45-25f25a5ab8c9-g8i8yi.webp"},
    {"id":"71442468-d595-43a0-9a4e-5d53d9adb825-8yyjou.webp",
    "name":"71442468-d595-43a0-9a4e-5d53d9adb825-8yyjou.webp",
    "url":"https://utfs.io/f/71442468-d595-43a0-9a4e-5d53d9adb825-8yyjou.webp"},
    {"id":"25003f27-187b-4e68-8c05-8adf9e78421f-o83sjm.webp",
    "name":"25003f27-187b-4e68-8c05-8adf9e78421f-o83sjm.webp",
    "url":"https://utfs.io/f/25003f27-187b-4e68-8c05-8adf9e78421f-o83sjm.webp"},
    {"id":"7b4ef7c3-9809-43f0-928a-92cd19101e8c-glurac.webp",
    "name":"7b4ef7c3-9809-43f0-928a-92cd19101e8c-glurac.webp",
    "url":"https://utfs.io/f/7b4ef7c3-9809-43f0-928a-92cd19101e8c-glurac.webp"}]`,
  };
  const data2 = data1;
  const data3 = data1;
  const data = [data1, data2, data3];
  return (
    <div className="space-y-2 pb-16">
      {data ? (
        data?.map((item, index) => (
          <div className="h-full w-full" key={index}>
            <ReviewDetail data={item} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductReview;
