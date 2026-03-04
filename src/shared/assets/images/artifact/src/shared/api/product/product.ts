import type { ProductListParams, ProductListResponse } from "./types.ts";

export const getProductList = (
  params: ProductListParams,
  signal: AbortSignal,
): Promise<ProductListResponse> => {
  const { search, ...restParams } = params;
  const queryParams = new URLSearchParams(restParams as Record<string, string>);

  const link = `api/products?${queryParams.toString()}`;
  const linkWithSearch = `api/products/search?q=${search}&${queryParams.toString()}`;

  return fetch(search ? linkWithSearch : link, {
    signal,
  }).then((res) => res.json());
};
