import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { cartProductCount, cartTotalPriceCount } from "./actions";
import { CartProductType, CartSliceInterface } from "./types";

const initialState: CartSliceInterface = {
  products: [],
  productsCount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // This multiple function!
    // Add product to cart
    //&
    // Increment the count of the added product
    addProduct: (state, action: PayloadAction<CartProductType>) => {
      // Find product in my products state list
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

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

      // Recalculate the price in the cart
      cartTotalPriceCount(state);

      // Recalculate total product caunt in the cats
      cartProductCount(state);
    },

    decrementItemQuantity: (state, action: PayloadAction<number>) => {
      // Find product in my products state list
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload
      );

      if (findProduct) {
        findProduct.count--;

        // Recalculate the price in the cart
        cartTotalPriceCount(state);

        // Recalculate total product caunt in the cats
        cartProductCount(state);
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(
        (obj) => obj.id !== action.payload
      );

      // Recalculate the price in the cart
      cartTotalPriceCount(state);

      // Recalculate total product caunt in the cats
      cartProductCount(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.productsCount = 0;
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, decrementItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
