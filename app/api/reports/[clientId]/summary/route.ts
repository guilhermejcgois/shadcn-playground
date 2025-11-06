import { ensureReport } from "../_utils";

export async function GET(_: Request, { params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const rep = ensureReport(clientId);
  return Response.json(rep.summary, { headers: { "Cache-Control": "no-store" } });
}
