import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/fiterSlice';

export const store = configureStore({
   reducer: {
      filters,
   },
});
