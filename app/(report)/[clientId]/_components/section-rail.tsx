"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTIONS } from "@/lib/sections";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function SectionRail({ clientId }: { clientId: string }) {
    const pathname = usePathname();
    return (
        <aside className="hidden md:flex w-64 shrink-0 border-r">
            <ScrollArea className="h-[calc(100dvh-56px)] w-full p-3">
                <div className="text-sm font-medium mb-2 px-2">Seções</div>
                <nav className="grid gap-1">
                    {SECTIONS.map(s => {
                        const active = pathname?.includes(`/${clientId}/${s.id}`);
                        return (
                            <Link
                                key={s.id}
                                href={`/${clientId}/${s.id}`}
                                className={cn(
                                    "px-3 py-2 rounded-md text-sm hover:bg-accent",
                                    active && "bg-accent"
                                )}
                            >
                                {s.label}
                            </Link>
                        );
                    })}
                </nav>
            </ScrollArea>
        </aside>
    );
}
