import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/fiterSlice';
import loading from './slices/loadingSlice';

export const store = configureStore({
   reducer: {
      filters,
      loading,
   },
});
