import { useMachine, normalizeProps } from "@zag-js/react";
import * as toast from "@zag-js/toast";
import type { FC } from "react";
import { ToastInstance } from "./toast-instance";
import type { ToasterProps } from "./toast.types";
import "./toaster.css";

export const Toaster: FC<ToasterProps> = ({ toasterStore, ...props }) => {
  const service = useMachine(toast.group.machine, {
    store: toasterStore,
  });
  const api = toast.group.connect(service, normalizeProps);

  return (
    <div {...api.getGroupProps()}>
      {api.getToasts().map((toast, index) => (
        <ToastInstance
          key={toast.id}
          actor={toast}
          index={index}
          parent={service}
          toasterStore={toasterStore}
          {...props}
        />
      ))}
    </div>
  );
};
