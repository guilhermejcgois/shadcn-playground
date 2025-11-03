import { Topbar } from "./_components/topbar";
import { SectionRail } from "./_components/section-rail";

export default function ClientLayout({
    params, children,
}: { params: { clientId: string }; children: React.ReactNode }) {
    return (
        <div className="min-h-dvh">
            <Topbar clientId={params.clientId} />
            <div className="mx-auto max-w-7xl px-2 md:px-4">
                <div className="flex">
                    <SectionRail clientId={params.clientId} />
                    {/* o conteúdo + índice de páginas entram nas páginas específicas */}
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
}