import * as passwordInput from "@zag-js/password-input";
import { useMachine, normalizeProps } from "@zag-js/react";
import { EyeIcon, EyeOffIcon, LucideLock } from "lucide-react";
import { useId } from "react";
import styleInput from "../input/styles.module.css";
import styles from "./styles.module.css";
import type { PasswordInputProps } from "./types.ts";
import { useFieldContext } from "../../../config/bootstrap.ts";

export const FieldPassword = (props: PasswordInputProps) => {
  const id = useId();
  const field = useFieldContext();
  const isInvalid = !field.state.meta.isValid;
  const service = useMachine(passwordInput.machine, { id });

  const api = passwordInput.connect(service, normalizeProps);

  const labelCls = [styleInput.label, styles.label].join(" ").trim();
  const inputCls = [
    isInvalid ? styleInput.fieldInvalid : undefined,
    styleInput.input,
  ]
    .join(" ")
    .trim();

  return (
    <div {...api.getRootProps()}>
      {props.label && (
        <label className={labelCls} htmlFor={id} {...api.getLabelProps()}>
          {props.label}
        </label>
      )}
      <div className={styles.inputWrapper} {...api.getControlProps()}>
        <span className={styles.user}>
          <LucideLock size={24} color={"var(--secondary-text-light)"} />
        </span>
        <input
          className={inputCls}
          id={id}
          {...api.getInputProps()}
          {...props}
          onChange={(e) => field.handleChange(e.target.value)}
        />
        <button className={styles.button} {...api.getVisibilityTriggerProps()}>
          <span {...api.getIndicatorProps()}>
            {api.visible ? (
              <EyeIcon size={24} color={"var(--secondary-text-light)"} />
            ) : (
              <EyeOffIcon size={24} color={"var(--secondary-text-light)"} />
            )}
          </span>
        </button>
      </div>
      {isInvalid && (
        <span className={styleInput.error}>
          {(field.state.meta?.errors?.[0] as string) ?? ""}
        </span>
      )}
    </div>
  );
};
