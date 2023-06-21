import { RootState } from "../store";

export const selectFilterCategory = (state: RootState) =>
  state.filters.category;

export const selectFilterSortItem = (state: RootState) =>
  state.filters.sortItem;
