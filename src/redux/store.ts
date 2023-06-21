import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
// defaults to localStorage for web
import storage from "redux-persist/lib/storage";

import cart from "./slices/cartSlise";
import filters from "./slices/fitersSlice";
import loading from "./slices/loadingSlice";
import product, { fetchProducts } from "./slices/productSlice";
import search from "./slices/searchSlice";

const rootReducer = combineReducers({
  filters,
  loading,
  cart,
  product,
  search,
});

const persistConfig = {
  key: "react-shop-cart",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

// const lastReturnedAction = await store.dispatch(fetchProducts(params));
// const lastReturnedAction = useAppDispatch(fetchProducts(params));
