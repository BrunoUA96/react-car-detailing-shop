import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentPage: 1,
   // Number of pages count
   paginationCount: 1,
};

export const paginationSlice = createSlice({
   name: 'pagination',
   initialState,
   reducers: {
      setCurrentPage: (state, action) => {
         state.currentPage = action.payload;
      },

      setPaginationCount: (state, action) => {
         state.paginationCount = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPaginationCount } = paginationSlice.actions;

export default paginationSlice.reducer;
