import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export const selectProductById = (id: number) => (state: RootState) =>
  state.cart.products.find((obj) => obj.id === id);
