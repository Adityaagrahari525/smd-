"use client";

import * as React from "react";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { cn } from "@/lib/utils";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <div className="flex bg-slate-50 min-h-screen relative">
            {/* Admin Sidebar with toggle logic */}
            <AdminSidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col min-h-screen overflow-hidden transition-all duration-300">
                <AdminTopbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className={cn(
                    "flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto transition-all duration-300",
                    "lg:ml-0" // The sidebar is sticky/relative in Admin, but we'll ensure it doesn't overlap
                )}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
