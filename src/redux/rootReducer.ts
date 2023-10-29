import { combineReducers } from 'redux';
import cart from './cart/cart';
import favorite from './favorite/favorite';
import selectedProduct from './cart/selected-product/selectedProduct';

export default combineReducers({ cart, favorite, selectedProduct });
