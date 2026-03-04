import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { patchCssModules } from "vite-css-modules";
import PrettyModuleClassnames from "vite-plugin-pretty-module-classnames";

export default defineConfig(({ mode }) => {
  const base = {
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    plugins: [
      patchCssModules(),
      PrettyModuleClassnames(),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
    ],
  };

  if (mode === "development") {
    return {
      ...base,
      server: {
        proxy: {
          "/api": {
            target: "https://dummyjson.com",
            changeOrigin: true,
            secure: false,
            headers: {
              ["Content-type"]: "application/json",
            },
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
          "/img": {
            target: "https://cdn.dummyjson.com",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/img/, ""),
          },
        },
      },
    };
  } else {
    return {
      ...base,
    };
  }
});
