import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import cart from "./slices/cartSlise";
import filters from "./slices/fitersSlice";
import loading from "./slices/loadingSlice";
import product, { fetchProducts } from "./slices/productSlice";
import search from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    filters,
    loading,
    cart,
    product,
    search,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// const lastReturnedAction = await store.dispatch(fetchProducts(params));
// const lastReturnedAction = useAppDispatch(fetchProducts(params));
