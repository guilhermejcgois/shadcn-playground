import { NextRequest } from "next/server";
import { searchClients } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? undefined;
  const data = searchClients(q).map((c) => ({
    id: c.id,
    name: c.name,
    doc: c.doc,
  }));
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
