import * as checkbox from "@zag-js/checkbox";
import { useMachine, normalizeProps } from "@zag-js/react";
import { useId } from "react";
import type { CheckboxProps } from "./types.ts";
import { useFieldContext } from "../../../config/bootstrap.ts";

import styles from "./styles.module.css";

export const FieldCheckbox = (props: CheckboxProps) => {
  const id = useId();
  const field = useFieldContext();
  const isInvalid = !field.state.meta.isValid;
  const service = useMachine(checkbox.machine, {
    id,
    onCheckedChange: (details) => {
      field.handleChange(details.checked);
    },
  });

  const api = checkbox.connect(service, normalizeProps);

  const checkboxCls = [
    isInvalid ? "field-invalid" : undefined,
    styles.checkbox,
    api.checked ? styles.active : undefined,
  ]
    .join(" ")
    .trim();

  return (
    <label className={styles.wrapper} htmlFor={id} {...api.getRootProps()}>
      <div {...api.getControlProps()} />
      <input id={id} {...api.getHiddenInputProps()} />

      <span className={styles.wrapperCheckbox}>
        <span className={checkboxCls}></span>
      </span>

      {props.label && (
        <span {...api.getLabelProps()} className={styles.label}>
          {props.label}
        </span>
      )}
    </label>
  );
};
