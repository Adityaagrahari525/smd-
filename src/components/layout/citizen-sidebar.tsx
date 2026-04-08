"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    PlusCircle,
    FileText,
    LayoutGrid,
    Users,
    Settings,
    HelpCircle,
    User,
    Droplets,
    LogOut,
    AlertTriangle,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
    { name: "Overview", href: "/overview", icon: LayoutGrid },
    { name: "New Issue", href: "/report", icon: PlusCircle },
    { name: "My Reports", href: "/history", icon: FileText },
    { name: "Community", href: "/community", icon: Users },
];

const bottomItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Support", href: "/help", icon: HelpCircle },
];

interface CitizenSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CitizenSidebar({ isOpen, onClose }: CitizenSidebarProps) {
    const pathname = usePathname();
    const { signOut } = useAuth();

    return (
        <aside className={cn(
            "w-64 border-r border-slate-100 bg-white h-screen fixed left-0 top-0 flex flex-col z-50 transition-transform duration-300 ease-in-out",
            "lg:translate-x-0", // Desktop: always visible
            isOpen ? "translate-x-0" : "-translate-x-full" // Mobile/Tablet: toggle visibility
        )}>
            {/* Logo & Close Button (Mobile) */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="bg-primary p-1.5 rounded-lg shadow-md shadow-primary/20">
                            <Droplets className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-secondary tracking-tight">JalSuraksha</span>
                    </div>
                    <div className="text-[9px] font-black text-slate-300 uppercase tracking-[0.25em] pl-9">CITIZEN PORTAL</div>
                </div>
                <button 
                    onClick={onClose}
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-secondary"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-4 py-5 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => onClose()} // Close on navigation (mobile)
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                                isActive
                                    ? "bg-primary/8 text-primary"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-secondary"
                            )}
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                            )}
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-primary" : "text-slate-400 group-hover:text-secondary"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Emergency Report Button */}
            <div className="px-4 py-4">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-secondary/20 hover:scale-[1.02] active:scale-95">
                    <AlertTriangle className="w-4 h-4" />
                    Emergency Report
                </button>
            </div>

            {/* Bottom Items */}
            <div className="px-4 pb-5 space-y-1 border-t border-slate-50 pt-4">
                {bottomItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => onClose()} // Close on navigation (mobile)
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                                isActive ? "text-primary" : "text-slate-400 hover:text-secondary hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
                <button 
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
