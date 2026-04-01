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
    FlaskConical,
    AlertTriangle,
    Activity,
    ChevronRight,
    MapPin,
    ShieldCheck,
    Beaker,
    FileText,
    Zap,
    Plus,
    Minus,
    Wind,
    Waves
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const qualityTrendsData = [
    { name: "MON", ph: 7.2, chlorine: 1.1 },
    { name: "TUE", ph: 7.4, chlorine: 1.2 },
    { name: "WED", ph: 7.1, chlorine: 1.3 },
    { name: "THU", ph: 7.3, chlorine: 1.1 },
    { name: "FRI", ph: 7.5, chlorine: 1.2 },
    { name: "SAT", ph: 7.2, chlorine: 1.4 },
    { name: "SUN", ph: 7.4, chlorine: 1.2 },
];

const hubMonitoringData = [
    { location: "Sector 12 Main", status: "Stable", lead: 2.1, nitrate: 4.5, bacteria: "ABSENT", lastSync: "2 mins ago", color: "text-success" },
    { location: "Sector 19 Grid", status: "Alert", lead: 3.8, nitrate: 8.2, bacteria: "DETECTED", lastSync: "Real-time", color: "text-danger" },
    { location: "Lajpat Reservoir", status: "Maintenance", lead: 1.5, nitrate: 3.2, bacteria: "ABSENT", lastSync: "15 mins ago", color: "text-primary" },
    { location: "Industrial Zone C", status: "Stable", lead: 4.1, nitrate: 6.8, bacteria: "ABSENT", lastSync: "4 mins ago", color: "text-success" },
];

