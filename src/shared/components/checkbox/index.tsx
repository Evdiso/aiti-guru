import * as checkbox from "@zag-js/checkbox";
import { useMachine, normalizeProps } from "@zag-js/react";
import { useId } from "react";
import type { CheckboxProps } from "./types.ts";

import styles from "./styles.module.css";

export const Checkbox = (props: CheckboxProps) => {
  const id = useId();
  const service = useMachine(checkbox.machine, {
    id,
    onCheckedChange: (details) => {
      props?.onChange?.(details.checked);
    },
    checked: props.checked,
  });

  const api = checkbox.connect(service, normalizeProps);

  const checkboxCls = [
    styles.checkbox,
    props.checked === "indeterminate" ? styles.indeterminate : undefined,
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
