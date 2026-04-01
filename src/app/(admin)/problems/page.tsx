"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { 
    Search, 
    Filter, 
    Download, 
    Eye, 
    Calendar,
    MapPin, 
    ChevronDown,
    Activity,
    ShieldAlert,
    Target,
    Zap,
    Cpu,
    Plus,
    FileText,
    TrendingUp,
    Clock,
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Active Issues", value: "124", color: "text-primary" },
    { label: "Avg Resolution", value: "2.1", suffix: "hrs", color: "text-secondary" },
    { label: "Critical", value: "05", color: "text-danger" },
];

const incidentData = [
    { 
        id: "#JS-9842", 
        type: "Main Pipe Leakage", 
        risk: 85, 
        riskColor: "bg-danger",
        location: "Sector 14, Main Arterial", 
        time: "Today, 09:42 AM", 
        relativeTime: "24 mins ago",
        severity: "CRITICAL", 
        severityColor: "bg-danger/10 text-danger",
        status: "PENDING", 
        statusDot: "bg-primary",
        actionLabel: "Assign Team",
        actionVariant: "default" as const
    },
    { 
        id: "#JS-9840", 
        type: "Chemical Contamination", 
        risk: 72, 
        riskColor: "bg-blue-600",
        location: "Indira Nagar, Lane 4", 
        time: "Today, 08:15 AM", 
        relativeTime: "1.5 hrs ago",
        severity: "HIGH", 
        severityColor: "bg-orange-100 text-orange-600",
        status: "ASSIGNED", 
        statusDot: "bg-blue-500",
        actionLabel: "Update Status",
        actionVariant: "outline" as const
    },
    { 
        id: "#JS-9838", 
        type: "Pump Failure", 
        risk: 45, 
        riskColor: "bg-teal-500",
        location: "Lake Front Station B", 
        time: "Yesterday, 11:30 PM", 
        relativeTime: "10 hrs ago",
        severity: "MEDIUM", 
        severityColor: "bg-slate-100 text-slate-500",
        status: "IN PROGRESS", 
        statusDot: "bg-cyan-400",
        actionLabel: "Update Status",
        actionVariant: "outline" as const
    },
    { 
        id: "#JS-9831", 
        type: "Minor Seepage", 
        risk: 12, 
        riskColor: "bg-slate-300",
        location: "Railway Colony North", 
        time: "Yesterday, 04:20 PM", 
        relativeTime: "17 hrs ago",
        severity: "LOW", 
        severityColor: "bg-slate-100 text-slate-400",
        status: "RESOLVED", 
        statusDot: "bg-secondary",
        actionLabel: "View History",
        actionVariant: "outline" as const
    },
];

