import { CitizenSidebar } from "@/components/layout/citizen-sidebar";
import { CitizenTopbar } from "@/components/layout/citizen-topbar";

export default function CitizenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <CitizenSidebar />
            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <CitizenTopbar />
                <main className="flex-1 px-10 py-8 overflow-y-auto ml-64">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
