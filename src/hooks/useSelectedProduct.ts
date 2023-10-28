import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectProduct,
  toggleDialog,
} from '@/redux/cart/selected-product/selectedProduct';

export const useSelectedProduct = () => {
  const dispatch = useDispatch();
  const selectedProduct =
    useSelector((state: any) => state.selectedProduct.product) || null;
  const isShowDialog =
    useSelector((state: any) => state.selectedProduct.isShowDialog) || null;

  const onSelectProduct = useCallback((data) => {
    dispatch(selectProduct(data));
  }, []);

  const onToggleDialog = useCallback(() => {
    dispatch(toggleDialog());
  }, []);

  return {
    onSelectProduct,
    onToggleDialog,
    selectedProduct,
    isShowDialog,
  };
};
