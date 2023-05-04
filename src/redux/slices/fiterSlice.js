import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   category: 0,
   sortItem: { id: 0, title: 'price (low)', property: 'price', orderBy: 'asc' },
};

export const filterSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCategoryId: (state, action) => {
         state.category = action.payload;
      },
      setSortItem: (state, action) => {
         state.sortItem = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortItem } = filterSlice.actions;

export default filterSlice.reducer;
