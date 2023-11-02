'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { User } from '@/models';
import { getRequest } from '@/lib/fetch';

//dispatch, selector
import {
  addToCart,
  increaseItemFromCart,
  decreaseItemFromCart,
  deleteItemFromCart,
  reset,
} from '@/redux/cart/cart';

export const useCart = () => {
  // Lay session cua user
  const { data: session } = useSession();
  const [cart, setCart] = useState({
    error: null,
    loading: false,
    total: 0,
    listItem: [],
  });
  const reduxCart = useSelector((state: any) => state.cart) || null;

  useEffect(() => {
    if (session) {
      const user = session?.user as User;
      dispatch(reset());
      // Neu co user, thi dispatch action lay cart cua user
      const getUserShoppingCart = async (userId) => {
        const userShoppingCart = await getRequest({
          endPoint: `/api/user/cart/cart-item?userId=${userId}`,
        });
        return userShoppingCart; // Thêm từ khóa return ở đây
      };
      // Chuyen doi cart tu prisma sang cau truc giong redux
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

      (async () => {
        const userShoppingCart = await getUserShoppingCart(user.id);
        // Su dung cau truc giong redux
        const convertedCart = convertToReduxCart(userShoppingCart);
        setCart(convertedCart);
      })();
    } else {
      setCart(reduxCart);
    }
  }, [cart, reduxCart]);

  const dispatch = useDispatch();

  const onAddToCart = useCallback(async ({ data, selectedSize, quantity }) => {
    if (session) {
      try {
        const response = await fetch(
          `/api/user/cart/cart-item?userId=${session?.user.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              selectedSize: selectedSize,
              quantity: quantity,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(addToCart({ data, selectedSize, quantity }));
    }
  }, []);

  const onIncreaseItemFromCart = useCallback(async ({ data, selectedSize }) => {
    if (session) {
      try {
        const user = session?.user as User;

        const response = await fetch(
          `/api/user/cart/cart-item?userId=${user.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              selectedSize: selectedSize,
              quantity: 1,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
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
        const user = session?.user as User;

        const response = await fetch(
          `/api/user/cart/cart-item?userId=${user.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...data,
              selectedSize: selectedSize,
              quantity: -1,
            }),
          }
        );
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(decreaseItemFromCart({ data, selectedSize }));
    }
  }, []);

  const onDeleteItemFromCart = useCallback(
    async ({ data, selectedSize, quantity }) => {
      if (session) {
        try {
          const user = session?.user as User;

          const response = await fetch(
            `/api/user/cart/cart-item?userId=${user.id}`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...data,
                selectedSize: selectedSize,
                quantity: quantity,
              }),
            }
          );
          if (!response.ok) {
            throw new Error('Failed to delete item from cart');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        dispatch(deleteItemFromCart({ data, selectedSize, quantity }));
      }
    },
    []
  );

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
  };
};

//trong hook se return functions va state global
