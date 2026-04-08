"use client";

import * as React from "react";
import Link from "next/link";
import {
    Search,
    Bell,
    Settings,
    HelpCircle,
    Menu,
    User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface AdminTopbarProps {
    onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
    const { user } = useAuth();
    return (
        <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3 sm:gap-6 flex-1">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden h-10 w-10 text-slate-400 hover:text-secondary"
                    onClick={onMenuClick}
                >
                    <Menu className="w-5 h-5" />
                </Button>
                
                <div className="relative w-full max-w-xs sm:max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search..."
                        className="bg-slate-50 border-none pl-12 h-10 sm:h-11 text-sm sm:text-base text-secondary font-bold placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary/20 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-4">
                <div className="hidden md:flex items-center gap-1 border-r border-slate-100 pr-4 mr-2">
                    <Link href="/notifications">
                        <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </Button>
                    </Link>
                    <Link href="/settings">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                            <Settings className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 pl-1 sm:pl-2">
                    <div className="text-right hidden sm:block">
                        <div className="text-xs sm:text-sm font-black text-secondary leading-tight truncate max-w-[80px] sm:max-w-[120px]">{user?.email.split('@')[0] || "Admin"}</div>
                        <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">{user?.role === 'admin' ? "Chief Admin" : "Operator"}</div>
                    </div>
                    <Link href="/settings">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center shrink-0 cursor-pointer hover:border-primary transition-colors">
                            {user?.email ? (
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Admin" />
                            ) : (
                                <User className="w-5 h-5 text-slate-400" />
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}
