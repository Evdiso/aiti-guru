import * as toast from "@zag-js/toast";
import type { CreateToasterStoreProps } from "./toast.types";

export const createToast = ({
  placement = "top",
  duration = 3000,
}: CreateToasterStoreProps) => {
  const toaster = toast.createStore({
    overlap: true,
    gap: 8,
    placement,
    duration,
  });

  return {
    store: toaster,
  };
};
