import {
  ProductList,
  ProductListFooter,
  ProductListHeader,
} from "../../features/product-list";
import { useListQuery } from "../../features/product-list/query/list-query.ts";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../../features/product-list/data/store.ts";

export const ProductListPage = () => {
  const resetFilter = useFilterStore((state) => state.resetFilter);
  const { listQuery } = useListQuery();
  const { isFetching, refetch } = useQuery(listQuery);

  return (
    <>
      <ProductListHeader isFetching={isFetching} />
      <ProductList
        isFetching={isFetching}
        update={() => {
          resetFilter();
          refetch();
        }}
      />
      <ProductListFooter isFetching={isFetching} />
    </>
  );
};
