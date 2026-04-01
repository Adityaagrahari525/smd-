"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Download,
    Eye,
    ChevronLeft,
    ChevronRight,
    Droplets,
    Activity,
    AlertTriangle,
    CheckCircle2,
    Clock,
    TrendingDown,
    TrendingUp,
    MapPin,
    BarChart2,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const issues = [
    {
        id: "#JS-9021",
        location: "Sector 4-C",
        sublocation: "Palm Grove Avenue",
        type: "Leakage",
        typeIcon: Droplets,
        severity: 9.2,
        severityLabel: "CRITICAL",
        severityColor: "text-red-500",
        severityBg: "bg-red-50",
        status: "Pending",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200",
        date: "Oct 24, 2023",
    },
    {
        id: "#JS-8842",
        location: "Sector 9-G",
        sublocation: "Hillcrest Bypass",
        type: "Contamination",
        typeIcon: Activity,
        severity: 6.4,
        severityLabel: "MEDIUM",
        severityColor: "text-amber-500",
        severityBg: "bg-amber-50",
        status: "In Progress",
        statusColor: "text-blue-600 bg-blue-50 border-blue-200",
        date: "Oct 22, 2023",
    },
    {
        id: "#JS-8751",
        location: "Industrial Hub",
        sublocation: "Warehouse Row 14",
        type: "Pressure Drop",
        typeIcon: AlertTriangle,
        severity: 3.1,
        severityLabel: "LOW",
        severityColor: "text-green-500",
        severityBg: "bg-green-50",
        status: "Resolved",
        statusColor: "text-green-600 bg-green-50 border-green-200",
        date: "Oct 20, 2023",
    },
    {
        id: "#JS-8610",
        location: "Sector 1-A",
        sublocation: "Central Square",
        type: "Low Flow",
        typeIcon: Droplets,
        severity: 2.4,
        severityLabel: "LOW",
        severityColor: "text-green-500",
        severityBg: "bg-green-50",
        status: "Resolved",
        statusColor: "text-green-600 bg-green-50 border-green-200",
        date: "Oct 18, 2023",
    },
];

const topSectors = [
    { name: "Sector 4-C", count: 142 },
    { name: "Industrial Hub", count: 98 },
    { name: "Sector 1-A", count: 76 },
];

export default function OverviewPage() {
    const [search, setSearch] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("All Issues");

    return (
        <div className="pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 mb-8">
                <div className="flex-1">
                    <h1 className="text-4xl font-black text-secondary tracking-tight mb-3">City-Wide Issues</h1>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                        A transparent, real-time repository of all reported water-related incidents
                        across our urban sectors. Powered by AI-validation and community reporting.
                    </p>
                </div>

                {/* Community Impact Card */}
                <Card className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm min-w-[240px]">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">COMMUNITY IMPACT</div>
                    <div className="flex items-center gap-3">
                        <div>
                            <div className="text-3xl font-black text-secondary">1,284</div>
                            <div className="text-xs font-semibold text-primary leading-tight">Issues Resolved This Month</div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ml-auto shrink-0">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-4/5 bg-primary rounded-full" />
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1.5">80% Resolution Rate</div>
                    </div>
                </Card>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by ID or Sector..."
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-secondary placeholder:text-slate-300"
                    />
                </div>
                <select className="text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>All Sectors</option>
                    <option>Sector 4-C</option>
                    <option>Sector 9-G</option>
                </select>
                <select className="text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-500 text-sm gap-2 hover:text-primary hover:border-primary/30 transition-all">
                    <Filter className="w-4 h-4" /> Advanced Filters
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-500 text-sm gap-2 hover:text-primary hover:border-primary/30 transition-all">
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            {/* Issues Table */}
            <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden mb-8">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/50">
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Issue ID</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Location (Sector)</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Type</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Severity</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Date Reported</th>
                            <th className="text-left px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {issues.map((issue, i) => (
                            <motion.tr
                                key={issue.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="hover:bg-slate-50/50 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-primary">{issue.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-bold text-secondary">{issue.location}</div>
                                    <div className="text-xs text-slate-400">{issue.sublocation}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <issue.typeIcon className="w-4 h-4 text-primary" />
                                        {issue.type}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={cn("text-sm font-black", issue.severityColor)}>●  {issue.severity}</span>
                                        <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full", issue.severityBg, issue.severityColor)}>
                                            {issue.severityLabel}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full border", issue.statusColor)}>
                                        {issue.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-500">{issue.date}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-slate-400 transition-all group-hover:scale-110">
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                    <span className="text-sm text-slate-400">Showing 1-10 of 482 issues</span>
                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {[1, 2, 3].map(page => (
                            <button key={page} className={cn(
                                "w-8 h-8 rounded-lg text-sm font-bold transition-all",
                                page === 1 
                                    ? "bg-secondary text-white" 
                                    : "border border-slate-200 text-slate-500 hover:border-primary hover:text-primary"
                            )}>
                                {page}
                            </button>
                        ))}
                        <span className="text-slate-300 text-sm px-1">...</span>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 text-sm font-bold text-slate-500 hover:border-primary hover:text-primary transition-all">48</button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>

            {/* Bottom Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Sectors */}
                <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-black text-secondary">Top Sectors (Reports)</h3>
                        <MapPin className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="space-y-4">
                        {topSectors.map((s, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                    <span className="font-semibold text-slate-600">{s.name}</span>
                                    <span className="font-black text-secondary">{s.count}</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{ width: `${(s.count / 142) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Resolution Trends */}
                <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-black text-secondary">Resolution Trends</h3>
                        <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-end gap-1.5 h-24">
                        {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div 
                                    className={cn("w-full rounded-t-sm transition-all", i === 4 ? "bg-secondary" : "bg-slate-200")}
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-300 mt-3 uppercase tracking-widest">Issues resolved per day (Last 7 Days)</p>
                </Card>

                {/* Civic Commitment */}
                <Card className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm relative">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/60 to-secondary/30" />
                    <div className="relative z-10 p-6 h-full flex flex-col justify-end" style={{ minHeight: "220px" }}>
                        <h3 className="text-lg font-black text-white mb-2">Civic Commitment 2024</h3>
                        <p className="text-xs text-white/70 leading-relaxed mb-4">
                            Our goal: Zero major leakages by year-end through proactive maintenance and citizen participation.
                        </p>
                        <button className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1">
                            Read Transparency Report →
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
