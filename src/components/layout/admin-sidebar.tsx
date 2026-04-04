"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Map as MapIcon,
    BarChart3,
    ListTodo,
    Droplet,
    ShieldAlert,
    FileSearch,
    Settings,
    LogOut,
    HelpCircle,
    Plus,
    Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const adminMenuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Live Map", href: "/live-map", icon: MapIcon },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Problem List", href: "/problems", icon: ShieldAlert },
    { name: "Water Quality", href: "/quality", icon: Droplet },
    { name: "Infrastructure", href: "/infrastructure", icon: Cpu },
    { name: "Reports", href: "/reports", icon: FileSearch },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();

    return (
        <aside className="w-64 border-r border-slate-100 bg-white h-screen sticky top-0 flex flex-col p-4 shadow-sm z-30">
            <div className="mb-10 px-4 py-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h2 className="text-sm font-black text-secondary tracking-tight leading-tight uppercase">Command Center</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Fluid Authority</p>
                </div>
            </div>

            <nav className="flex-grow space-y-1">
                {adminMenuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group border border-transparent",
                                isActive
                                    ? "bg-primary/5 text-primary shadow-sm border-primary/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-secondary hover:border-slate-100"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-primary" : "text-slate-400 group-hover:text-secondary"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto space-y-4 pt-4 border-t border-slate-50">
                <Button className="w-full h-14 rounded-2xl bg-[#007A8A] hover:bg-[#00606D] shadow-xl shadow-[#007A8A]/20 gap-3 mb-6 font-black uppercase tracking-widest text-xs">
                    <Plus className="w-5 h-5" />
                    New Report
                </Button>

                <Link
                    href="/support"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:text-secondary transition-colors"
                >
                    <HelpCircle className="w-5 h-5" />
                    Support
                </Link>
                <button 
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all w-full rounded-xl cursor-pointer"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
