"use client";

import * as React from "react";
import { 
    Cpu, 
    Droplet, 
    Zap, 
    ShieldCheck, 
    Activity, 
    ChevronRight, 
    Search,
    MapPin,
    Plus,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Wrench,
    Users,
    Settings,
    MoreVertical,
    Database,
    Wifi,
    AlertTriangle,
    TrendingUp,
    Download
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

const healthTrendData = [
    { name: "Mon", health: 92 },
    { name: "Tue", health: 94 },
    { name: "Wed", health: 91 },
    { name: "Thu", health: 95 },
    { name: "Fri", health: 93 },
    { name: "Sat", health: 94 },
    { name: "Sun", health: 96 },
];

const maintenanceBoard = [
    { task: "Pump Calibration", location: "Sector 14 Hub", status: "In-Progress", crew: "Alpha Team", priority: "High", due: "1.5h left" },
    { task: "Valve Replacement", location: "Mira Road Mainline", status: "Scheduled", crew: "Gamma Crew", priority: "Medium", due: "Tomorrow" },
    { task: "Pressure Test", location: "Industrial Zone C", status: "Delayed", crew: "Delta Unit", priority: "High", due: "Immediate" },
];

const assetInventory = [
    { type: "Pump Station", name: "PS-842 (Mira Bhayandar)", status: "Optimal", health: 98, load: "75%", lastCheck: "2 days ago" },
    { type: "Reservoir", name: "Sector 12 (Main Tower)", status: "Warning", health: 65, load: "92%", lastCheck: "Today" },
    { type: "Mainline", name: "Grid-A1 (North Artery)", status: "Optimal", health: 92, load: "45%", lastCheck: "5 days ago" },
];

export default function InfrastructurePage() {
    return (
        <div className="space-y-10 pb-24 relative">
            {/* Header / Topbar is handled by Administrative layout - only content here */}
            <div className="mb-10 block lg:hidden px-4">
                <h1 className="text-3xl font-black text-secondary tracking-tight">Infrastructure</h1>
            </div>

            {/* KPI Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-0">
                <AssetKPI 
                    label="PUMPS" 
                    value="85%" 
                    status="Operational" 
                    icon={Cpu} 
                    color="text-primary" 
                    bgColor="bg-primary/5"
                />
                <AssetKPI 
                    label="MAINLINES" 
                    value="92%" 
                    status="Clean" 
                    icon={Droplet} 
                    color="text-blue-500" 
                    bgColor="bg-blue-50"
                />
                <AssetKPI 
                    label="RESERVOIRS" 
                    value="98%" 
                    status="Optimal" 
                    icon={Database} 
                    color="text-cyan-500" 
                    bgColor="bg-cyan-50"
                />
                <AssetKPI 
                    label="SENSORS" 
                    value="76%" 
                    status="Checking" 
                    icon={Wifi} 
                    color="text-orange-500" 
                    bgColor="bg-orange-50"
                />
            </div>

            {/* Middle Section: Map and AI Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Asset Distribution Map */}
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl sm:rounded-[2.5rem] bg-white overflow-hidden p-6 sm:p-8 h-full border border-slate-50">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <h3 className="text-xl sm:text-2xl font-black text-secondary tracking-tight italic">Asset Distribution</h3>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <MapLegend label="Healthy" color="bg-primary" />
                                <MapLegend label="Warning" color="bg-orange-500" />
                                <MapLegend label="Critical" color="bg-danger" />
                            </div>
                        </div>

                        {/* Mock Map Grid */}
                        <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-slate-100 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-200 group">
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <svg width="100%" height="100%">
                                    <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
                                    </pattern>
                                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                                </svg>
                            </div>

                            {/* Map Markers */}
                            <MapMarker x="40%" y="30%" color="bg-primary" />
                            <MapMarker x="65%" y="45%" color="bg-danger" />
                            <MapMarker x="50%" y="70%" color="bg-orange-500" />
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-transparent pointer-events-none" />
                        </div>
                    </Card>
                </div>

                {/* Predictive AI Alerts */}
                <div className="lg:col-span-4">
                    <Card className="border-none bg-secondary text-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 h-full shadow-2xl shadow-slate-900/30 relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-xl sm:text-2xl font-black italic tracking-tight mb-4">Predictive AI</h3>
                            <p className="text-[10px] font-bold text-white/50 mb-8 leading-relaxed uppercase tracking-widest italic">Neural analysis identifies 2 critical assets at risk of failure.</p>
                            
                            <div className="space-y-4 sm:space-y-6 flex-grow">
                                <AIAlert 
                                    title="Mainline B-12" 
                                    desc="Pressure oscillation detected. 89% risk."
                                    icon={AlertTriangle}
                                />
                                <AIAlert 
                                    title="Pump Unit 098" 
                                    desc="Heat signature exceeds baseline. Bearing failure."
                                    icon={TrendingUp}
                                />
                            </div>

                            <Button className="w-full h-14 sm:h-16 mt-8 sm:mt-10 bg-white hover:bg-slate-50 text-secondary rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-xs">
                                View Intelligence Report
                            </Button>
                        </div>
                        {/* Decorative Background Element */}
                        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-white/5 rounded-full blur-[60px]" />
                    </Card>
                </div>
            </div>

            {/* Bottom Row: Maintenance & Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Upcoming Maintenance List */}
                <div className="lg:col-span-4">
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white p-10 border border-slate-50">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black text-secondary tracking-tight italic">Upcoming Maintenance</h3>
                            <button className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic border-b border-primary/20 pb-1">View Calendar</button>
                        </div>
                        
                        <div className="space-y-6">
                            <MaintenanceItem 
                                day="24" 
                                month="OCT" 
                                task="PUMP-04 Refurbish" 
                                crew="Alpha Team Assigned" 
                                status="SCHEDULED" 
                                statusColor="bg-primary/10 text-primary"
                            />
                            <MaintenanceItem 
                                day="21" 
                                month="OCT" 
                                task="Sensor Hub 12" 
                                crew="Maintenance Overdue" 
                                status="OVERDUE" 
                                statusColor="bg-danger/10 text-danger"
                                highlight
                            />
                            <MaintenanceItem 
                                day="26" 
                                month="OCT" 
                                task="Mainline Scouring" 
                                crew="Gamma Services" 
                                status="SCHEDULED" 
                                statusColor="bg-primary/10 text-primary"
                            />
                        </div>
                    </Card>
                </div>

                {/* Asset Inventory Table */}
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-3xl sm:rounded-[2.5rem] bg-white overflow-hidden p-6 sm:p-10 border border-slate-50 relative group">
                        <div className="flex items-center justify-between mb-8 sm:mb-10">
                            <h3 className="text-xl sm:text-2xl font-black text-secondary tracking-tight italic">Inventory</h3>
                            <div className="flex gap-2 sm:gap-4">
                                <Button variant="outline" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-slate-100 text-slate-400">
                                    <Filter className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" size="icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-slate-100 text-slate-400">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-x-auto -mx-6 sm:mx-0">
                            <div className="min-w-max px-6 sm:px-0">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <th className="pb-6 text-left pr-8">Asset ID</th>
                                            <th className="pb-6 text-left pr-8">Type</th>
                                            <th className="pb-6 text-left pr-8">Installed</th>
                                            <th className="pb-6 text-left pr-8 whitespace-nowrap">Last Check</th>
                                            <th className="pb-6 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        <AssetRow id="PUMP-9801" type="Heavy Pump" date="Jan 2021" last="Aug 2023" status="STABLE" color="bg-primary/10 text-primary" />
                                        <AssetRow id="LINE-B12" type="Mainline" date="Mar 2018" last="Sep 2023" status="CRITICAL" color="bg-danger/10 text-danger" />
                                        <AssetRow id="RES-DELTA" type="Reservoir" date="Dec 2015" last="Jul 2023" status="STABLE" color="bg-primary/10 text-primary" />
                                        <AssetRow id="SNS-442" type="Sensor" date="Jun 2023" last="None" status="WARNING" color="bg-orange-500/10 text-orange-500" />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="fixed bottom-6 right-6 sm:bottom-12 sm:right-12 px-6 sm:px-8 h-14 sm:h-18 bg-secondary text-white rounded-2xl flex items-center gap-3 sm:gap-4 shadow-3xl shadow-slate-900/40 hover:scale-[1.05] active:scale-95 transition-all z-50 group border border-white/10">
                <div className="bg-white/20 p-2 rounded-lg group-hover:rotate-90 transition-transform">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest pr-2">Add Asset</span>
            </button>
        </div>
    );
}

function AssetKPI({ label, value, status, icon: Icon, color, bgColor }: any) {
    return (
        <Card className="border-none shadow-xl shadow-slate-200/40 bg-white rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-10 group border border-slate-50">
            <div className="flex justify-between items-start mb-6 sm:mb-10">
                <div className={cn("p-3 sm:p-4 rounded-xl shadow-inner shadow-slate-900/5", bgColor, color)}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-widest italic">{label}</span>
            </div>
            <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-secondary tracking-tighter italic">{value}</div>
                <div className={cn("text-[9px] sm:text-[10px] font-black uppercase tracking-widest", color)}>{status}</div>
            </div>
        </Card>
    );
}

function MapMarker({ x, y, color }: { x: string; y: string; color: string }) {
    return (
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ left: x, top: y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group/marker"
        >
            <div className={cn("w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse", color)} />
            <div className={cn("absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 scale-150 blur-sm pointer-events-none", color)} />
        </motion.div>
    );
}

function MapLegend({ label, color }: { label: string; color: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", color)} />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{label}</span>
        </div>
    );
}

function AIAlert({ title, desc, icon: Icon }: any) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] group hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex gap-4">
                <div className="bg-[#007A8A] p-2.5 rounded-xl shadow-sm h-fit">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h4 className="text-lg font-black tracking-tight mb-2 italic">{title}</h4>
                    <p className="text-[11px] font-bold text-white/50 leading-relaxed uppercase tracking-widest">{desc}</p>
                </div>
            </div>
        </div>
    );
}

