import client from "./client";
import type { User } from "../types";

export const getMe = () =>
  client.get<{ data: User }>("/users/me").then((r) => r.data.data);

export const updateMe = (body: { phone_number?: string; role?: string }) =>
  client.put<{ data: User }>("/users/me", body).then((r) => r.data.data);
