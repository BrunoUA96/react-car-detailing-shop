import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 0,
   sortItem: { id: 0, title: 'price (low)', property: 'price', orderBy: 'asc' },

   // Pagination
   pagination: {
      currentPage: 1,
      // Number of pages count
      paginationCount: 1,
      // Number of items per page
      itemsPerPage: 12,
   },
};

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setFilters: (state, action) => {
         const { category, _limit, _page, sortObj } = action.payload;

         category ? (state.category = action.payload.category) : '';
         state.pagination.itemsPerPage = _limit;
         state.pagination.currentPage = Number(_page);
         state.sortItem = sortObj;
      },

      setCategoryId: (state, action) => {
         state.category = action.payload;
      },

      setSortItem: (state, action) => {
         state.sortItem = action.payload;
      },

      setCurrentPage: (state, action) => {
         state.pagination.currentPage = action.payload;
      },

      setPaginationCount: (state, action) => {
         state.pagination.paginationCount = action.payload;
      },

      setItemsPerPage: (state, action) => {
         state.pagination.itemsPerPage = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   setCategoryId,
   setSortItem,
   setFilters,
   setCurrentPage,
   setPaginationCount,
   setItemsPerPage,
} = filterSlice.actions;

export default filterSlice.reducer;
