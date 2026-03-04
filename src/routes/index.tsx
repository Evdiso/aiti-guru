import { createBrowserRouter, Navigate } from "react-router";

import App from "../App";
import { AuthPage } from "../pages/auth";
import { ProductListPage } from "../pages/product-list";
import { loginMiddleware, middleware } from "./middleware.ts";

export enum AppRouteNames {
  root = "root",
  auth = "auth",
  list = "list",
}

export const routes: Record<AppRouteNames, string> = {
  [AppRouteNames.root]: `/`,
  [AppRouteNames.auth]: `/auth`,
  [AppRouteNames.list]: `/list`,
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to={routes[AppRouteNames.list]} replace />,
      },
      {
        path: routes[AppRouteNames.list],
        Component: ProductListPage,
        middleware,
      },
      {
        path: routes[AppRouteNames.auth],
        middleware: loginMiddleware,
        Component: AuthPage,
      },
    ],
  },
]);
