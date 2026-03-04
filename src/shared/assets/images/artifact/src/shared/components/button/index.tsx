import type { PropsWithChildren, ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: "primary" | "secondary" | "ghost";
  size?: "s" | "m" | "l";
  variant?: "round" | "default";
  dataview?: string;
  datasize?: string;
  datavariant?: string;
}

export const Button = ({
  view = "primary",
  size = "l",
  variant = "default",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      className={styles.button}
      dataview={view}
      datasize={size}
      datavariant={variant}
      {...props}
    >
      {props.children}
    </button>
  );
};
