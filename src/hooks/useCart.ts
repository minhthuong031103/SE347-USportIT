'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '@/redux/cart/cart';
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart) || null;
  const onAddToCart = useCallback(({ data, selectedSize }) => {
    dispatch(addToCart({ data, selectedSize }));
  }, []);

  return {
    onAddToCart,
    cart,
  };
};
