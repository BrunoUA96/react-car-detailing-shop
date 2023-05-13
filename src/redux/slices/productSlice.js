import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProductsStatus', async (params) => {
   const baseAPI = 'http://localhost:3000/products';
   const [products, productsQuantity] = await axios.all([
      // First get to items per page
      await axios.get(baseAPI, { params: { ...params } }),
      // Second get return all items with selected caregory, to calculate quantity pagination pages
      await axios.get(baseAPI, {
         params: { category: params.category, title_like: params.title_like },
      }),
   ]);

   return { products: products.data, quantity: productsQuantity.data.length };
});

const initialState = {
   products: [],
   status: '', // loading | success | error
   // Pagination
   pagination: {
      currentPage: 1,
      // Number of pages count
      paginationCount: 1,
      // Number of items per page
      itemsPerPage: 12,
   },
};

export const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      setProducts: (state, action) => {
         state.products = action.payload;
      },

      setStatus: (state, action) => {
         state.status = action.payload;
      },

      // Pagination
      setCurrentPage: (state, action) => {
         if (action.payload >= 1) {
            state.pagination.currentPage = action.payload;
         }
      },

      setItemsPerPage: (state, action) => {
         state.pagination.itemsPerPage = action.payload;
      },
   },
   extraReducers: (builder) => {
      //   // if request in progress
      builder.addCase(fetchProducts.pending, (state, action) => {
         state.products = [];
         state.status = 'loading';
         console.log('Redux request (GetProducts) in progress');
      }),
         // if request completed
         builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload.products;
            state.status = 'success';
            console.log('Redux request (GetProducts) completed');

            // Count number of pages
            state.pagination.paginationCount = Math.ceil(
               action.payload.quantity / Number(state.pagination.itemsPerPage),
            );

            // Little protection, if current page more then pagination quantity put fist page
            if (state.pagination.currentPage > state.pagination.paginationCount) {
               state.pagination.currentPage = 1;
            }
         });
      //   // if request error
      builder.addCase(fetchProducts.rejected, (state, action) => {
         state.status = 'error';
         state.products = [];
         console.log('Redux request (GetProducts) error');
      });
   },
});

// Action creators are generated for each case reducer function
export const { setProducts, setStatus, setCurrentPage, setItemsPerPage } = productSlice.actions;

export default productSlice.reducer;
