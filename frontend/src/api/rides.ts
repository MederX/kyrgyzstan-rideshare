import client from "./client";
import type { Ride, RideRequest } from "../types";

export const getRides = (params?: { from?: string; to?: string; date?: string }) =>
  client.get<{ data: Ride[] }>("/rides", { params }).then((r) => r.data.data);

export const getRide = (id: string) =>
  client.get<{ data: Ride }>(`/rides/${id}`).then((r) => r.data.data);

export const createRide = (body: Partial<Ride>) =>
  client.post<{ data: Ride }>("/rides", body).then((r) => r.data.data);

export const updateRide = (id: string, body: Partial<Ride>) =>
  client.put<{ data: Ride }>(`/rides/${id}`, body).then((r) => r.data.data);

export const deleteRide = (id: string) => client.delete(`/rides/${id}`);

export const completeRide = (id: string) => client.patch(`/rides/${id}/complete`);

export const getRideRequests = (rideId: string) =>
  client.get<{ data: RideRequest[] }>(`/rides/${rideId}/requests`).then((r) => r.data.data);

export const createRideRequest = (rideId: string, body: { seats_needed: number; notes?: string }) =>
  client.post<{ data: RideRequest }>(`/rides/${rideId}/requests`, body).then((r) => r.data.data);

export const updateRideRequest = (rideId: string, reqId: string, status: "accepted" | "rejected") =>
  client.patch(`/rides/${rideId}/requests/${reqId}`, { status });
