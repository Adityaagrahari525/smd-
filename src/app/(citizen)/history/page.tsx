"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    MapPin,
    Camera,
    CheckCircle2,
    Clock,
    Droplets,
    Plus,
    Eye,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const activeReports = [
    {
        id: "#JS-1092",
        title: "Mainline Leakage",
        date: "Oct 24, 2024 • 10:30 AM",
        status: "TEAM DISPATCHED",
        statusColor: "text-red-500",
        statusDot: "bg-red-500",
        eta: "45 mins",
        etaLabel: "ARRIVAL ETA",
        etaColor: "text-red-500",
        description: '"Large crack in the primary main line at the intersection. Water pressure in the...',
        location: "42nd Maple Street, Downtown District",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300",
        mapBadge: "LIVE TRACKING ACTIVE",
        mapBadgeColor: "bg-secondary/80",
        tracking: [
            { label: "Report Verified", time: "Oct 24, 10:35 AM • Verified by AI Hub", done: true },
            { label: "Work Order Created", time: "Oct 24, 10:42 AM • Order #W-99021", done: true },
            { label: "Team Assigned", time: "Oct 24, 10:50 AM • Emergency Unit 4B", done: true },
            { label: "Repair in Progress", time: "Estimated start: 11:30 AM", done: false },
        ],
        aiScore: "CRITICAL (8.9/10)",
        aiScoreColor: "bg-red-500 text-white",
    },
    {
        id: "#JS-0988",
        title: "Water Contamination",
        date: "Oct 22, 2024 • 03:15 PM",
        status: "UNDER REVIEW",
        statusColor: "text-blue-500",
        statusDot: "bg-blue-500",
        eta: "Scheduled 2:00 PM",
        etaLabel: "INSPECTION ETA",
        etaColor: "text-secondary",
        description: '"Tap water appears slightly yellowish since this morning. Noticeable metallic smell....',
        location: "Block C, Emerald Heights Apartments",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=300",
        mapBadge: "ANALYSIS PENDING",
        mapBadgeColor: "bg-slate-600/80",
    },
];

export default function HistoryPage() {
    const [activeTab, setActiveTab] = React.useState<"all" | "active" | "resolved">("active");

    return (
        <div className="pb-12">
            {/* Page Header */}
            <div className="mb-8">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">CITIZEN HISTORY</div>
                <h1 className="text-4xl font-black text-secondary tracking-tight mb-5">My Submission History</h1>

                {/* Tabs */}
                <div className="flex items-center gap-2">
                    {[
                        { key: "all", label: "All Issues (24)" },
                        { key: "active", label: "Active (3)" },
                        { key: "resolved", label: "Resolved (21)" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as any)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-bold transition-all",
                                activeTab === tab.key
                                    ? "bg-secondary text-white shadow-md shadow-secondary/20"
                                    : "text-slate-400 hover:text-secondary border border-transparent hover:border-slate-200"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {activeReports.map((report, i) => (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            {/* Card Header */}
                            <div className="px-5 pt-5 pb-4">
                                <div className="flex items-start justify-between mb-1">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1">
                                            ISSUE {report.id}
                                        </div>
                                        <h3 className="text-xl font-black text-secondary">{report.title}</h3>
                                        <p className="text-xs text-slate-400 mt-0.5">{report.date}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1.5 justify-end mb-2">
                                            <span className={cn("w-2 h-2 rounded-full", report.statusDot)} />
                                            <span className={cn("text-[10px] font-black uppercase tracking-widest", report.statusColor)}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{report.etaLabel}</div>
                                        <div className={cn("text-2xl font-black leading-tight", report.etaColor)}>
                                            {report.eta}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Report Preview Row */}
                            <div className="flex items-start gap-4 px-5 pb-4">
                                <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                    <img
                                        src={report.image}
                                        alt="Evidence"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-500 italic leading-relaxed mb-2 line-clamp-2">
                                        {report.description}
                                    </p>
                                    <div className="flex items-center gap-1.5 text-primary">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <span className="text-xs font-semibold text-primary underline decoration-dotted underline-offset-2 line-clamp-1">
                                            {report.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Map footer */}
                            <div className="relative h-20 bg-gradient-to-b from-slate-200 to-slate-300 overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,80,140,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(0,80,140,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-300/80 via-slate-200/40 to-transparent" />

                                {/* Floating map pin */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <MapPin className="w-6 h-6 text-primary" fill="currentColor" />
                                </div>

                                {/* Bottom badges */}
                                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-4 py-3">
                                    <span className={cn("text-[9px] font-black text-white px-2 py-1 rounded-md uppercase tracking-widest", report.mapBadgeColor)}>
                                        {report.mapBadge}
                                    </span>
                                    <Button className="h-8 px-4 text-xs font-bold bg-secondary hover:bg-secondary/90 text-white rounded-lg shadow-md">
                                        View Full Report
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Detailed Analysis */}
                <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-black text-secondary uppercase tracking-wider">DETAILED ANALYSIS: #JS-1092</h3>
                        <span className="text-xs font-black px-3 py-1.5 rounded-lg bg-red-500 text-white">CRITICAL (8.9/10)</span>
                    </div>

                    <div className="flex items-start gap-4 text-sm font-semibold mb-2">
                        <div className="text-slate-400 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">AI Severity Score</div>
                    </div>

                    <div className="space-y-0">
                        {activeReports[0].tracking.map((step, i) => (
                            <div key={i} className="flex items-start gap-4 relative">
                                {/* Timeline line */}
                                {i < activeReports[0].tracking.length - 1 && (
                                    <div className={cn(
                                        "absolute left-4 top-8 bottom-0 w-0.5 -mb-2",
                                        step.done ? "bg-primary/20" : "bg-slate-100"
                                    )} />
                                )}

                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-2 border-2 z-10",
                                    step.done
                                        ? "bg-primary border-primary text-white"
                                        : "bg-white border-slate-200 text-slate-300"
                                )}>
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <div className="pb-5 flex-1">
                                    <div className={cn(
                                        "text-sm font-bold",
                                        step.done ? "text-secondary" : "text-slate-300"
                                    )}>
                                        {step.label}
                                    </div>
                                    <div className="text-xs text-slate-400">{step.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Right Sidebar */}
                <div className="space-y-5">
                    {/* Quick Support */}
                    <Card className="border border-slate-200 rounded-2xl p-5 bg-secondary text-white shadow-sm">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3">QUICK SUPPORT</div>
                        <p className="text-sm text-white/80 leading-relaxed mb-4">
                            Need to update the status or provide more photos for an existing report?
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-secondary rounded-xl text-sm font-bold hover:bg-white/90 transition-all">
                            <Camera className="w-4 h-4" />
                            Add Evidence
                        </button>
                    </Card>

                    {/* Your Impact */}
                    <Card className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">YOUR IMPACT</div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                                <Droplets className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-secondary">1,240L</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">ESTIMATED WATER SAVED</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* FAB */}
            <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-white rounded-full shadow-2xl shadow-secondary/30 flex items-center justify-center hover:scale-110 transition-all active:scale-95 z-50">
                <Plus className="w-6 h-6" />
            </button>
        </div>
    );
}
