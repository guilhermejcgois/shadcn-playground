import { useQuery } from "@tanstack/react-query";
import {
  getSummary,
  getPerformance,
  getExposure,
  getAllocation,
  getInstitutions,
  getPositions,
  getLiquidity,
  getMovements,
  getAllReport,
} from "./api";

const stale = 30_000;

export const useReportSummary = (id: string) =>
  useQuery({
    queryKey: ["summary", id],
    queryFn: () => getSummary(id),
    staleTime: stale,
  });
export const useReportPerformance = (id: string) =>
  useQuery({
    queryKey: ["performance", id],
    queryFn: () => getPerformance(id),
    staleTime: stale,
  });
export const useReportExposure = (id: string) =>
  useQuery({
    queryKey: ["exposure", id],
    queryFn: () => getExposure(id),
    staleTime: stale,
  });
export const useReportAllocation = (id: string) =>
  useQuery({
    queryKey: ["allocation", id],
    queryFn: () => getAllocation(id),
    staleTime: stale,
  });
export const useReportInstitutions = (id: string) =>
  useQuery({
    queryKey: ["institutions", id],
    queryFn: () => getInstitutions(id),
    staleTime: stale,
  });
export const useReportPositions = (id: string) =>
  useQuery({
    queryKey: ["positions", id],
    queryFn: () => getPositions(id),
    staleTime: stale,
  });
export const useReportLiquidity = (id: string) =>
  useQuery({
    queryKey: ["liquidity", id],
    queryFn: () => getLiquidity(id),
    staleTime: stale,
  });
export const useReportMovements = (id: string) =>
  useQuery({
    queryKey: ["movements", id],
    queryFn: () => getMovements(id),
    staleTime: stale,
  });
export const useReportAll = (id: string) =>
  useQuery({
    queryKey: ["report-all", id],
    queryFn: () => getAllReport(id),
    staleTime: stale,
  });
