import { getReport } from "@/lib/mock-data";

export function ensureReport(clientId: string) {
  const rep = getReport(clientId);
  if (!rep) throw new Error("NOT_FOUND");
  return rep;
}
