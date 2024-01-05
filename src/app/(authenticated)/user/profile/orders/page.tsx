'use client';

import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Zoom } from '@/components/ui/zoom-image';
import { getRequest } from '@/lib/fetch';
import { currencyFormat } from '@/lib/utils';
import { Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { OrderDetail } from './OrderDetail';

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const session = useSession();
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', session?.data?.user?.id],
    queryFn: async () => {
      const res = await getRequest({
        endPoint: '/api/order/user?userId=' + session?.data?.user?.id,
      });
      return res;
    },
    refetchInterval: 1000,
    keepPreviousData: true,
  });
  console.log('🚀 ~ file: page.tsx:21 ~ page ~ orders:', orders);
  useEffect(() => {
    if (!isLoading) {
      setTotalPages(orders?.totalPage);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleOpenOrderDetail = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col px-10 gap-y-5 py-10">
      {orders?.data?.map((item) => {
        console.log(JSON.parse(item?.orderItems?.[0]?.product?.thumbnail)?.url);
        return (
          <div className="flex flex-row gap-x-10 ">
            <Zoom>
              <img
                width={200}
                height={200}
                src={JSON.parse(item?.orderItems?.[0]?.product?.thumbnail)?.url}
              />
            </Zoom>
            <div className="flex flex-col gap-y-3">
              <div>Mã đơn hàng: {item?.id}</div>
              <div>Tổng tiền: {currencyFormat(item?.total)}</div>
              <div>
                Trạng thái :{' '}
                {item?.status == 'Pending' ? 'Đang xử lý' : item?.status}
              </div>

              <OrderDetail data={item} />
            </div>
          </div>
        );
      })}

      <Pagination
        showControls
        total={orders?.totalPages}
        initialPage={1}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        page={currentPage}
      />
    </div>
  );
};

export default page;
