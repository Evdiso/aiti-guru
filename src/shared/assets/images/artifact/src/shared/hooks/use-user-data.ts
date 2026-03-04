import { contextProvider, userContext } from "../config/bootstrap.ts";

export const useUserData = () => {
  return contextProvider.get(userContext);
};
