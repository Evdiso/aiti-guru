import { flexRender, type Header } from "@tanstack/react-table";
import type {
  ProductListParams,
  ProductStruct,
} from "../../../../../shared/api/product/types.ts";
import { useRef } from "react";
import styles from "../styles.module.css";

interface HeaderColumnItem {
  header: Header<ProductStruct, unknown>;
  onSort?: (data: ProductListParams) => void;
}

export const HeaderColumnItem = ({ header, onSort }: HeaderColumnItem) => {
  const content = flexRender(
    header.column.columnDef.header,
    header.getContext(),
  );
  const order = useRef<"asc" | "desc">(undefined);
  const size = header.getSize();
  const enableSort = header.column.getCanSort();

  const toggleOrder = () => {
    if (!order.current) {
      order.current = "asc";
    } else {
      order.current = order.current === "asc" ? "desc" : "asc";
    }
  };

  const handleSort = (sortBy: string) => {
    if (onSort) {
      toggleOrder();
      onSort({ sortBy: sortBy, order: order.current });
    }
  };

  return (
    <th key={header.id} colSpan={header.colSpan}>
      <div style={{ minWidth: `${size}px` }}>
        {enableSort ? (
          <button
            className={styles.columnBtn}
            type={"button"}
            onClick={(e) => {
              e.stopPropagation();
              handleSort(header.column.id);
            }}
          >
            {content}
          </button>
        ) : (
          content
        )}
      </div>
    </th>
  );
};
