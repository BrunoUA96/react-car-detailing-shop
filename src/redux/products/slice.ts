import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "./asyncActions";
import {
  PaginationType,
  ProductSliceInterface,
  ProductType,
  Status,
} from "./types";

const initialState = {
  products: [],
  status: Status.LOADING, // loading | success | error
  // Pagination
  pagination: {
    currentPage: 1,
    // Number of pages count
    paginationCount: 1,
    // Number of items per page
    itemsPerPage: 12,
  },
} as ProductSliceInterface;

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.products = action.payload;
    },

    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },

    // Pagination
    setCurrentPage: (
      state,
      action: PayloadAction<PaginationType["currentPage"]>
    ) => {
      if (action.payload >= 1) {
        state.pagination.currentPage = action.payload;
      }
    },

    setItemsPerPage: (
      state,
      action: PayloadAction<PaginationType["itemsPerPage"]>
    ) => {
      state.pagination.itemsPerPage = action.payload;
    },
  },

  extraReducers: (builder) => {
    // if request in progress
    builder.addCase(fetchProducts.pending, (state) => {
      state.products = [];
      state.status = Status.LOADING;
      console.log("Redux request (GetProducts) in progress");
    }),
      // if request completed
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.status = Status.SUCCESS;
        console.log("Redux request (GetProducts) completed");

        // Count number of pages
        state.pagination.paginationCount = Math.ceil(
          action.payload.quantity / Number(state.pagination.itemsPerPage)
        );

        // Little protection, if current page more then pagination quantity put fist page
        if (state.pagination.currentPage > state.pagination.paginationCount) {
          state.pagination.currentPage = 1;
        }
      });
    // if request error
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.products = [];
      console.log("Redux request (GetProducts) error");
    });
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setStatus, setCurrentPage, setItemsPerPage } =
  productSlice.actions;

export default productSlice.reducer;
