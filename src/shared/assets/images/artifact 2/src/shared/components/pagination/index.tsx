import * as pagination from "@zag-js/pagination";
import type { ItemProps, PageChangeDetails } from "@zag-js/pagination";
import { normalizeProps, useMachine } from "@zag-js/react";
import type React from "react";
import { useId } from "react";
import styles from "./styles.module.css";
import { Button } from "../button";

import { ChevronLeft } from "lucide-react";

interface PaginationProps {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (details: PageChangeDetails) => void;
  disable?: boolean;
}

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps,
) => {
  const service = useMachine(pagination.machine, {
    type: "button",
    id: useId(),
    siblingCount: 1,
    boundaryCount: 1,
    ...props,
  });

  const api = pagination.connect(service, normalizeProps);

  return (
    <div className={styles.container}>
      {api.totalPages > 1 && (
        <nav {...api.getRootProps()}>
          <ul>
            <button
              className={styles.arrow}
              onClick={api.goToPrevPage}
              disabled={api.page === 1 || props.disable}
              type={"button"}
            >
              <ChevronLeft />
            </button>

            {api.pages
              .map((page, index) => {
                const pageProps = api.getItemProps(page as ItemProps);

                if (page.type === "page") {
                  return (
                    <li key={page.value}>
                      <Button
                        size={"s"}
                        view={page.value !== api.page ? "secondary" : "primary"}
                        disabled={page.value === api.page || props.disable}
                        type={"button"}
                        id={pageProps.id}
                        onClick={pageProps.onClick}
                      >
                        {page.value}
                      </Button>
                    </li>
                  );
                } else {
                  return <div key={`${String(index)}-${page.type}`}>...</div>;
                }
              })
              .filter(Boolean)}
            <button
              className={[styles.arrow, styles.right].join(" ")}
              onClick={api.goToNextPage}
              type={"button"}
              disabled={api.page === api.totalPages || props.disable}
            >
              <ChevronLeft />
            </button>
          </ul>
        </nav>
      )}
    </div>
  );
};
