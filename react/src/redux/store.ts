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

import cart from "./cart/slice";
import filters from "./filters/slice";
import loading from "./loading/slice";
import product from "./products/slice";
import search from "./search/slice";

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
