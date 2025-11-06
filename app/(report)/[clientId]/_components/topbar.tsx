"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Topbar({ clientId }: { clientId: string }) {
    const router = useRouter();
    return (
        <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 h-14 flex items-center gap-3">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden">Menu</Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0">
                        {/* o rail das seções entra aqui no mobile (ver SectionRail) */}
                        <div id="mobile-rail" />
                    </SheetContent>
                </Sheet>

                <div className="font-semibold"><Link href="/">Relatórios</Link></div>
                <div className="ml-auto flex items-center gap-2">
                    <Input className="w-64 hidden md:block" placeholder="Buscar cliente..." />
                    <Button variant="outline" onClick={() => router.push(`/print/${clientId}`)}>
                        Pré-visualizar PDF
                    </Button>
                    <form action={`/api/print/${clientId}`} method="post">
                        <Button type="submit">Gerar PDF</Button>
                    </form>
                </div>
            </div>
        </header>
    );
}
