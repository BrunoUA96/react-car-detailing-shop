import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type SortOption = {
  id: number;
  title: string;
  property: string;
  orderBy: string;
};

interface FilterSliceInterface {
  category: number;
  sortItem: SortOption;
}

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

export const selectFilterCategory = (state: RootState) =>
  state.filters.category;

export const selectFilterSortItem = (state: RootState) =>
  state.filters.sortItem;

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortItem, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
