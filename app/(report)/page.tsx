"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

// MOCK: troque depois por GET /api/clients?q=
const MOCK_CLIENTS = [
    { id: "c1", name: "Maria Santos", doc: "123.***.***-**" },
    { id: "c2", name: "João Oliveira", doc: "987.***.***-**" },
    { id: "c3", name: "Family Office Alfa", doc: "12.345.678/0001-**" },
    { id: "c4", name: "Carlos Lima", doc: "456.***.***-**" },
    { id: "c5", name: "Beatriz Souza", doc: "654.***.***-**" },
];

export default function ReportRootPage() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Spotlight (Cmd+K / Ctrl+K)
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const results = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return MOCK_CLIENTS;
        return MOCK_CLIENTS.filter(
            (c) =>
                c.name.toLowerCase().includes(s) ||
                c.doc.toLowerCase().includes(s) ||
                c.id.toLowerCase().includes(s)
        );
    }, [q]);

    function openClient(id: string) {
        router.push(`/${id}/overview?page=cover`);
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

            <main className="mx-auto max-w-7xl px-4 py-10 grid gap-6">
                <div className="max-w-3xl space-y-1">
                    <h1 className="text-2xl font-semibold tracking-tight">Escolher cliente</h1>
                    <p className="text-sm text-muted-foreground">
                        Pressione <kbd className="px-1 py-0.5 border rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 border rounded">K</kbd> (ou <kbd className="px-1 py-0.5 border rounded">⌘</kbd>+<kbd className="px-1 py-0.5 border rounded">K</kbd>) para abrir o Spotlight.
                    </p>
                </div>

                <Card className="p-4 max-w-3xl">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Button variant="secondary" onClick={() => { setOpen(true); }}>
                                Abrir Spotlight
                            </Button>
                            <Separator orientation="vertical" className="h-6" />
                            <div className="text-sm text-muted-foreground">
                                Ou use o atalho de teclado.
                            </div>
                        </div>

                        <Separator />

                        {/* Lista rápida em linha (além do Spotlight) */}
                        <div className="grid gap-2">
                            {MOCK_CLIENTS.map((c) => (
                                <div key={c.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{c.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {c.doc} • ID: {c.id}
                                        </span>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => openClient(c.id)}>
                                        Visualizar
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </main>

            {/* Spotlight Command */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command shouldFilter={false}>
                    <CommandInput
                        ref={inputRef}
                        placeholder="Buscar por nome, documento ou ID…"
                        value={q}
                        onValueChange={setQ}
                    />
                    <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>

                        <CommandGroup heading="Clientes">
                            {results.map((c) => (
                                <CommandItem
                                    key={c.id}
                                    value={`${c.name} ${c.doc} ${c.id}`}
                                    onSelect={() => {
                                        setOpen(false);
                                        openClient(c.id);
                                    }}
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{c.name}</span>
                                        <span className="text-xs opacity-70">
                                            {c.doc} • ID: {c.id}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>

                        <CommandSeparator />

                        <CommandGroup heading="Ações">
                            <CommandItem onSelect={() => setQ("")}>Limpar busca</CommandItem>
                            <CommandItem onSelect={() => setOpen(false)}>Fechar</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>
        </div>
    );
}