export default function WaterQualityPage() {
    return (
        <div className="space-y-10 pb-20">
            {/* Header Layer */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Live Monitoring</span>
                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black text-secondary tracking-tighter">Water Quality Command</h1>
                </div>
            </div>

            {/* Top Row: Score & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-none bg-[#007A8A] text-white rounded-[2.5rem] p-10 shadow-2xl shadow-[#007A8A]/30 relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-8">Global Quality Score</div>
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-6xl font-black tracking-tighter">94</span>
                            <span className="text-2xl font-bold text-white/40">/100</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-primary group-hover:translate-x-1 transition-transform">
                            <Activity className="w-4 h-4" /> +2.4% from last week
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                </Card>

                <MetricCard 
                    title="Turbidity" 
                    value="0.8" 
                    unit="NTU" 
                    optimal="Below 1.0 NTU"
                    progress={80}
                    icon={Wind}
                    color="text-primary"
                    bgColor="bg-primary/5"
                />
                <MetricCard 
                    title="Chlorine Levels" 
                    value="1.2" 
                    unit="mg/L" 
                    optimal="1.0 - 1.5 mg/L"
                    progress={75}
                    icon={Beaker}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <MetricCard 
                    title="pH Balance" 
                    value="7.4" 
                    unit="pH" 
                    optimal="6.5 - 8.5 pH"
                    progress={85}
                    icon={FlaskConical}
                    color="text-success"
                    bgColor="bg-success/5"
                />
            </div>

            {/* Alert Section */}
            <Card className="border-none bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden relative border border-danger/10 group">
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-danger" />
                <CardContent className="p-10 flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                    <div className="flex gap-8 items-start">
                        <div className="w-20 h-20 rounded-3xl bg-danger/10 flex items-center justify-center border border-danger/20 shrink-0">
                            <AlertTriangle className="w-10 h-10 text-danger animate-pulse" />
                        </div>
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-2xl font-black text-secondary tracking-tight">Contamination Alert: Sector 19</h3>
                                <span className="px-3 py-1 bg-danger text-white text-[9px] font-black rounded-lg uppercase tracking-widest shadow-xl shadow-danger/20">Critical</span>
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic mb-2">Detected 14 mins ago via Sensor S-442</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                                <div className="p-6 bg-danger/5 rounded-[2rem] border border-danger/10">
                                    <div className="text-[10px] font-black text-danger uppercase tracking-widest mb-3 italic">AI Risk Prediction</div>
                                    <p className="text-sm font-bold text-secondary tracking-tight leading-relaxed">
                                        92% probability of downstream impact within 2 hours. Recommended action: Emergency line flush.
                                    </p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex justify-between items-center group-hover:bg-white transition-colors">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Pollutant Detected</div>
                                        <div className="text-lg font-black text-secondary">Coliform Bacteria (Trace)</div>
                                    </div>
                                    <Button className="h-12 px-6 bg-danger hover:bg-danger/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-danger/20 scale-100 active:scale-95 transition-all">Take Action</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Distribution Hub Monitoring Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden p-10 h-full">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-secondary tracking-tighter">Distribution Hub Monitoring</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Real-time localized quality metrics</p>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black text-secondary/60 hover:text-primary uppercase tracking-widest gap-2">View All Hubs <ChevronRight className="w-4 h-4" /></Button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                        <th className="pb-6 text-left">Hub Location</th>
                                        <th className="pb-6 text-left">Status</th>
                                        <th className="pb-6 text-center">Lead (ppb)</th>
                                        <th className="pb-6 text-center">Nitrate (mg/L)</th>
                                        <th className="pb-6 text-center">Bacteria</th>
                                        <th className="pb-6 text-right">Last Sync</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {hubMonitoringData.map((hub, i) => (
                                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                            <td className="py-6 font-black text-secondary tracking-tight italic">{hub.location}</td>
                                            <td className="py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-2 h-2 rounded-full", hub.color.replace('text-', 'bg-'))} />
                                                    <span className={cn("text-xs font-black tracking-tight", hub.color)}>{hub.status}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-center font-bold text-slate-500">{hub.lead}</td>
                                            <td className="py-6 text-center font-bold text-slate-500">{hub.nitrate}</td>
                                            <td className="py-6 text-center">
                                                <span className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border", hub.bacteria === "ABSENT" ? "bg-success/10 text-success border-success/20" : "bg-danger/10 text-danger border-danger/20")}>
                                                    {hub.bacteria}
                                                </span>
                                            </td>
                                            <td className="py-6 text-right text-xs font-bold text-slate-400 italic">{hub.lastSync}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                {/* Direct Command Column */}
                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2.5rem] bg-white flex-1 p-10 flex flex-col justify-between">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10 italic">Direct Command</div>
                        <div className="space-y-4">
                            <CommandButton icon={Beaker} label="Request Manual Sample" color="hover:bg-primary hover:text-white" />
                            <CommandButton icon={AlertTriangle} label="Trigger Emergency Flush" color="text-danger bg-danger/5 hover:bg-danger hover:text-white border-danger/10" />
                            <CommandButton icon={FileText} label="Generate Quality Report" color="text-secondary bg-secondary/5 hover:bg-secondary hover:text-white" />
                        </div>
                    </Card>

                    {/* Mini Map Widget */}
                    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden h-[320px] relative border border-slate-100 group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-40 transition-transform duration-[20s] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                        
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                            <h4 className="text-xs font-black text-secondary uppercase tracking-widest group-hover:translate-x-1 transition-transform">Sampling Points</h4>
                            <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black rounded-lg uppercase tracking-widest border border-success/20">Live View</span>
                        </div>

                        {/* Mock Map Nodes */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <MapNode x="-25%" y="-15%" color="bg-primary" active />
                            <MapNode x="10%" y="20%" color="bg-danger" active ping />
                            <MapNode x="35%" y="-30%" color="bg-primary" />
                            
                            {/* Precision Detail Card Mock */}
                            <div className="absolute top-[40%] right-10 bg-slate-900 text-white p-5 rounded-2xl shadow-3xl scale-75 origin-right border border-white/10 z-20">
                                <div className="text-[8px] font-black tracking-[0.2em] text-primary mb-3">Node #992</div>
                                <div className="text-xs font-black mb-1 italic">pH: 7.2 | Cl: 1.1</div>
                                <div className="text-[9px] font-bold text-success uppercase">Status: OK</div>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 z-10">
                            <div className="bg-white/80 backdrop-blur-md p-5 rounded-[1.5rem] border border-white flex items-center justify-between shadow-lg">
                                <div>
                                    <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Active Sensors</div>
                                    <div className="flex gap-1.5">
                                        {[1,2,3].map(s => <div key={s} className="w-2 h-2 rounded-full bg-primary/40" />)}
                                        <span className="text-[10px] font-black text-secondary">+42</span>
                                    </div>
                                </div>
                                <button className="text-[9px] font-black text-primary underline underline-offset-4 uppercase tracking-[0.15em] hover:text-black transition-colors">Manage Grid</button>
                            </div>
                        </div>

                        {/* Map Zoom Controls Mock */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                            <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-md"><Plus className="w-5 h-5"/></button>
                            <button className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all shadow-md"><Minus className="w-5 h-5"/></button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Row: Trends & Assets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white p-10 h-full">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-2xl font-black text-secondary tracking-tighter">7-Day Quality Trends</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Aggregated parameters for the metropolitan region</p>
                            </div>
                            <div className="flex gap-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#007A8A]" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">pH Level</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]/40" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest italic">Chlorine</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-[350px] w-full pt-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={qualityTrendsData} barGap={12}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                                        dy={20}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        cursor={{ fill: '#f1f5f9' }}
                                        contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="ph" fill="#007A8A" radius={[8, 8, 0, 0]} barSize={40} />
                                    <Bar dataKey="chlorine" fill="#E2E8F0" radius={[8, 8, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-4">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-[#E8F1F3]/50 p-10 h-full flex flex-col group border border-white">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-sm font-black text-secondary uppercase tracking-[0.2em] italic">Source Integrity</h3>
                            <ShieldCheck className="w-6 h-6 text-[#007A8A]" />
                        </div>
                        <div className="space-y-12">
                            <SourceMetric title="Yamuna Treatment Plant" count="02" progress={100} />
                            <SourceMetric title="Upper Ganga Canal" count="01" progress={90} />
                        </div>

                        <div className="mt-auto pt-12">
                            <div className="p-6 bg-white rounded-[2rem] border border-white shadow-sm flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <Waves className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">Reservoir Load</div>
                                    <div className="text-2xl font-black text-secondary tracking-tighter italic">98.4%</div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, unit, optimal, progress, icon: Icon, color, bgColor }: any) {
    return (
        <Card className="border-none bg-white rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/40 relative group hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-4xl font-black text-secondary tracking-tighter">{value}</span>
                        <span className="text-xs font-bold text-slate-400">{unit}</span>
                    </div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{title}</div>
                </div>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border border-slate-50 transition-transform group-hover:rotate-12 group-hover:scale-110", bgColor)}>
                    <Icon className={cn("w-7 h-7", color)} />
                </div>
            </div>
            <div className="space-y-5 relative z-10">
                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-50 shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn("h-full rounded-full shadow-lg", color.replace('text-', 'bg-'))}
                    />
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Optimal: <span className="text-secondary">{optimal}</span></div>
            </div>
        </Card>
    );
}

function CommandButton({ icon: Icon, label, color }: any) {
    return (
        <button className={cn("w-full h-20 rounded-[2rem] border border-slate-50 bg-slate-50 p-6 flex items-center gap-6 group/btn transition-all duration-300", color)}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-100/50 group-hover/btn:scale-110 group-hover/btn:rotate-6 transition-transform">
                <Icon className="w-5 h-5 transition-colors" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.15em] italic">{label}</span>
        </button>
    );
}

function MapNode({ x, y, color, active, ping }: any) {
    return (
        <div 
            style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
        >
            <div className="relative">
                {ping && <div className={cn("absolute -inset-4 rounded-full animate-ping opacity-20", color)} />}
                <div className={cn("w-3.5 h-3.5 rounded-full border-2 border-white shadow-xl transition-transform duration-300 hover:scale-[2]", color, active ? "opacity-100" : "opacity-40 grayscale")} />
            </div>
        </div>
    );
}

function SourceMetric({ title, count, progress }: any) {
    return (
        <div className="space-y-5">
            <div className="flex justify-between items-end">
                <div>
                    <div className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 italic">{count} SOURCES</div>
                    <div className="text-sm font-black text-secondary tracking-tight">{title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="h-2 w-full bg-slate-100/50 rounded-full overflow-hidden border border-white shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-secondary rounded-full shadow-md"
                />
            </div>
        </div>
    );
}
