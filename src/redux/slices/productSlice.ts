import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "../store";

type ProductType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  quantity: string;
  size: string;
};

type PaginationType = {
  currentPage: number;
  paginationCount: number;
  itemsPerPage: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type StatusType = Status;

interface ProductSliceInterface {
  products: ProductType[];
  status: StatusType;
  pagination: PaginationType;
}

type AxiosRespounse = {
  products: ProductType[];
  quantity: number;
};

export type URLParamsType = {
  category?: number;
  _sort: string;
  _order: string;
  _page?: number;
  _limit?: number;
  title_like?: string;
};

export const fetchProducts = createAsyncThunk<AxiosRespounse, URLParamsType>(
  "product/fetchProductsStatus",
  async (params: URLParamsType) => {
    const baseAPI = "http://localhost:3000/products";
    const [products, productQuantity] = await axios.all([
      // First get to items per page
      await axios.get(baseAPI, { params: { ...params } }),
      // Second get return all items with selected caregory, to calculate quantity pagination pages
      await axios.get(baseAPI, {
        params: { category: params.category, title_like: params.title_like },
      }),
    ]);

    return {
      products: products.data,
      quantity: productQuantity.data.length,
    } as AxiosRespounse;
  }
);

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

    setStatus: (state, action: PayloadAction<StatusType>) => {
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

export const selectProducts = (state: RootState) => state.product;

export const selectProductPagination = (state: RootState) =>
  state.product.pagination;

// Action creators are generated for each case reducer function
export const { setProducts, setStatus, setCurrentPage, setItemsPerPage } =
  productSlice.actions;

export default productSlice.reducer;
