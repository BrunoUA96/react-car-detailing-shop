import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/fiterSlice';
import loading from './slices/loadingSlice';
import pagination from './slices/paginationSlice';

export const store = configureStore({
   reducer: {
      filters,
      loading,
      pagination,
   },
});
