import type { UseBoundStore } from "zustand/react";
import type { StoreApi } from "zustand/vanilla";
import { useShallow } from "zustand/react/shallow";

export const useAppStore = <T, R>(
  zustandStore: UseBoundStore<StoreApi<T>>,
  cb: (state: T) => R,
) => {
  return zustandStore(useShallow(cb));
};
