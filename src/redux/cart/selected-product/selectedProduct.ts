import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productData: null,
  isShowDialog: false,
  isShowSuccess: false,
};

const selectedProductSlice = createSlice({
  name: 'selectedProduct',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.productData = action.payload;
    },
    toggleDialog: (state) => {
      state.isShowDialog = !state.isShowDialog;
    },
    toggleSuccess: (state) => {
      state.isShowSuccess = !state.isShowSuccess;
    },
    unselectProduct: (state) => {
      state.productData = null;
    },
  },
});

export const { selectProduct, toggleDialog, unselectProduct, toggleSuccess } =
  selectedProductSlice.actions;

export default selectedProductSlice.reducer;
