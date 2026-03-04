import { mutationOptions } from "@tanstack/react-query";

import { login } from "../../../shared/api/auth/auth.ts";
import { toast } from "../../../shared/config/bootstrap.ts";

export const authQueryOptions = mutationOptions({
  mutationKey: ["login"],
  mutationFn: (data: { username: string; password: string }) => login(data),
  onError: () => {
    toast.store.create({
      type: "error",
      description: "Ошибка авторизации",
      duration: 3000,
    });
  },
});
