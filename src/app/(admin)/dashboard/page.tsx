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
    AlertCircle,
    Clock,
    Activity,
    ShieldCheck,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download,
    ChevronRight,
    Zap,
    Cpu,
    Target,
    MapPin,
    Droplets
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const chartData = [
    { time: "00:00", value: 35 },
    { time: "02:00", value: 42 },
    { time: "04:00", value: 38 },
    { time: "06:00", value: 55 },
    { time: "08:00", value: 72 },
    { time: "10:00", value: 88 },
    { time: "12:00", value: 85 },
    { time: "14:00", value: 68 },
    { time: "16:00", value: 62 },
    { time: "18:00", value: 78 },
    { time: "20:00", value: 55 },
    { time: "NOW", value: 94 },
];

const problems = [
    { type: "Mainline Leakage", location: "Worli Seaface", severity: "CRITICAL", risk: 94, time: "14m ago", icon: Droplets, color: "text-danger bg-danger/10" },
    { type: "Contamination Warning", location: "Bandra West", severity: "HIGH", risk: 78, time: "28m ago", icon: AlertCircle, color: "text-primary bg-primary/10" },
    { type: "Valve Malfunction", location: "Lower Parel", severity: "MEDIUM", risk: 42, time: "1h ago", icon: Activity, color: "text-secondary bg-secondary/10" },
    { type: "Low Pressure Report", location: "Colaba", severity: "LOW", risk: 18, time: "3h ago", icon: Zap, color: "text-slate-500 bg-slate-100" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10 pb-20">
            {/* High-Fidelity Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <h1 className="text-4xl font-black text-secondary tracking-tight">System Overview</h1>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full border border-success/20">
                            <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            <span className="text-[10px] font-black text-success uppercase tracking-widest leading-none">Status: Operational</span>
                        </div>
                    </div>
                    <p className="text-slate-400 font-bold text-sm italic">Real-time civic water authority monitoring and predictive analytics.</p>
                </div>
                <div className="flex bg-white p-1 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-50">
                    <Button variant="ghost" size="sm" className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest bg-slate-50 text-secondary">Live Grid</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-secondary italic">History</Button>
                </div>
            </div>

            {/* Top KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <KPICard 
                    label="Active Reports" 
                    value="1,284" 
                    trend="+12% Increase" 
                    trendColor="text-danger" 
                    icon={AlertCircle} 
                    iconBg="bg-secondary" 
                />
                <KPICard 
                    label="Avg Response" 
                    value="2.4" 
                    suffix="hr" 
                    trend="-14% Speed" 
                    trendColor="text-primary" 
                    icon={Clock} 
                    iconBg="bg-primary" 
                />
                <KPICard 
                    label="System Uptime" 
                    value="99.98" 
                    suffix="%" 
                    trend="Stable Flux" 
                    trendColor="text-success" 
                    icon={ShieldCheck} 
                    iconBg="bg-success" 
                />
                <KPICard 
                    label="Infra Health" 
                    value="Optimal" 
                    isTextValue 
                    trend="42 Sensors Active" 
                    trendColor="text-slate-400" 
                    icon={Zap} 
                    iconBg="bg-secondary" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* High-Fidelity Table */}
                <div className="lg:col-span-8">
                    <Card className="shadow-2xl shadow-slate-200/40 rounded-[3rem] bg-white overflow-hidden border-slate-100">
                        <div className="p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-white">
                            <h3 className="text-xl font-black text-secondary tracking-tight">Active Problem Feed</h3>
                            <Button variant="ghost" className="h-10 text-[10px] font-black text-primary hover:bg-primary/5 uppercase tracking-widest gap-2">
                                Manage Queue <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-10 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Type & Risk</th>
                                            <th className="px-6 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                            <th className="px-6 py-5 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                            <th className="px-10 py-5 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {problems.map((prob, i) => (
                                            <tr key={i} className="group hover:bg-slate-50/60 transition-colors">
                                                <td className="px-10 py-8">
                                                    <div className="space-y-2">
                                                        <div className="text-sm font-black text-secondary tracking-tight">{prob.type}</div>
                                                        <div className="flex items-center gap-3 w-28">
                                                            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                                                                <div className={cn("h-full", prob.risk > 80 ? "bg-danger" : "bg-primary")} style={{ width: `${prob.risk}%` }} />
                                                            </div>
                                                            <span className="text-[9px] font-black text-slate-300">{prob.risk}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-8">
                                                    <div className="flex gap-2 items-center">
                                                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                                        <div className="text-sm font-bold text-slate-500 tracking-tight">{prob.location}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-8 text-center">
                                                    <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100/50", prob.color)}>
                                                        {prob.severity}
                                                    </span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="text-xs font-black text-slate-400 italic font-mono">{prob.time}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column Layout */}
                <div className="lg:col-span-4 space-y-10">
                    {/* System Load Chart */}
                    <Card className="shadow-2xl shadow-slate-200/40 rounded-[3rem] bg-white p-8 group border-slate-100">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-lg font-black text-secondary tracking-tight">System Load</h4>
                            <div className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">Active 24h</div>
                        </div>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={16}>
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.time === "NOW" ? "#9B1B1B" : entry.value > 80 ? "#007A8A" : "#f1f5f9"}
                                                className="transition-all duration-500 hover:opacity-80"
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-6 flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            <span>00:00</span>
                            <span className="text-slate-400 font-black">12:00 MID</span>
                            <span>NOW</span>
                        </div>
                    </Card>

                    {/* AI Prediction Card Refined */}
                    <Card className="rounded-[3rem] bg-slate-900 text-white p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(15,23,42,0.3)] border-white/10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,138,0.2)_0%,transparent_70%)]" />
                        
                        <div className="relative z-10 flex flex-col h-full space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/20 rounded-xl">
                                    <Target className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-xl font-black italic text-white tracking-tight leading-tight uppercase">
                                    AI Engine
                                </h3>
                            </div>
                            
                            <p className="text-sm font-bold text-white/50 leading-relaxed italic">
                                Predictive modeling suggests a <span className="text-primary font-black underline decoration-primary/30 decoration-2">78% probability</span> of main-line stress in the Juhu sector.
                            </p>
                            
                            <Button className="w-full h-14 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] gap-3 border border-white/10 shadow-xl transition-all group">
                                Run Full Simulation <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function KPICard({ label, value, suffix, trend, trendColor, icon: Icon, iconBg, isTextValue = false }: any) {
    return (
        <Card className="shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden group border-slate-100">
            <CardContent className="p-8">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-y-1">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</h4>
                        <div className={cn(
                            "font-black tracking-tighter leading-none", 
                            isTextValue ? "text-2xl uppercase italic text-secondary pt-1" : "text-4xl text-secondary"
                        )}>
                            {value}
                            {!isTextValue && suffix && <span className="text-base ml-1 font-bold text-slate-300">{suffix}</span>}
                        </div>
                    </div>
                    <div className={cn("w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110", iconBg)}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>
                <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", trendColor)}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30 animate-pulse" />
                    {trend}
                </div>
            </CardContent>
        </Card>
    );
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function Cloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19c3.037 0 5.5-2.463 5.5-5.5 0-2.799-2.083-5.11-4.812-5.444C17.75 4.88 15.112 3 12 3 8.888 3 6.25 4.88 5.312 8.056 2.583 8.39 0.5 10.701 0.5 13.5 0.5 16.537 2.963 19 6 19h11.5z" />
    </svg>
  )
}
