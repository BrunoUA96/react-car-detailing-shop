import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   products: [],
   productsCount: 0,
   totalPrice: 0,
};

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      // This multiple function!
      // Add product to cart
      //&
      // Increment the count of the added product
      addProduct: (state, action) => {
         // Find product in my products state list
         const findProduct = state.products.find((obj) => obj.id === action.payload.id);

         // If product exist in products state list
         // im only add count
         if (findProduct) {
            findProduct.count++;
         } else {
            // If product doesn't exist, add new product
            state.products.push({
               ...action.payload,
               count: 1,
            });
         }

         // Calculate price of cart
         state.totalPrice = state.products.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
         }, 0);

         // Calculate total product caunt in the cats
         state.productsCount = state.products.reduce((sum, product) => sum + product.count, 0);
      },

      decrementItemQuantity: (state, action) => {
         // Find product in my products state list
         const findProduct = state.products.find((obj) => obj.id === action.payload);

         if (findProduct) {
            findProduct.count--;

            state.totalPrice = state.products.reduce((sum, obj) => {
               return obj.price * obj.count + sum;
            }, 0);
         }
      },

      removeProduct: (state, action) => {
         state.products = state.products.filter((obj) => obj.id !== action.payload);

         // Calculate total product caunt in the cats
         state.productsCount = state.products.reduce((sum, product) => sum + product.count, 0);

         // Calculate price of cart
         state.totalPrice = state.products.reduce((sum, obj) => {
            return obj.price * obj.count + sum;
         }, 0);
      },

      clearCart: (state) => {
         state.products = [];
         state.productsCount = 0;
         state.totalPrice = 0;
      },
   },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, decrementItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
