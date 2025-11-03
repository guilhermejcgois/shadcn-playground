"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SECTIONS } from "@/lib/sections";

export function PageIndex({ clientId, sectionId }: { clientId: string; sectionId: string }) {
    const pathname = usePathname();
    const section = SECTIONS.find(s => s.id === sectionId)!;
    return (
        <div className="w-72 border-r hidden xl:block">
            <ScrollArea className="h-[calc(100dvh-56px)] p-3">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Páginas da seção</div>
                    <Badge variant="secondary">{section.pages.length}</Badge>
                </div>
                <nav className="grid gap-1">
                    {section.pages.map((p, idx) => {
                        const href = `/${clientId}/${section.id}?page=${p.id}`;
                        const active = pathname?.includes(`/${clientId}/${section.id}`) && typeof window !== "undefined"
                            ? new URLSearchParams(window.location.search).get("page") === p.id
                            : idx === 0; // fallback
                        return (
                            <Link key={p.id}
                                href={href}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm hover:bg-accent/60",
                                    active && "bg-accent"
                                )}
                            >
                                {idx + 1}. {p.label}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
        </div>
    );
}
