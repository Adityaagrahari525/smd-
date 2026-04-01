"use client";

import * as React from "react";
import {
    Search,
    Bell,
    Settings,
    HelpCircle,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminTopbar() {
    return (
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <div className="flex items-center gap-6 flex-1">
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                </Button>
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search reports, assets, or infrastructure ID..."
                        className="bg-slate-50 border-none pl-12 h-11 text-secondary font-bold placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-primary/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border-r border-slate-100 pr-4 mr-2">
                    <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                        <Settings className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-primary hover:bg-primary/5 rounded-full">
                        <HelpCircle className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-black text-secondary leading-tight">Arjun Mehta</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chief Administrator</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                    </div>
                </div>
            </div>
        </header>
    );
}
