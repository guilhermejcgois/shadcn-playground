import { ensureReport } from "../_utils";

export async function GET(
  _: Request,
  { params }: { params: { clientId: string } }
) {
  const rep = ensureReport(params.clientId);
  return Response.json(rep.liquidity, {
    headers: { "Cache-Control": "no-store" },
  });
}
