/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  total: 0,
  listItem: [],
};

const cartSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    actionRequest: (state) => {
      return {
        ...state,
        error: null,
        loading: true,
      };
    },
    getDataSuccess: (state, { payload }: { payload: any }) => {
      return {
        ...state,
        error: null,
        loading: false,
        ...payload,
      };
    },
    addToCart: (state, { payload }: { payload: any }) => {
      const product = state.listItem.find(
        (item) => item.data.id === payload.id
      );
      if (!product) {
        state.listItem.push({ data: payload, quantity: 1 });
        state.total += payload.price;
      } else {
        product.quantity += 1;
        state.total += payload.price;
      }
    },
    deleteItemFromCart: (state, { payload }: { payload: any }) => {
      const productIndex = state.listItem.findIndex(
        (product) => product.data.id === payload.id
      );
      if (state.listItem[productIndex].quantity === 1) {
        state.listItem.splice(productIndex, 1);
      } else {
        state.listItem[productIndex].quantity -= 1;
      }
      state.total -= payload.price;
    },
    reset: () => initialState,
  },
});

export const {
  actionRequest,
  getDataSuccess,
  reset,
  addToCart,
  deleteItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