export default function ProblemListPage() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-black text-secondary tracking-tighter mb-4">Problem List</h1>
                    <p className="text-slate-400 font-bold text-lg leading-relaxed">
                        Comprehensive oversight of all municipal water issues. Real-time monitoring and priority dispatch for civil infrastructure integrity.
                    </p>
                </div>
                
                {/* Header Stats */}
                <div className="flex bg-white rounded-[2.5rem] p-2 shadow-xl shadow-slate-200/40 border border-slate-50">
                    {stats.map((stat, i) => (
                        <div key={i} className={cn(
                            "px-10 py-6 flex flex-col items-start gap-1",
                            i !== stats.length - 1 && "border-r border-slate-50"
                        )}>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            <div className={cn("text-4xl font-black tracking-tighter", stat.color)}>
                                {stat.value}
                                {stat.suffix && <span className="text-sm ml-1 text-slate-300">{stat.suffix}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Bar */}
            <Card className="shadow-xl shadow-slate-200/30 rounded-[2.5rem] bg-white p-4 border-slate-100">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Local Search Input */}
                    <div className="relative flex-1 min-w-[300px] group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                            placeholder="Find by Issue ID, Sector or Asset ID..." 
                            className="h-14 pl-16 bg-slate-50 border-none rounded-2xl text-xs font-black placeholder:text-slate-300 focus-visible:ring-1 focus-visible:ring-primary/20 transition-all shadow-inner"
                        />
                    </div>

                    {/* Select Mocks */}
                    <DropdownMock label="Issue Type" value="All Types" />
                    <DropdownMock label="Severity" value="All Levels" />
                    <DropdownMock label="Status" value="All Status" />
                    
                    {/* Date Picker Mock */}
                    <div className="h-14 flex items-center gap-4 px-6 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer group hover:bg-slate-100 transition-colors">
                        <Calendar className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                        <span className="text-xs font-black text-secondary tracking-tight">Oct 12 - Oct 19, 2023</span>
                    </div>

                    <Button className="h-14 px-10 bg-secondary hover:bg-secondary/90 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-secondary/20 ml-auto">
                        <Filter className="w-4 h-4 mr-2" /> Apply Filters
                    </Button>
                </div>
            </Card>

            {/* Main Table */}
            <Card className="shadow-2xl shadow-slate-200/40 rounded-[3rem] bg-white overflow-hidden border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Issue ID</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type & Risk</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Reported Time</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Severity</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {incidentData.map((item, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-10 py-8">
                                        <span className="text-sm font-black text-primary tracking-tighter cursor-pointer hover:underline">{item.id}</span>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="space-y-2">
                                            <div className="text-base font-black text-secondary tracking-tight">{item.type}</div>
                                            <div className="flex items-center gap-3 w-32">
                                                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.risk}%` }}
                                                        className={cn("h-full", item.riskColor)} 
                                                    />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase">{item.risk} Risk</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="flex gap-3">
                                            <div className="mt-1 w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0">
                                                <MapPin className="w-3 h-3 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-secondary tracking-tight">{item.location}</div>
                                                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Main Arterial</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-8">
                                        <div className="text-sm font-black text-secondary tracking-tight">{item.time}</div>
                                        <div className="text-[10px] font-bold text-slate-400 mt-1 italic">{item.relativeTime}</div>
                                    </td>
                                    <td className="px-8 py-8 text-center">
                                        <span className={cn("px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest inline-block border border-slate-100", item.severityColor)}>
                                            {item.severity}
                                        </span>
                                    </td>
                                    <td className="px-8 py-8 text-center">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                            <div className={cn("w-2 h-2 rounded-full", item.statusDot)} />
                                            <span className="text-[9px] font-black text-secondary uppercase tracking-[0.15em]">{item.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-4">
                                            <Button 
                                                variant={item.actionVariant}
                                                size="sm" 
                                                className={cn(
                                                    "h-10 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest",
                                                    item.actionVariant === 'outline' ? "border-slate-100 text-secondary hover:bg-slate-50" : "bg-secondary text-white hover:bg-secondary/90"
                                                )}
                                            >
                                                {item.actionLabel}
                                            </Button>
                                            <button className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-10 py-8 bg-slate-50/50 flex items-center justify-between">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                        Showing 1 to 4 of 124 entries
                    </div>
                    <div className="flex gap-2">
                        <PaginationButton label="1" active />
                        <PaginationButton label="2" />
                        <PaginationButton label="3" />
                        <PaginationButton label="..." disabled />
                        <PaginationButton label=">" />
                    </div>
                </div>
            </Card>

            {/* Bottom Section - Action Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Dispatch Card */}
                <Card className="lg:col-span-6 bg-secondary text-white rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-secondary/40 h-full">
                    <div className="relative z-10 space-y-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <TrendingUp className="w-7 h-7 text-primary" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black italic tracking-tight">Automated Dispatch System</h3>
                            <p className="text-white/60 font-bold text-sm leading-relaxed max-w-sm">
                                Enable AI-driven routing to reduce average resolution time by another 15% across all sectors.
                            </p>
                        </div>
                        <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
                            Configure AI Dispatch
                        </Button>
                    </div>
                    {/* Decorative Shape */}
                    <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                </Card>

                {/* Audit Card */}
                <Card className="lg:col-span-3 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] p-10 flex flex-col justify-between group h-full">
                    <div className="space-y-6">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Export Status</div>
                        <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                            Last monthly audit report generated on Oct 01.
                        </p>
                    </div>
                    <Button variant="ghost" className="h-14 px-0 justify-start text-[11px] font-black text-secondary hover:text-primary uppercase tracking-widest gap-2 group transition-all">
                        Download PDF Audit <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </Button>
                </Card>

                {/* Emergency Card */}
                <div className="lg:col-span-3 relative h-full">
                    <Card className="bg-red-50/50 border border-red-100 rounded-[2.5rem] p-10 space-y-6 h-full">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-4 h-4 text-danger animate-pulse" />
                            <div className="text-[10px] font-black text-danger uppercase tracking-widest">Emergency Protocol</div>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 italic">
                            Sector 02 shows contamination risk. Alert teams immediately.
                        </p>
                        <Button className="w-full h-14 bg-danger hover:bg-danger/90 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-danger/20 transition-all active:scale-95">
                            Trigger Alert
                        </Button>
                    </Card>
                    
                    {/* Floating Action Button */}
                    <button className="absolute -top-4 -right-4 w-14 h-14 bg-secondary text-white rounded-2xl shadow-xl shadow-secondary/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-20 group">
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function DropdownMock({ label, value }: { label: string, value: string }) {
    return (
        <div className="h-14 flex items-center justify-between gap-10 px-6 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer group hover:bg-slate-100 transition-colors flex-1 min-w-[200px]">
            <div className="space-y-0.5">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
                <div className="text-xs font-black text-secondary tracking-tight">{value}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors shrink-0" />
        </div>
    );
}

function PaginationButton({ label, active = false, disabled = false }: { label: string, active?: boolean, disabled?: boolean }) {
    return (
        <button 
            disabled={disabled}
            className={cn(
                "w-10 h-10 rounded-xl text-[10px] font-black flex items-center justify-center transition-all",
                active ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "bg-white border border-slate-100 text-slate-400 hover:bg-slate-50",
                disabled && "opacity-50 cursor-not-allowed hover:bg-white"
            )}
        >
            {label}
        </button>
    );
}
