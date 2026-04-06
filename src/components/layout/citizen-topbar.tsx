"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Bell, HelpCircle, User, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface CitizenTopbarProps {
    onMenuClick: () => void;
}

export function CitizenTopbar({ onMenuClick }: CitizenTopbarProps) {
    const { user } = useAuth();
    return (
        <header className={cn(
            "h-16 px-4 sm:px-8 flex items-center justify-between bg-white border-b border-slate-100 z-30 sticky top-0 transition-all duration-300",
            "lg:ml-64" // Fixed margin only on desktop
        )}>
            {/* Left: Hamburger & Search */}
            <div className="flex items-center gap-4 flex-1 max-w-sm sm:max-w-md">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-secondary transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                <div className="relative group flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search..."
                        className="pl-10 bg-slate-50 border border-slate-200 rounded-xl h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary/20 placeholder:text-slate-300 w-full"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3 ml-4">
                {/* Help - Hidden on mobile */}
                <button className="hidden sm:flex w-9 h-9 rounded-xl hover:bg-slate-50 items-center justify-center text-slate-400 hover:text-secondary transition-colors">
                    <HelpCircle className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {/* Avatar & Info */}
                <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-100">
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-black text-secondary leading-tight line-clamp-1">{user?.email.split('@')[0] || "Citizen"}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active</div>
                    </div>
                    <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-md shadow-secondary/20 hover:bg-secondary/90 transition-colors overflow-hidden border border-secondary/20">
                        {user?.email ? (
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="User" />
                        ) : (
                            <User className="w-5 h-5 text-white" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
