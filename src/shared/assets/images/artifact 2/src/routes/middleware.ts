import { type MiddlewareFunction, redirect } from "react-router";
import Cookies from "js-cookie";
import { getAuthUser } from "../shared/api/auth/auth.ts";
import { AppRouteNames, routes } from "./index.tsx";
import { contextProvider, userContext } from "../shared/config/bootstrap.ts";
import type { LoginResponse } from "../shared/api/auth/types.ts";

function clearAuthData() {
  sessionStorage.clear();
  Cookies.remove("app_accessToken");
}

function getAuthDataFromStorage() {
  return {
    sessionToken: sessionStorage.getItem("app_accessToken"),
    cookieToken: Cookies.get("app_accessToken"),
  };
}

async function authMiddleware() {
  try {
    const { sessionToken, cookieToken } = getAuthDataFromStorage();

    const response = await getAuthUser({
      token: sessionToken ?? cookieToken ?? "",
    });

    if (response && Object.hasOwn(response, "message")) {
      clearAuthData();
      throw redirect(routes[AppRouteNames.auth]);
    } else {
      contextProvider.set(userContext, response as LoginResponse);
    }
  } catch (e: unknown) {
    throw redirect(routes[AppRouteNames.auth]);
  }
}

function checkAuth() {
  const token = Cookies.get("app_accessToken");

  if (token) {
    throw redirect(routes[AppRouteNames.list]);
  }
}

export const middleware: MiddlewareFunction[] = [authMiddleware];
export const loginMiddleware: MiddlewareFunction[] = [checkAuth];
