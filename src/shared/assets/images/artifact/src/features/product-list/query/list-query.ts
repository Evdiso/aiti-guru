import { queryOptions } from "@tanstack/react-query";
import { getProductList } from "../../../shared/api/product/product.ts";
import { useFilterStore, useProductListStore } from "../data/store.ts";

export const useListQuery = () => {
  const setCount = useProductListStore((state) => state.setCount);
  const setProducts = useProductListStore((state) => state.setProducts);
  const filter = useFilterStore((state) => state.filter);

  const listQuery = queryOptions({
    queryKey: ["product-list", filter],
    queryFn: ({ signal }) => getProductList({ ...filter }, signal),
    select: (value) => {
      setCount(value.total);
      setProducts(value.products);
      return value;
    },
  });

  return { listQuery };
};
