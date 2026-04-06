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
    Cpu,
    X
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

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    return (
        <aside className={cn(
            "w-64 border-r border-slate-100 bg-white h-screen fixed lg:sticky left-0 top-0 flex flex-col p-4 shadow-sm z-40 transition-transform duration-300",
            "lg:translate-x-0", // Visible on desktop
            isOpen ? "translate-x-0" : "-translate-x-full" // Mobile drawer
        )}>
            <div className="mb-10 px-4 py-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                        <Droplet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-secondary tracking-tight leading-tight uppercase">Admin</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-0.5">Control</p>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-secondary"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-grow space-y-1 overflow-y-auto">
                {adminMenuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => onClose()}
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
                <Button className="w-full h-12 rounded-xl bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/10 gap-3 mb-2 font-black uppercase tracking-widest text-[10px]">
                    <Plus className="w-4 h-4" />
                    New Action
                </Button>

                <Link
                    href="/support"
                    onClick={() => onClose()}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-500 hover:text-secondary transition-colors"
                >
                    <HelpCircle className="w-4 h-4" />
                    Support
                </Link>
                <button 
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all w-full rounded-xl cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}
