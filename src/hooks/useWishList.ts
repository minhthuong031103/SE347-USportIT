import { getRequest } from '@/lib/fetch';
import { Wishlist } from '@/models';
import { Product } from '@prisma/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export const useWishList = () => {
  // Lay session cua user
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const fetchUserWishList = async (userId) => {
    const userWishList = await getRequest({
      endPoint: `/api/user/wishlist?userId=${userId}`,
    });
    return userWishList;
  };

  // Chỉ hoạt động với khách hàng có đăng nhập
  const { data: userWishList } = useQuery({
    queryKey: ['useWishList'],
    queryFn: () => fetchUserWishList(session?.user.id),
    enabled: !!session,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const onAddUserWishList = async (product: Product) => {
    try {
      const userId = session?.user?.id;

      // Cập nhật dữ liệu cho query 'useWishList' trước khi gọi API
      queryClient.setQueryData(['useWishList'], (oldData: Array<Product>) => {
        return [...oldData, product];
      });
      toast.success(`Đã thêm ${product.name} vào danh sách yêu thích`);

      const response = axios.post(
        `/api/user/wishlist/add?userId=${userId}&productId=${product.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 });
    }
  };

  const onRemoveUserWishList = async (product: Product) => {
    try {
      // Cập nhật dữ liệu cho query 'useWishList'
      queryClient.setQueryData(['useWishList'], (oldData: Array<Wishlist>) => {
        return oldData.filter((p) => p.id !== product.id);
      });
      toast.success(`Đã loại bỏ ${product.name} khỏi danh sách yêu thích`);

      const userId = session?.user?.id;

      const response = await axios.post(
        `/api/user/wishlist/remove?userId=${userId}&productId=${product.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 400 });
    }
  };

  return { wishList: userWishList, onAddUserWishList, onRemoveUserWishList };
};
