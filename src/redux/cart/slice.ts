import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { cartProductCount, cartTotalPriceCount } from "./actions";
import { CartSliceInterface, ItemCardType } from "./types";

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
    addProduct: (state, action: PayloadAction<ItemCardType>) => {
      // Find product in my products state list
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        const { size } = findProduct;

        // Look if comming size from action ready exist
        const checkSize = size.find(
          (sizeObj) => sizeObj.value == action.payload.size
        );

        // If exist, add count
        if (checkSize) {
          checkSize.sizeCount++;
        } else {
          // else add size to Product
          findProduct.size.push({
            value: action.payload.size,
            sizeCount: 1,
          });
        }

        // If product exist in products state list
        // im only add count
        findProduct.count++;
      } else {
        // If product doesn't exist, add new product
        const { size } = action.payload;

        // From action come only name of size
        // I need add size count to control stock of quantities added
        const sizeProp = [{ value: size, sizeCount: 1 }];

        // Push new product to the state list
        state.products.push({
          ...action.payload,
          size: sizeProp,
          count: 1,
        });
      }

      // Recalculate the price in the cart
      cartTotalPriceCount(state);

      // Recalculate total product caunt in the cart
      cartProductCount(state);
    },

    decrementItemQuantity: (state, action: PayloadAction<ItemCardType>) => {
      // Find product in my products state list
      const findProduct = state.products.find(
        (obj) => obj.id === action.payload.id
      );

      if (findProduct) {
        const { size } = findProduct;

        // Look if comming size from action ready exist
        const checkSize = size.find(
          (sizeObj) => sizeObj.value == action.payload.size
        );

        // Decrement count of sizes
        if (checkSize) {
          checkSize.sizeCount--;
        }

        // Decrement product count
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
