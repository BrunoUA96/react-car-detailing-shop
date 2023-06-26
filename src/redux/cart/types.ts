export type ItemCardType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  size: string;
  count: number;
};

export type CartProductType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  size: {
    value: string;
    sizeCount: number;
  }[];
  count: number;
};

export interface CartSliceInterface {
  products: CartProductType[];
  productsCount: number;
  totalPrice: number;
}
