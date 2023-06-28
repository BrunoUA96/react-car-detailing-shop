import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { AxiosRespounse, URLParamsType } from "./types";

export const fetchProducts = createAsyncThunk<AxiosRespounse, URLParamsType>(
  "product/fetchProductsStatus",
  async (params: URLParamsType) => {
    const baseAPI = "https://api-react-car-detailing-shop.vercel.app/products";
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
