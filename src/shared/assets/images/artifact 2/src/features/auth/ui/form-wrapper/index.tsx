import type { PropsWithChildren, FC } from "react";
import styles from "./styles.module.css";

export const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formWrapperContent}>{children}</div>
    </div>
  );
};
