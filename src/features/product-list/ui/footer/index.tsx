import { Pagination } from "../../../../shared/components/pagination";
import { useFilterStore, useProductListStore } from "../../data/store.ts";
import { useState } from "react";
import type { PageChangeDetails } from "@zag-js/pagination";
import styles from "./styles.module.css";

interface ProductListFooterProps {
  isFetching?: boolean;
}

export const ProductListFooter = (props: ProductListFooterProps) => {
  const [cursorPage, setCursorPage] = useState(1);
  const count = useProductListStore((state) => state.count);
  const filter = useFilterStore((state) => state.filter);
  const setFilter = useFilterStore((state) => state.setFilter);

  const onPageChange = ({ page }: PageChangeDetails) => {
    const skipStep = page - 1;
    setCursorPage(page);
    setFilter({
      skip: String(Number(filter.limit) * skipStep),
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.info}>Показано</span>
        {` 1-${filter.limit} `}
        <span className={styles.info}>из</span>
        {` ${count}`}
      </div>
      <Pagination
        count={count}
        page={cursorPage}
        pageSize={Number(filter.limit)}
        onPageChange={onPageChange}
        disable={props.isFetching}
      />
    </div>
  );
};
