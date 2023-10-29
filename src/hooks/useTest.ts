import { addToCart } from '@/redux/cart/cartSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useTest = () => {
  const dispatch = useDispatch();

  const onAddtoCart = useCallback(({ data, selectedSize }) => {
    dispatch(addToCart({ data, selectedSize }));
  }, []);

  return { onAddtoCart };
};
