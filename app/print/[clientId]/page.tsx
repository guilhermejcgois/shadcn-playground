import { fmtBRL } from "@/lib/format";

export default async function PrintAll({ params }: { params: Promise<{ clientId: string }> }) {
    const { clientId } = await params;
    const res = await fetch(`${process.env.PUBLIC_BASE_URL ?? ""}/api/reports/${clientId}/all`, { cache: "no-store" });
    if (!res.ok) throw new Error("Falha ao carregar relatório");
    const report = await res.json();

    return (
        <main>
            <section className="page">
                <h1 style={{ marginBottom: 8 }}>Cliente {clientId} — Capa</h1>
                <small>Gerado em {new Date().toLocaleString("pt-BR")}</small>
            </section>

            <section className="page">
                <h2>Visão Geral</h2>
                <p>PL Bruto: <strong>{fmtBRL(report.summary.plBruto)}</strong></p>
                <p>Mês: <strong>+{report.summary.mes.toFixed(2)}%</strong> (CDI +{report.summary.cdiMes.toFixed(2)}%)</p>
                <p>12M: <strong>+{report.summary.m12.toFixed(2)}%</strong> (CDI +{report.summary.cdi12m.toFixed(2)}%)</p>
            </section>

            <section className="page">
                <h2>Performance</h2>
                <p>Janelas: 1M {report.performance.windows["1m"]}%, 12M {report.performance.windows["12m"]}%…</p>
                {/* você pode renderizar gráficos SVG aqui também */}
            </section>

            {/* Repita para exposure, allocation, institutions, positions, liquidity, movements */}
            <section className="page"><small>Disclaimer</small></section>
        </main>
    );
}
