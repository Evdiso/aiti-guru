import { createFormHookContexts } from "@tanstack/react-form";
import { QueryClient } from "@tanstack/react-query";
import { createToast } from "../components/toast";
import { createContext, RouterContextProvider } from "react-router";
import type { LoginResponse } from "../api/auth/types.ts";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const userContext = createContext<LoginResponse | null>(null);
export const contextProvider = new RouterContextProvider();

export const toast = createToast({});
export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();
