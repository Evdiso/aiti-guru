import React from "react";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ProductListParams,
  ProductStruct,
} from "../../../../shared/api/product/types";

import styles from "./styles.module.css";
import defaultImg from "../../../../shared/assets/images/default.jpg";
import { Checkbox, Progress } from "../../../../shared/components";
import { CircleEllipsis, Plus } from "lucide-react";
import { Button } from "../../../../shared/components/button";

interface ListTableProps {
  data: Partial<ProductStruct>[];
  isFetching?: boolean;
  onSort?: (data: ProductListParams) => void;
}

const orderMap = new Map<string, "asc" | "desc">();

export const ListTable = (props: ListTableProps) => {
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: props.data,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSort = (sortBy: string) => {
    if (props.onSort) {
      const cursorValue = orderMap.get(sortBy);

      if (cursorValue) {
        orderMap.set(sortBy, cursorValue === "asc" ? "desc" : "asc");
      } else {
        orderMap.set(sortBy, "asc");
      }

      props.onSort({
        sortBy: sortBy,
        order: !cursorValue ? "asc" : orderMap.get(sortBy),
      });
    }
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const content = flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                );

                const size = header.getSize();
                const enableSort = header.column.getCanSort();

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
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const selectedRow = row.getIsSelected();
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <td key={cell.id}>
                      <div>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                        {selectedRow && index === 0 && (
                          <span className={styles.selected} />
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.isFetching && (
        <div className={styles.spinnerWrapper}>
          <Progress />
        </div>
      )}
      {!props.data.length && (
        <div className={styles.spinnerWrapper}>Ничего не найдено</div>
      )}
    </div>
  );
};

const columns: ColumnDef<Partial<ProductStruct>>[] = [
  {
    id: "id",
    header: ({ table }) => {
      const all = table.getIsAllRowsSelected();
      const some = table.getIsSomeRowsSelected();

      return (
        <Checkbox
          {...{
            checked: some ? "indeterminate" : all,
            onChange: (value) => {
              table.getToggleAllRowsSelectedHandler()({
                target: { checked: value },
              });
            },
          }}
        />
      );
    },
    maxSize: 0,
    cell: ({ row }) => {
      return (
        <Checkbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      );
    },
  },
  {
    accessorFn: (row) => row.title,
    id: "title",
    header: "Наименование",
    enableSorting: true,
    minSize: 400,
    cell: (info) => {
      const url = info.cell.row.original.thumbnail
        ? new URL(info.cell.row.original.thumbnail)
        : null;

      const img =
        info.cell.row.original.thumbnail && url
          ? `/img${url.pathname}`
          : defaultImg;

      const value = info.getValue();

      return (
        <div className={styles.td}>
          <div className={styles.imageContainer}>
            <img
              src={img}
              width={"48px"}
              height={"48px"}
              alt="thumbnail"
              loading={"lazy"}
            />
          </div>
          <div>
            <div className={styles.title}>{value as string}</div>
            <div className={styles.description}>
              {info.row.original.category}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.brand,
    id: "brand",
    header: "Вендор",
    enableSorting: true,
    minSize: 200,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.sku,
    id: "sku",
    header: "Артикул",
    enableSorting: true,
    minSize: 200,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.rating,
    id: "rating",
    header: "Оценка",
    enableSorting: true,
    minSize: 200,
    cell: (info) => {
      const value = info.getValue();
      const rating = Number(value);

      return (
        <div className={styles.rating}>
          <span className={[rating < 3 && styles.ratingLow].join(" ")}>
            {rating.toFixed(1)}
          </span>
          <span>/5</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.price,
    id: "price",
    header: "Цена, ₽",
    enableSorting: true,
    minSize: 200,
    cell: (info) => {
      const price = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
      })
        .format(info.getValue() as number)
        .split(",");

      return (
        <div className={styles.price}>
          <span>{price[0]}</span>
          <span>{`, ${price[1]}`}</span>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.id,
    id: "actions",
    header: "",
    minSize: 200,
    cell: () => {
      return (
        <div className={styles.actions}>
          <Button type={"button"} size={"s"} variant={"round"}>
            <Plus />
          </Button>
          <Button type={"button"} size={"s"} variant={"round"} view={"ghost"}>
            <CircleEllipsis size={32} color={"var(--secondary-text-light)"} />
          </Button>
        </div>
      );
    },
  },
];
