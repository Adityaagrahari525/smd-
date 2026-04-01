"use client";

import * as React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { 
    Droplets, 
    Clock, 
    ShieldCheck, 
    FlaskConical,
    Search,
    Bell,
    Settings,
    ChevronRight,
    Zap,
    Users,
    Sparkles,
    Timer
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const leakageData = [
    { name: "1", active: 40, repaired: 24 },
    { name: "2", active: 30, repaired: 13 },
    { name: "3", active: 20, repaired: 98 },
    { name: "4", active: 27, repaired: 39 },
    { name: "5", active: 18, repaired: 48 },
    { name: "6", active: 23, repaired: 38 },
    { name: "7", active: 34, repaired: 43 },
    { name: "8", active: 45, repaired: 20 },
    { name: "9", active: 55, repaired: 30 },
    { name: "10", active: 48, repaired: 25 },
    { name: "11", active: 38, repaired: 15 },
    { name: "12", active: 28, repaired: 10 },
    { name: "13", active: 18, repaired: 5 },
    { name: "14", active: 15, repaired: 5 },
];

const sectorDistribution = [
    { sector: "Sector 12", issues: 42, color: "bg-[#E11D48]", width: "85%" },
    { sector: "Sector 19", issues: 28, color: "bg-[#007A8A]", width: "65%" },
    { sector: "Sector 04", issues: 15, color: "bg-[#2563EB]", width: "45%" },
    { sector: "Sector 31", issues: 9, color: "bg-[#22D3EE]", width: "30%" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-2xl font-black text-secondary tracking-tight">System Analytics</h1>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#007A8A] uppercase tracking-[0.2em]">Status: Operational</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#007A8A] border-4 border-[#007A8A]/20 shadow-[0_0_12px_rgba(0,122,138,0.4)]" />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <h2 className="text-4xl font-black text-secondary tracking-tighter">System Health Overview</h2>
                    <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-100">
                        <Button variant="ghost" size="sm" className="rounded-xl h-11 px-8 text-[11px] font-black uppercase tracking-widest bg-white shadow-md text-secondary border border-transparent">Last 24 Hours</Button>
                        <Button variant="ghost" size="sm" className="rounded-xl h-11 px-8 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-secondary">Weekly View</Button>
                    </div>
                </div>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIComponent 
                    title="Water Saved" 
                    value="5.2M Gallons" 
                    change="+12%" 
                    icon={Droplets} 
                    color="text-[#007A8A]"
                    bgColor="bg-[#007A8A]/10"
                    borderColor="border-[#007A8A]"
                />
                <KPIComponent 
                    title="Avg. Repair Time" 
                    value="2.1 hrs" 
                    change="-45m" 
                    icon={Timer} 
                    color="text-[#2563EB]"
                    bgColor="bg-[#2563EB]/10"
                    borderColor="border-[#2563EB]"
                />
                <KPIComponent 
                    title="Infra Reliability" 
                    value="99.4%" 
                    change="Stable" 
                    icon={ShieldCheck} 
                    color="text-[#22D3EE]"
                    bgColor="bg-[#22D3EE]/10"
                    borderColor="border-[#22D3EE]"
                />
                <KPIComponent 
                    title="Quality Index" 
                    value="92/100" 
                    change="Excellent" 
                    icon={FlaskConical} 
                    color="text-[#E11D48]"
                    bgColor="bg-[#E11D48]/10"
                    borderColor="border-[#E11D48]"
                    hasDot
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Leakage Trends Bar Chart */}
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden p-8 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-secondary tracking-tight">Leakage Trends</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Daily system flow variance (Liters)</p>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#007A8A]" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">Active Leaks</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">Repaired</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 w-full pt-4 min-h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={leakageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis hide dataKey="name" />
                                    <YAxis hide />
                                    <Tooltip 
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '1.5rem', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="active" stackId="a" fill="#007A8A" radius={[4, 4, 0, 0]} barSize={24} />
                                    <Bar dataKey="repaired" stackId="a" fill="#2563EB" radius={[0, 0, 4, 4]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Sector Distribution List */}
                <div className="lg:col-span-4">
                    <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-8 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-black text-secondary tracking-tight mb-10">Sector Distribution</h3>
                            <div className="space-y-8">
                                {sectorDistribution.map((item) => (
                                    <div key={item.sector} className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-black text-secondary italic tracking-tight">{item.sector}</span>
                                            <span className={cn("text-xs font-black tracking-tight", item.issues > 30 ? "text-danger" : "text-secondary")}>
                                                {item.issues < 10 ? `0${item.issues}` : item.issues} Issues
                                            </span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-50/50 rounded-full overflow-hidden border border-slate-50">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: item.width }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className={cn("h-full rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)]", item.color)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button variant="outline" className="w-full h-14 rounded-2xl mt-12 text-[10px] font-black uppercase tracking-widest border-slate-100 hover:bg-slate-50 transition-all hover:shadow-md">
                            View Detailed Map Distribution
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Bottom Section - Efficiency and AI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-8 group hover:shadow-2xl transition-all duration-500">
                        <div className="flex flex-col gap-8">
                            <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Response Efficiency</h4>
                            <div className="flex items-center gap-8">
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors border border-slate-100/50">
                                    <Zap className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fastest Fix</p>
                                    <div className="text-3xl font-black text-secondary tracking-tighter">14 Mins</div>
                                    <div className="h-1.5 w-16 bg-primary rounded-full shadow-[0_2px_8px_rgba(0,122,138,0.3)]" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-8 group hover:shadow-2xl transition-all duration-500">
                        <div className="flex items-center gap-8 h-full">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-secondary/5 transition-colors border border-slate-100/50">
                                <Users className="w-8 h-8 text-secondary" />
                            </div>
                            <div className="space-y-1.5 flex-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Teams</p>
                                <div className="text-3xl font-black text-secondary tracking-tighter">18 Crews</div>
                                <div className="h-1.5 w-16 bg-secondary rounded-full shadow-[0_2px_8px_rgba(10,25,47,0.2)]" />
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <Card className="border-none bg-slate-900 text-white rounded-[2.5rem] p-9 relative overflow-hidden group shadow-2xl shadow-slate-900/40 h-full">
                        {/* Spark Icon */}
                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="p-2 bg-primary/20 rounded-lg">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-black italic tracking-tight">AI Predictive Anomalies</h3>
                        </div>

                        {/* Alert Card inside AI widget */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 relative z-10 overflow-hidden backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-5">
                                <div className="text-[10px] font-black text-primary uppercase tracking-widest tracking-[0.15em]">Potential Burst: Sector 12</div>
                                <span className="px-3 py-1 bg-danger/20 text-danger text-[9px] font-black rounded-lg uppercase tracking-widest border border-danger/20">High Risk</span>
                            </div>
                            <p className="text-xs font-bold text-white/70 leading-relaxed italic">
                                Pressure variance detected in Main Line B-14. Predicted failure within 48-72 hours. Immediate inspection recommended.
                            </p>
                        </div>

                        {/* Decorative Background for AI card */}
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/30 blur-[80px] rounded-full animate-pulse" />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function KPIComponent({ title, value, change, icon: Icon, color, bgColor, borderColor, hasDot = false }: {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
    hasDot?: boolean;
}) {
    return (
        <Card className={cn("border-none border-b-4 bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 p-10 overflow-hidden relative group transition-all duration-300 hover:-translate-y-1", borderColor && "border-b-[6px]")}>
            <div className={cn("absolute bottom-0 left-0 w-full h-[6px]", borderColor.replace('border-', 'bg-'))} />
            
            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", bgColor, "shadow-inner")}>
                    <Icon className={cn("w-7 h-7", color)} />
                </div>
                <div className={cn("flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/20", bgColor)}>
                    <span className={cn("text-[9px] font-black uppercase tracking-widest", color)}>{change}</span>
                    {hasDot && <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />}
                </div>
            </div>

            <div className="space-y-1 relative z-10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
                <div className="text-3xl font-black text-secondary tracking-tighter">{value}</div>
            </div>
        </Card>
    );
}
