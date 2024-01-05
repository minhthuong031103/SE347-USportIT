/** @format */

/** @format */

// import { useNews } from '@/hooks/useNews';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useForm } from 'react-hook-form';
import { useProduct } from '@/hooks/useProduct';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Loader } from 'lucide-react';
import { Image } from '@nextui-org/react';
import DialogCustom from '@/components/ui/dialogCustom';
import OrderItem from './OrderItem';
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';

export const OrderDetail = ({ data }: { data: any }) => {
  console.log('🚀 ~ file: OrderDetail.tsx:29 ~ data:', data);
  const { onGetProductDetailFromOrder } = useProduct();

  const orderDetailKey = ['orderDetailKey', data.id];

  const fetchOrderDetail = async () => {
    const updatedOrderItems = await Promise.all(
      data.orderItems.map(async (orderDetail) => {
        console.log(
          '🚀 ~ file: EditOrderForm.tsx:33 ~ fetchData ~ orderDetail:',
          orderDetail.productId
        );
        const product = await onGetProductDetailFromOrder(
          orderDetail.productId
        );
        return product;
      })
    );

    // Now `updatedOrderItems` contains the order items with additional product data
    return updatedOrderItems;
  };

  // Fetch review data
  const {
    data: orderDetailData,
    isFetched,
    refetch,
  } = useQuery(orderDetailKey, fetchOrderDetail, {
    staleTime: 1000 * 60 * 1,
    keepPreviousData: true,
  });

  console.log(
    '🚀 ~ file: EditOrderForm.tsx:54 ~ EditOrderForm ~ orderDetailData:',
    orderDetailData
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Chi tiết</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="w-full flex flex-col border-3 p-1 rounded-md">
          <div className="flex flex-row justify-center items-center text-lg font-bold">
            THÔNG TIN ĐƠN HÀNG
          </div>

          <div className="w-full h-fit flex flex-col justify-start">
            <div className="w-full h-fit flex flex-row justify-between border-t-1 border-b-1 p-4">
              <span className="font-bold ">ID: {data.id}</span>
              <span className="font-bold">
                Thời gian đặt: {new Date(data.orderDate).toLocaleString()}
              </span>
            </div>
            <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
              <span className="font-bold">THÔNG TIN KHÁCH HÀNG</span>

              {data.userId ? (
                <div className="w-full h-fit flex flex-row font-bold gap-3 items-center">
                  <Image src={data.user.avatar} width={100} height={100} />
                  <div className="w-full h-fit flex flex-col font-bold">
                    <span>ID khách hàng: {data.user.id}</span>
                    <span>Tên khách hàng: {data.user.name}</span>
                    <span>Email khách hàng: {data.user.email}</span>
                    <span className="max-w-[70ch]">
                      Địa chỉ giao hàng: {data.address}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-fit flex flex-row font-bold gap-3 items-center">
                  <Image
                    src={'../../../../person.png'}
                    width={64}
                    height={64}
                  />
                  <div className="w-full h-fit flex flex-col">
                    <span className="font-bold">Khách vãng lai</span>
                    <span className="font-bold">
                      Địa chỉ giao hàng: {data.address}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-fit flex flex-col border-b-1 p-4 gap-3">
            <span className="font-bold">CHI TIẾT ĐƠN HÀNG</span>
            {orderDetailData ? (
              <Swiper
                style={
                  {
                    '--swiper-pagination-bullet-inactive-color': '#999999',
                    '--swiper-pagination-color': '#000000',
                    '--swiper-pagination-bullet-size': '12px',
                    '--swiper-pagination-bullet-inactive-opacity': '0.2',
                    '--swiper-pagination-bullet-opacity': '1',
                    '--swiper-pagination-bullet-vertical-gap': '0px',
                    '--swiper-pagination-bullet-horizontal-gap': '6px',
                  } as React.CSSProperties
                }
                direction="horizontal"
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                breakpoints={{
                  450: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  700: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  900: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                className="w-full h-auto overflow-visible relative flex items-center justify-center"
              >
                {data.orderItems.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-fit">
                      <OrderItem
                        order={item}
                        product={orderDetailData.find(
                          (detail) => detail.id === item.productId
                        )}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loader />
            )}
          </div>
          <div className="w-full h-fit flex flex-row justify-between font-bold text-lg">
            <div className="w-fit h-fit flex flex-row gap-3 font-bold">
              <span>Trạng thái:</span>
              {data.status === 'Pending' ? (
                <span className="text-yellow-300">Đang giải quyết</span>
              ) : data.status === 'Shipping' ? (
                <span className="text-green-300">Đang giao hàng</span>
              ) : data.status === 'Completed' ? (
                <span className="text-green-500">Hoàn thành</span>
              ) : null}
            </div>

            <div className="w-fit h-fit flex flex-row gap-3 font-bold">
              <span>Tổng tiền:</span>
              <span className="text-green-400">
                {data.total?.toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
