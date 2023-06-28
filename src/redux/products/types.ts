export type ProductType = {
  id: number;
  title: string;
  price: number;
  imageProguct: string;
  quantity: string;
  size: string;
};

export type PaginationType = {
  currentPage: number;
  paginationCount: number;
  itemsPerPage: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

// export type StatusType = Status;

export interface ProductSliceInterface {
  products: ProductType[];
  status: Status;
  pagination: PaginationType;
}

export type AxiosRespounse = {
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
