import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/fitersSlice';
import loading from './slices/loadingSlice';
import cart from './slices/cartSlise';
import product from './slices/productSlice';

export const store = configureStore({
   reducer: {
      filters,
      loading,
      cart,
      product,
   },
});
