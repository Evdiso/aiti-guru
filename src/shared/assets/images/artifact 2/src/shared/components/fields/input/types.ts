import type { JSX, InputHTMLAttributes } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  name?: string;
  clearable?: boolean;
  view?: "primary" | "secondary";
  size?: "m" | "l";
  iconLeft?: JSX.Element;
  datasize?: string;
  dataview?: string;
}
