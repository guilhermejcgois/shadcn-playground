import { Separator } from "@/components/ui/separator";

export function ContentShell({ title, actions, children }: {
    title: string; actions?: React.ReactNode; children: React.ReactNode;
}) {
    return (
        <div className="flex-1">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-lg font-semibold">{title}</h1>
                <div className="flex gap-2">{actions}</div>
            </div>
            <Separator />
            <div className="p-4 grid gap-4">{children}</div>
        </div>
    );
}