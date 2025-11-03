"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// MOCK: troque depois por chamada à sua API /api/clients?q=
const MOCK_CLIENTS = [
    { id: "c1", name: "Maria Santos", doc: "123.***.***-**" },
    { id: "c2", name: "João Oliveira", doc: "987.***.***-**" },
    { id: "c3", name: "Family Office Alfa", doc: "12.345.678/0001-**" },
    { id: "c4", name: "Carlos Lima", doc: "456.***.***-**" },
    { id: "c5", name: "Beatriz Souza", doc: "654.***.***-**" },
];

export default function ReportRootPage() {
    const router = useRouter();
    const [q, setQ] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const results = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return MOCK_CLIENTS;
        return MOCK_CLIENTS.filter(
            (c) =>
                c.name.toLowerCase().includes(s) ||
                c.doc.toLowerCase().includes(s) ||
                c.id.toLowerCase() === s
        );
    }, [q]);

    function openClient(id?: string | null) {
        const target = id ?? selectedId ?? results.at(0)?.id;
        if (!target) return;
        router.push(`/${target}/overview?page=cover`);
    }

    return (
        <div className="min-h-dvh">
            {/* Topbar simples */}
            <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
                    <div className="font-semibold">Relatórios</div>
                    <div className="text-sm opacity-70">MVP de Visualização & PDF</div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 grid gap-6">
                <div className="max-w-3xl">
                    <h1 className="text-2xl font-semibold tracking-tight">Escolher cliente</h1>
                    <p className="text-sm text-muted-foreground">
                        Busque por nome, documento ou ID e abra o relatório para visualizar por seções.
                    </p>
                </div>

                <Card className="p-4 max-w-3xl">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Buscar cliente… (ex.: Maria, 123, c1)"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && openClient()}
                                className="flex-1"
                            />
                            <Button onClick={() => openClient()}>Abrir</Button>
                        </div>

                        <Separator />

                        <div className="grid gap-2">
                            {results.length === 0 && (
                                <div className="text-sm text-muted-foreground px-1 py-3">
                                    Nenhum cliente encontrado.
                                </div>
                            )}

                            {results.map((c) => {
                                const active = selectedId === c.id;
                                return (
                                    <button
                                        key={c.id}
                                        onClick={() => setSelectedId(c.id)}
                                        onDoubleClick={() => openClient(c.id)}
                                        className={[
                                            "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left",
                                            active ? "bg-accent/60" : "hover:bg-accent/40",
                                        ].join(" ")}
                                        title="Clique para selecionar, duplo clique para abrir"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">{c.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {c.doc} • ID: {c.id}
                                            </span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openClient(c.id);
                                            }}
                                        >
                                            Visualizar
                                        </Button>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </Card>

                <div className="max-w-3xl text-sm text-muted-foreground">
                    Dica: depois de abrir, use a navegação lateral por <strong>Seções</strong> e, dentro de
                    cada seção, o índice de <strong>Páginas</strong> para ir direto à parte do relatório.
                </div>
            </main>
        </div>
    );
}
