import client from "./client";
import type { PassengerPost } from "../types";

export const getPassengerPosts = (params?: { from?: string; to?: string }) =>
  client.get<{ data: PassengerPost[] }>("/passenger-posts", { params }).then((r) => r.data.data);

export const createPassengerPost = (body: Partial<PassengerPost>) =>
  client.post<{ data: PassengerPost }>("/passenger-posts", body).then((r) => r.data.data);

export const deletePassengerPost = (id: string) => client.delete(`/passenger-posts/${id}`);
