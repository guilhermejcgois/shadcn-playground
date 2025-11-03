import { PageIndex } from "../_components/page-index";
import { ContentShell } from "../_components/content-shell";
import { Button } from "@/components/ui/button";

export default function OverviewPage({
    params, searchParams,
}: { params: { clientId: string }, searchParams: { page?: string } }) {
    const page = searchParams.page ?? "cover";

    return (
        <div className="flex w-full">
            <PageIndex clientId={params.clientId} sectionId="overview" />
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
                {page === "cover" && (
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Cards shadcn */}
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-2">PL Bruto</div>
                            <div className="text-2xl font-semibold">R$ 1.458.220</div>
                        </div>
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-2">Ganho no mês</div>
                            <div className="text-2xl font-semibold">+1,32%</div>
                        </div>
                        <div className="rounded-xl border p-4">
                            <div className="text-sm opacity-80 mb-2">Rentab. mês</div>
                            <div className="text-2xl font-semibold">+1,23%</div>
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