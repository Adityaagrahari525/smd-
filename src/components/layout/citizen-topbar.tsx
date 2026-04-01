"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Bell, HelpCircle, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CitizenTopbar() {
    return (
        <header className="h-16 px-8 flex items-center justify-between bg-white border-b border-slate-100 z-30 ml-64 sticky top-0">
            {/* Left: Brand text matching image 1 style */}
            <div className="flex-1 max-w-sm">
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search report ID or location..."
                        className="pl-10 bg-slate-50 border border-slate-200 rounded-xl h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary/20 placeholder:text-slate-300"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 ml-8">
                {/* Help */}
                <button className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary transition-colors">
                    <HelpCircle className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <button className="relative w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-secondary transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>

                {/* Avatar */}
                <button className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shadow-md shadow-secondary/20 hover:bg-secondary/90 transition-colors overflow-hidden">
                    <User className="w-5 h-5 text-white" />
                </button>
            </div>
        </header>
    );
}
