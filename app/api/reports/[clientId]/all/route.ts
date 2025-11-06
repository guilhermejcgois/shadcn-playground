import { ensureReport } from "../_utils";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ clientId: string }> }
) {
  const {clientId} = await params;

  return Response.json(ensureReport(clientId), {
    headers: { "Cache-Control": "no-store" },
  });
}
