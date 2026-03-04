export interface CheckboxProps {
  label?: string;
  name?: string;
  onChange?: (value: boolean | "indeterminate") => void;
  checked?: boolean | "indeterminate" | undefined;
}
