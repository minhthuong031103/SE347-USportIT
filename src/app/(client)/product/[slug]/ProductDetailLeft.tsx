'use client';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { BiArrowBack } from 'react-icons/bi';

const data = [
  {
    id: '1',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bab314ed-4a92-4b35-98de-279d66949a94/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '2',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9360a584-a807-43b4-992a-97f9c50a4dee/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '3',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e957e429-cbe2-45a4-8033-971804fc7070/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '4',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a2de643a-2c47-4049-be79-d12ee858e9f2/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '1',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bab314ed-4a92-4b35-98de-279d66949a94/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '2',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9360a584-a807-43b4-992a-97f9c50a4dee/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '3',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e957e429-cbe2-45a4-8033-971804fc7070/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
  {
    id: '4',
    url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a2de643a-2c47-4049-be79-d12ee858e9f2/air-jordan-1-mid-se-craft-mens-shoes-p0kWbP.png',
  },
];

function ProductDetailLeft() {
  return (
    <div
      className=" text-white text-[20px] w-full max-w-[1360px] sticky top-[50px] 
     
      "
    >
      <Carousel
        renderArrowNext={(onClickHandler, hasNext, label) => (
          <div
            onClick={onClickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px]
                h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer
                hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
        renderArrowPrev={(onClickHandler, hasNext, label) => (
          <div
            onClick={onClickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px]
                h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer
                hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {data.map((item) => (
          <div key={item.id}>
            <img src={item.url} alt="product" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ProductDetailLeft;
