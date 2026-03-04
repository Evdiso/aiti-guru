import styles from "./styles.module.css";
import { Button } from "../../../../shared/components/button";
import { CirclePlus, LucideRefreshCcw } from "lucide-react";
import { ListTable } from "../list-table";

import { useFilterStore, useProductListStore } from "../../data/store.ts";
import { Modal } from "../../../../shared/components";
import { useState } from "react";
import { CreateProductForm } from "../create-form";

interface ProductListProps {
  update?: () => void;
  isFetching?: boolean;
}

export const ProductList = (props: ProductListProps) => {
  const [open, setOpen] = useState(false);

  const setFilter = useFilterStore((state) => state.setFilter);
  const setProduct = useProductListStore((state) => state.setProduct);
  const list = useProductListStore((state) => state.list);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Все позиции</h2>
        <div className={styles.actions}>
          <Button
            size={"m"}
            view={"secondary"}
            disabled={props.isFetching}
            onClick={props.update}
          >
            <LucideRefreshCcw color={"var(--primary-text)"} />
          </Button>
          <Button
            view={"primary"}
            size={"m"}
            disabled={props.isFetching}
            onClick={() => setOpen(true)}
          >
            <div className={styles.add}>
              <CirclePlus color={"white"} style={{ marginRight: "16px" }} />
              Добавить
            </div>
          </Button>
        </div>
      </div>

      <ListTable
        data={list ?? []}
        isFetching={props.isFetching}
        onSort={setFilter}
      />

      <Modal
        open={open}
        onOpenChange={(details) => {
          setOpen(details.open);
        }}
      >
        <CreateProductForm
          onClose={() => setOpen(false)}
          onSave={(product) => {
            setProduct(product);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};
