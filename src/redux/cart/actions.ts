import { CartSliceInterface } from "./types";

// Recalculate the price in the cart
export const cartTotalPriceCount = (state: CartSliceInterface) => {
  return (state.totalPrice = state.products.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0));
};

// Calculate total product caunt in the cats
export const cartProductCount = (state: CartSliceInterface) => {
  return (state.productsCount = state.products.reduce(
    (sum, product) => sum + product.count,
    0
  ));
};
