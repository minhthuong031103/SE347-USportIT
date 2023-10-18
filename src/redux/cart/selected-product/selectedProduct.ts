import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  isShowDialog: false,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.product = action.payload;
    },
    toggleDialog: (state) => {
      state.isShowDialog = !state.isShowDialog;
    },
  },
});

export const { selectProduct, toggleDialog } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
