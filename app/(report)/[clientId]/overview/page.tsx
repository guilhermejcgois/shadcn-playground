'use client'

import { PageIndex } from "../_components/page-index";
import { ContentShell } from "../_components/content-shell";
import { Button } from "@/components/ui/button";
import { useReportSummary } from "@/lib/hooks";
import { fmtBRL } from "@/lib/format";
import { useSearchParams, useParams } from "next/navigation";

export default function OverviewPage() {
    const { clientId } = useParams<{clientId: string}>();
    const searchParams = useSearchParams();
    const page = searchParams.get("page") ?? "cover";
    const { data, isLoading, error } = useReportSummary(clientId);

    return (
        <div className="flex w-full">
            <PageIndex clientId={clientId} sectionId="overview" />
            <ContentShell
                title="Visão Geral"
                actions={
                    <>
                        <Button variant="outline" asChild>
                            <a href={`?page=cover`}>Anterior</a>
                        </Button>
                        <Button asChild>
                            <a href={`?page=kpis`}>Próxima</a>
                        </Button>
                    </>
                }
            >
                {error && <div className="text-sm text-red-500">Erro ao carregar: {(error as Error).message}</div>}

                {isLoading && <div className="text-sm opacity-70">Carregando…</div>}

                {page === "cover" && data && (
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Cards shadcn */}
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-2">PL Bruto</div>
                            <div className="text-2xl font-semibold">{fmtBRL(data.plBruto)}</div>
                        </div>
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-2">Mês</div>
                            <div className="text-2xl font-semibold">+{data.mes.toFixed(2)}%</div>
                            <div className="text-xs opacity-60">CDI +{data.cdiMes.toFixed(2)}%</div>
                        </div>
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-1">12 meses</div>
                            <div className="text-2xl font-semibold">+{data.m12.toFixed(2)}%</div>
                            <div className="text-xs opacity-60">CDI +{data.cdi12m.toFixed(2)}%</div>
                        </div>
                    </div>
                )}

                {page === "kpis" && (
                    <div className="rounded-xl border p-6">KPIs e destaques…</div>
                )}

                {page === "monthly" && (
                    <div className="rounded-xl border p-6">Gráfico Rentabilidade Mensal…</div>
                )}
            </ContentShell>
        </div>
    );
}