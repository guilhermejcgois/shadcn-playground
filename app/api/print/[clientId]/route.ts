import { NextRequest } from "next/server";

export async function POST(
  _req: NextRequest, 
  context: { params: Promise<{ clientId: string }> }
) {
  const { clientId } = await context.params;
  const urlToPrint = `${process.env.PUBLIC_BASE_URL}/print/${clientId}`;

  const form = new FormData();
  form.set("url", urlToPrint);
  form.set("paperWidth", "8.27");   // A4
  form.set("paperHeight", "11.69"); // A4
  form.set("marginTop", "16mm");
  form.set("marginBottom", "16mm");
  form.set("marginLeft", "14mm");
  form.set("marginRight", "14mm");
  form.set("scale", "1");
  form.set("printBackground", "true");      // respeitar cores
  form.set("emulatedMediaType", "print");   // usar @media print
  // Opcional: timeout (ms)
  form.set("waitTimeout", "15000");

  const res = await fetch(`${process.env.GOTENBERG_URL}/forms/chromium/convert/url`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const errTxt = await res.text();
    return new Response(`Gotenberg error: ${res.status} ${errTxt}`, { status: 500 });
  }

  const pdf = Buffer.from(await res.arrayBuffer());
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="relatorio-${clientId}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
