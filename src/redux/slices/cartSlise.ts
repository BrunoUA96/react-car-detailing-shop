import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  quantity: string;
  size: string;
  count: number;
};

interface CartSliceInterface {
  products: ProductType[];
  productsCount: number;
  totalPrice: number;
}

const initialState: CartSliceInterface = {
  products: [],
  productsCount: 0,
  totalPrice: 0,
};

// Recalculate the price in the cart
const cartTotalPriceCount = (state: CartSliceInterface) => {
  state.totalPrice = state.products.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

// Calculate total product caunt in the cats
const cartProductCount = (state: CartSliceInterface) => {
  state.productsCount = state.products.reduce(
    (sum, product) => sum + product.count,
    0
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // This multiple function!
    // Add product to cart
    //&
    // Increment the count of the added product
    addProduct: (state, action: PayloadAction<ProductType>) => {
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

export const selectCart = (state: RootState) => state.cart;

export const selectProductById = (id: number) => (state: RootState) =>
  state.cart.products.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, decrementItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
