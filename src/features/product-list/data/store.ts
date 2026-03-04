import type {
  ProductListParams,
  ProductStruct,
} from "../../../shared/api/product/types.ts";

import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { useAppStore } from "../../../shared/hooks/use-app-store.ts";

export interface FilterStore {
  filter: ProductListParams;
  setFilter: (filter: Partial<ProductListParams>) => void;
  resetFilter: () => void;
}

export interface ProductListStore {
  list: Partial<ProductStruct>[];
  setProduct: (product: Partial<ProductStruct>) => void;
  setProducts: (products: Partial<ProductStruct>[]) => void;
  setCount: (count: number) => void;
  count: number;
}

export const initialData = {
  limit: "10",
};

const productListStore = create<ProductListStore>((set) => ({
  list: [],
  count: 0,
  setCount: (count: number) =>
    set(() => {
      return { count };
    }),
  setProduct: (product: Partial<ProductStruct>) =>
    set((state) => {
      const cursor = [...state.list];
      cursor.pop();
      return { list: [product, ...cursor], count: state.count + 1 };
    }),
  setProducts: (products: Partial<ProductStruct>[]) =>
    set(() => {
      return { list: products };
    }),
}));

const filterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filter: initialData,
      setFilter: (filter) =>
        set((state) => {
          return { filter: { ...state.filter, ...filter } };
        }),
      resetFilter: () =>
        set(() => {
          return { filter: initialData };
        }),
    }),
    { name: "filter-storage" },
  ),
);

export const useFilterStore = <R>(cb: (state: FilterStore) => R) => {
  return useAppStore(filterStore, cb);
};

export const useProductListStore = <R>(cb: (state: ProductListStore) => R) => {
  return useAppStore(productListStore, cb);
};
