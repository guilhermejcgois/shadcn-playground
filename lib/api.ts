import type { Allocation, Exposure, Institutions, Liquidity, Movements, Position, Summary } from "./mock-data";

type Json<T> = Promise<T>;

export async function api<T>(path: string, init?: RequestInit): Json<T> {
  const r = await fetch(path, { cache: "no-store", ...init });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}

// Clients
export const searchClients = (q?: string) =>
  api<{ id: string; name: string; doc: string }[]>(
    `/api/clients${q ? `?q=${encodeURIComponent(q)}` : ""}`
  );

// Report sections
export const getSummary = (id: string) => api<Summary>(`/api/reports/${id}/summary`);
export const getPerformance = (id: string) =>
  api<Performance>(`/api/reports/${id}/performance`);
export const getExposure = (id: string) => api<Exposure>(`/api/reports/${id}/exposure`);
export const getAllocation = (id: string) =>
  api<Allocation>(`/api/reports/${id}/allocation`);
export const getInstitutions = (id: string) =>
  api<Institutions>(`/api/reports/${id}/institutions`);
export const getPositions = (id: string) => api<Position>(`/api/reports/${id}/positions`);
export const getLiquidity = (id: string) => api<Liquidity>(`/api/reports/${id}/liquidity`);
export const getMovements = (id: string) => api<Movements>(`/api/reports/${id}/movements`);
export const getAllReport = (id: string) => api(`/api/reports/${id}/all`);
