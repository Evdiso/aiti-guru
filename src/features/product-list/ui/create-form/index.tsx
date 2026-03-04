import { useCustomForm } from "../../../../shared/hooks/use-custom-form.ts";

import { Button } from "../../../../shared/components/button";
import styles from "./styles.module.css";
import { lengthTextCheck } from "../../../../shared/validators/text.ts";
import { maxNumberCheck } from "../../../../shared/validators/max.ts";
import type { ProductStruct } from "../../../../shared/api/product/types.ts";

interface CreateProductFormProps {
  onClose?: () => void;
  onSave?: (product: Partial<ProductStruct>) => void;
}

export const CreateProductForm = (props: CreateProductFormProps) => {
  const { useAppForm } = useCustomForm();

  const form = useAppForm({
    defaultValues: {
      thumbnail: "",
      title: "",
      category: "",
      brand: "",
      sku: "",
      rating: 0,
      price: 0,
    },
    validators: {
      onSubmit: ({ value }) => {
        return {
          fields: {
            title: lengthTextCheck({ min: 1 })(value.title),
            category: lengthTextCheck({ min: 1 })(value.category),
            brand: lengthTextCheck({ min: 1 })(value.brand),
            sku: lengthTextCheck({ min: 1 })(value.sku),
            rating: maxNumberCheck({ max: 5, required: true })(value.rating),
            price: maxNumberCheck({ required: true })(value.price),
          },
        };
      },
    },
    onSubmit: ({ value }) => {
      props.onSave?.({ ...value, id: Date.now() });
    },
  });

  const handleClose = () => {
    form.reset();
    props.onClose?.();
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Добавление товара</h3>
      <div className={styles.form}>
        <form.AppForm>
          <form.AppField
            name={"title"}
            children={(field) => (
              <field.FieldInput
                label={"Наименование"}
                placeholder={"Введите наименование"}
              />
            )}
          />

          <form.AppField
            name={"category"}
            children={(field) => (
              <field.FieldInput
                label={"Категория"}
                placeholder={"Введите категорию"}
              />
            )}
          />

          <form.AppField
            name={"brand"}
            children={(field) => (
              <field.FieldInput
                label={"Вендор"}
                placeholder={"Введите вендора"}
              />
            )}
          />

          <form.AppField
            name={"sku"}
            children={(field) => (
              <field.FieldInput
                label={"Артикул"}
                placeholder={"Введите артикул"}
              />
            )}
          />

          <form.AppField
            name={"rating"}
            children={(field) => (
              <field.FieldInput
                label={"Оценка"}
                type={"number"}
                max={5}
                placeholder={"Введите оценку"}
              />
            )}
          />

          <form.AppField
            name={"price"}
            children={(field) => (
              <field.FieldInput
                label={"Цена, ₽"}
                type={"number"}
                placeholder={"Введите цену"}
              />
            )}
          />
        </form.AppForm>
      </div>
      <div className={styles.actions}>
        <Button view={"secondary"} onClick={handleClose}>
          Отменить
        </Button>
        <Button view={"primary"} onClick={form.handleSubmit}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
