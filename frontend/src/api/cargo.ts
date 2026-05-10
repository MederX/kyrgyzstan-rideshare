import client from "./client";
import type { CargoRequest } from "../types";

export const getCargo = (params?: { from?: string; to?: string }) =>
  client.get<{ data: CargoRequest[] }>("/cargo", { params }).then((r) => r.data.data);

export const createCargo = (body: Partial<CargoRequest>) =>
  client.post<{ data: CargoRequest }>("/cargo", body).then((r) => r.data.data);

export const deleteCargo = (id: string) => client.delete(`/cargo/${id}`);
