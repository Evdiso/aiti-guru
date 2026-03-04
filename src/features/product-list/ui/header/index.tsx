import styles from "./styles.module.css";
import { useCustomForm } from "../../../../shared/hooks/use-custom-form.ts";
import { Search } from "lucide-react";
import { useFilterStore } from "../../data/store.ts";

interface ProductListHeaderProps {
  isFetching?: boolean;
}

export const ProductListHeader = (props: ProductListHeaderProps) => {
  const { useAppForm } = useCustomForm();
  const setFilter = useFilterStore((state) => state.setFilter);
  const filter = useFilterStore((state) => state.filter);

  const form = useAppForm({
    defaultValues: {
      search: filter.search ?? "",
    },
    listeners: {
      onChange: (props) => {
        setFilter({ search: props.fieldApi.state.value });
      },
      onChangeDebounceMs: 500,
    },
  });

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Товары</h1>
      <div className={styles.search}>
        <form.AppForm>
          <form.AppField
            name={"search"}
            children={(field) => (
              <field.FieldInput
                placeholder={"Найти"}
                view={"secondary"}
                disabled={props.isFetching}
                size={"m"}
                iconLeft={
                  <Search size={24} color={"var(--secondary-text-light)"} />
                }
              />
            )}
          />
        </form.AppForm>
      </div>
      <h1 className={styles.title} style={{ visibility: "hidden" }}>
        Товары
      </h1>
    </div>
  );
};