function MaintenanceItem({ day, month, task, crew, status, statusColor, highlight }: any) {
    return (
        <div className={cn("flex gap-8 p-6 rounded-[2rem] border transition-all hover:bg-slate-50", highlight ? "border-danger/20 bg-danger/5 shadow-inner shadow-danger/5" : "border-slate-50 bg-white")}>
            <div className="flex flex-col items-center justify-center min-w-[50px]">
                <span className="text-[10px] font-black text-slate-400 italic mb-1 uppercase tracking-widest">{month}</span>
                <span className="text-3xl font-black text-secondary tracking-tighter leading-none">{day}</span>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-black text-secondary tracking-tight mb-1 italic">{task}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{crew}</p>
                <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block", statusColor)}>
                    {status}
                </span>
            </div>
        </div>
    );
}

function AssetRow({ id, type, date, last, status, color }: any) {
    return (
        <tr className="group hover:bg-slate-50/50 transition-colors">
            <td className="py-6"><span className="text-xs font-black font-mono text-slate-400">{id}</span></td>
            <td className="py-6"><span className="text-sm font-black text-secondary italic tracking-tight">{type}</span></td>
            <td className="py-6"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{date}</span></td>
            <td className="py-6"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{last}</span></td>
            <td className="py-6 text-right">
                <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest", color)}>
                    {status}
                </span>
            </td>
        </tr>
    );
}


