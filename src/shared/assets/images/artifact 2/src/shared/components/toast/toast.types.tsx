import type * as toast from "@zag-js/toast";
import type { ReactNode } from "react";
import type { Type } from "@zag-js/toast";

export type Placement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end";

export interface ToasterProps {
  toasterStore: ReturnType<typeof toast.createStore>;
}

export interface ToastInstanceProps extends ToasterProps {
  actor: toast.Options<ReactNode>;
  index: number;
  parent: toast.GroupService;
}

export interface CreateToastProps {
  title?: string | undefined;
  message: string | undefined;
  type?: Type | undefined;
}

export interface CreateToasterStoreProps {
  placement?: Placement;
  duration?: number | undefined;
}
