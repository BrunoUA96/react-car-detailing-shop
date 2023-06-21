export type CartProductType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  quantity: string;
  size: string;
  count: number;
};

export interface CartSliceInterface {
  products: CartProductType[];
  productsCount: number;
  totalPrice: number;
}
