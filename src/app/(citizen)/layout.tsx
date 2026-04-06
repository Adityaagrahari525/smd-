"use client";

import * as React from "react";
import { CitizenSidebar } from "@/components/layout/citizen-sidebar";
import { CitizenTopbar } from "@/components/layout/citizen-topbar";
import { cn } from "@/lib/utils";

export default function CitizenLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex bg-slate-50 min-h-screen relative">
            {/* Sidebar with Drawer functionality for mobile/tablet */}
            <CitizenSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />
            
            {/* Overlay for mobile/tablet when sidebar is open */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <CitizenTopbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className={cn(
                    "flex-1 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 overflow-y-auto transition-all duration-300",
                    "lg:ml-64" // Fixed margin only on desktop
                )}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
