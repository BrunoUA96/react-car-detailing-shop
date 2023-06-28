import { RootState } from "../store";

export const selectProducts = (state: RootState) => state.product;

export const selectProductPagination = (state: RootState) =>
  state.product.pagination;
