import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { FilterSliceInterface, SortOption } from "./types";

const initialState: FilterSliceInterface = {
  category: 0,
  sortItem: { id: 0, title: "price (low)", property: "price", orderBy: "asc" },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterSliceInterface>) => {
      const { category, sortItem } = action.payload;

      category && (state.category = action.payload.category);
      state.sortItem = sortItem;
    },

    setCategoryId: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },

    setSortItem: (state, action: PayloadAction<SortOption>) => {
      state.sortItem = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortItem, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
