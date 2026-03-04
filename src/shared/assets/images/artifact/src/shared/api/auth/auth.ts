import type { LoginResponse } from "./types.ts";

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<LoginResponse> => {
  return fetch("api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
    credentials: "include",
  }).then((res) => res.json());
};

export const getAuthUser = ({
  token,
}: {
  token: string;
}): Promise<LoginResponse | { message: string }> => {
  return fetch("api/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }).then((res) => res.json());
};
