import styles from "./styles.module.css";
import type { InputProps } from "./types";
import { useFieldContext } from "../../../config/bootstrap";
import { useId } from "react";

export const FieldInput = ({
  size = "l",
  view = "primary",
  iconLeft,
  ...props
}: InputProps) => {
  const id = useId();
  const field = useFieldContext<string | number | undefined>();
  const isInvalid = !field.state.meta.isValid;

  const cls = [
    isInvalid ? styles.fieldInvalid : undefined,
    styles.input,
    iconLeft ? styles.withIconLeft : undefined,
  ]
    .join(" ")
    .trim();

  return (
    <div>
      {props.label && (
        <label className={styles.label} htmlFor={id}>
          {props.label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {iconLeft && (
          <span
            className={[
              styles.iconLeft,
              size === "m" && styles.iconLeftSize,
            ].join(" ")}
          >
            {iconLeft}
          </span>
        )}
        <input
          id={id}
          className={cls}
          datasize={size}
          dataview={view}
          value={field.state.value}
          {...props}
          onChange={(e) => field.handleChange(e.target.value)}
        />
      </div>

      {isInvalid && (
        <span className={styles.error}>
          {(field.state.meta?.errors?.[0] as string) ?? ""}
        </span>
      )}
    </div>
  );
};
