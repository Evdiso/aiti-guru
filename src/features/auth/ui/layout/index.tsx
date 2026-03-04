import type { PropsWithChildren, FC } from "react";
import styles from "./styles.module.css";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.authLayout}>{children}</div>;
};
