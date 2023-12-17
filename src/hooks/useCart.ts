'use client';

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
// import { User } from '@/models';
import { getRequest } from '@/lib/fetch';
//dispatch, selector
import {
  addToCart,
  increaseItemFromCart,
  decreaseItemFromCart,
  deleteItemFromCart,
} from '@/redux/cart/cart';
import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useCart = () => {
  // Lay session cua user
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const reduxCart = useSelector((state: any) => state.cart) || null;

  const fetchUserCart = async (userId) => {
    const userShoppingCart = await getRequest({
      endPoint: `/api/user/cart/cart-item?userId=${userId}`,
    });
    return userShoppingCart;
  };

  const {
    data: userCart,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['useCart'],
    queryFn: () => fetchUserCart(session?.user.id),
    enabled: !!session,
  });

  const convertToReduxCart = (prismaCart) => {
    const listItem = prismaCart.cartItems.map((item) => ({
      data: item.product,
      quantity: item.quantity,
      selectedSize: item.selectedSize, // Cần cung cấp thông tin này từ Prisma nếu có
    }));

    const total = listItem.reduce(
      (sum, item) => sum + item.data.price * item.quantity,
      0
    );

    return {
      error: null,
      loading: false,
      total,
      listItem,
    };
  };

  const cart = session
    ? isLoading
      ? null
      : userCart
      ? convertToReduxCart(userCart)
      : null
    : reduxCart;

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   queryClient.removeQueries(['cartQuery']);
  // }, [session]);

  const addToCartMutationFn = async ({ data, selectedSize, quantity }) => {
    const response = await axios.post(
      `/api/user/cart/cart-item?userId=${session?.user.id}`,
      {
        ...data,
        selectedSize: selectedSize,
        quantity: quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error('Failed to add to cart');
    }

    /// Trường hợp out of stock
    if (response.status === 201) {
      toast.error(response.data.message);
    }

    return response.data;
  };
  const addToCartMutation = useMutation({
    mutationKey: ['onAddToCart'],
    mutationFn: addToCartMutationFn,
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data, error) => {
      if (error) {
        console.error('Mutation failed with error:', error);
      } else {
        queryClient.refetchQueries(['useCart']);
        queryClient.removeQueries(['cartQuery']);
      }
    },
  });
  const onAddToCart = ({ data, selectedSize, quantity }) => {
    if (session) {
      try {
        addToCartMutation.mutate({ data, selectedSize, quantity });
        console.log('So luong them', quantity);
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(addToCart({ data, selectedSize, quantity }));
    }
  };

  const updateCartMutationFn = async ({ data, selectedSize, quantity }) => {
    console.log(
      '🚀 ~ file: useCart.ts:126 ~ updateCartMutationFn ~ data:',
      data,
      selectedSize,
      quantity
    );

    const response = await axios.put(
      `/api/user/cart/cart-item?userId=${session?.user.id}`,
      {
        ...data,
        selectedSize: selectedSize,
        quantity: quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to update cart');
    }

    /// Trường hợp out of stock
    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response.data;
  };
  const updateCartMutation = useMutation(updateCartMutationFn, {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data, error) => {
      if (error) {
        console.error('Mutation failed with error:', error);
      } else {
        queryClient.refetchQueries(['useCart']);
      }
    },
  });
  const onUpdateCart = ({ data, selectedSize, quantity }) => {
    if (session) {
      updateCartMutation.mutate({ data, selectedSize, quantity });
      console.log('So luong them', quantity);
    } else {
      console.log('So luong them', quantity);
    }
  };

  const onIncreaseItemFromCart = useCallback(async ({ data, selectedSize }) => {
    if (session) {
      try {
        // const user = session?.user as User;
        addToCartMutation.mutate({ data, selectedSize, quantity: 1 });
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(increaseItemFromCart({ data, selectedSize }));
    }
  }, []);

  const onDecreaseItemFromCart = useCallback(async ({ data, selectedSize }) => {
    if (session) {
      try {
        addToCartMutation.mutate({ data, selectedSize, quantity: -1 });
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(decreaseItemFromCart({ data, selectedSize }));
    }
  }, []);

  const deleteItemFromCartMutation = useMutation<
    any,
    Error,
    { data: any; selectedSize: any; quantity: any }
  >(
    async ({ data, selectedSize, quantity }) => {
      const response = await axios.delete(
        `/api/user/cart/cart-item?userId=${session?.user.id}`,
        {
          data: {
            ...data,
            selectedSize: selectedSize,
            quantity: quantity,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Failed to delete item from cart');
      }

      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const onDeleteItemFromCart = ({
    data,
    selectedSize,
    quantity,
  }: {
    data: any;
    selectedSize: any;
    quantity: any;
  }) => {
    if (session) {
      deleteItemFromCartMutation.mutate(
        { data, selectedSize, quantity },
        {
          onSuccess: () => {
            queryClient.refetchQueries(['useCart']);
            queryClient.removeQueries(['cartQuery']);
          },
          onError: (error) => {
            queryClient.refetchQueries(['useCart']);
            queryClient.removeQueries(['cartQuery']);
            console.log(error, 'Error delete item from cart mutation');
          },
        }
      );
      console.log('Da xoa', data);
    } else {
      dispatch(deleteItemFromCart({ data, selectedSize, quantity }));
    }
  };

  // const onGetUserWishList = async (userId) => {
  //   const userWishList = await getRequest({
  //     endPoint: `/api/user/wishlist?userId=${userId}`,
  //   });
  //   if (userWishList) {
  //     console.log('userWishList', userWishList.products);
  //   }
  //   return userWishList;
  // };

  return {
    onAddToCart,
    onIncreaseItemFromCart,
    onDecreaseItemFromCart,
    onDeleteItemFromCart,
    cart,
    refetch,
    onUpdateCart,
    isAddingToCart: addToCartMutation.isLoading,
    successAdded: addToCartMutation.isSuccess,
  };
};

//trong hook se return functions va state global
