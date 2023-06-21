export type SortOption = {
  id: number;
  title: string;
  property: string;
  orderBy: string;
};

export interface FilterSliceInterface {
  category: number;
  sortItem: SortOption;
}
