"use client";

import * as React from "react";
import { 
    FileText, 
    Download, 
    Mail, 
    ChevronRight, 
    Plus, 
    Calendar, 
    Database, 
    Search,
    ShieldCheck,
    Sparkles,
    AlertCircle,
    FileSpreadsheet,
    FileDown,
    Activity,
    Filter,
    ArrowUpRight,
    MapPin
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const reportHistory = [
    { type: "Oct_2023_Monthly_Audit.pdf", date: "Oct 31, 2023", generatedBy: "System Auto-Gen", size: "4.2 MB", icon: FileText, color: "text-primary" },
    { type: "Emergency_Response_Analysis_S14.pdf", date: "Oct 28, 2023", generatedBy: "Admin Profile", size: "1.8 MB", icon: AlertCircle, color: "text-danger" },
    { type: "Q3_Safety_Compliance.pdf", date: "Oct 15, 2023", generatedBy: "System Auto-Gen", size: "12.5 MB", icon: FileText, color: "text-primary" },
];

const aiSummaries = [
    { tag: "CRITICAL RESOLVED", time: "2 hours ago", title: "Mainline Burst in Sector 14", description: "System detected a 40% pressure drop at 04:12 AM. Rapid response team isolated the valve by 04:45 AM. Full restoration achieved in 1.5hrs. Impact localized to 4 blocks.", variant: "danger" },
    { tag: "ROUTINE UPDATE", time: "Yesterday", title: "Weekly Purity Benchmarking", description: "Fluoride levels in South Zone trended -5% below seasonal average, suggesting improved filtration efficiency at the K-9 Treatment Plant.", variant: "primary" },
];

export default function ReportsPage() {
    return (
        <div className="space-y-12 pb-24">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-secondary tracking-tighter italic">Reports & Compliance</h1>
                    <p className="text-sm font-bold text-slate-400 max-w-xl leading-relaxed italic">
                        Centralized regulatory monitoring and automated data distillation for the JalSuraksha ecosystem.
                    </p>
                </div>
                <Button className="h-16 px-10 bg-[#007A8A] hover:bg-[#00606D] text-white rounded-[1.25rem] font-black uppercase tracking-widest gap-4 shadow-2xl shadow-[#007A8A]/20 transition-all hover:scale-[1.03] active:scale-95 shrink-0">
                    <Plus className="w-5 h-5" /> Generate Custom Report
                </Button>
            </div>

            {/* Top Grid: Health & AI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Regulatory Health Card */}
                <div className="lg:col-span-12 xl:col-span-5">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden p-10 h-full relative group border border-slate-50">
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-[10px] font-black text-[#007A8A] uppercase tracking-[0.25em] mb-12 italic border-b border-slate-50 pb-4 inline-block w-fit">Regulatory Health</div>
                            
                            <div className="space-y-2 mb-12">
                                <h1 className="text-4xl font-black text-secondary tracking-tight italic">BSI Standard Compliance</h1>
                                <p className="text-xs font-bold text-slate-400 leading-relaxed italic">Real-time alignment with National Water Safety protocols (IS 10500:2012).</p>
                            </div>

                            <div className="flex items-baseline gap-4 mb-20">
                                <span className="text-8xl font-black text-secondary tracking-tighter italic">98%</span>
                                <div className="flex items-center gap-1.5 text-sm font-black text-[#007A8A] animate-pulse">
                                    <ArrowUpRight className="w-5 h-5" /> 1.2%
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mt-auto">
                                <SmallMetric label="PURITY INDEX" value="99.4%" />
                                <SmallMetric label="PRESSURE STABILITY" value="96.8%" />
                            </div>
                        </div>

                        {/* Decorative HUD Graphics */}
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-[10s]">
                            <svg viewBox="0 0 200 200" className="w-full h-full fill-secondary">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
                                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </Card>
                </div>

                {/* AI Incident Summaries */}
                <div className="lg:col-span-12 xl:col-span-7">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] bg-slate-50/50 p-10 h-full border border-white">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                                    <Sparkles className="w-5 h-5 text-[#007A8A]" />
                                </div>
                                <h3 className="text-2xl font-black text-secondary tracking-tight italic">AI Incident Summaries</h3>
                            </div>
                            <Button variant="ghost" className="text-[10px] font-black text-slate-400 hover:text-[#007A8A] uppercase tracking-widest gap-2">View All Intelligence</Button>
                        </div>

                        <div className="space-y-8">
                            {aiSummaries.map((summary, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ x: 20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:shadow-2xl transition-all"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4">
                                            <span className={cn("px-3 py-1 text-[9px] font-black rounded-lg uppercase tracking-widest", summary.variant === 'danger' ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary")}>
                                                {summary.tag}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-300 italic">{summary.time}</span>
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-black text-secondary tracking-tight mb-3 italic">{summary.title}</h4>
                                    <p className="text-sm font-bold text-slate-500 leading-relaxed italic">{summary.description}</p>
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1.5", summary.variant === 'danger' ? "bg-danger" : "bg-primary")} />
                                </motion.div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Middle Grid: Audit & Export */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                        <Activity className="w-6 h-6 text-secondary" />
                        <h3 className="text-2xl font-black text-secondary tracking-tight italic uppercase">Automated Audit Reports</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                        <AuditCard icon={Calendar} title="Monthly Municipal Audit" desc="Complete overview of consumption, revenue, and infrastructure health for October." color="text-primary" />
                        <AuditCard icon={MapPin} title="Quarterly Safety Report" desc="Formal compliance documentation for WHO and National safety parameters." color="text-danger" />
                    </div>
                </div>

                <div className="lg:col-span-12 xl:col-span-4">
                    <Card className="border-none bg-[#00606D] text-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-900/40 relative overflow-hidden group h-full">
                        <div className="relative z-10 flex flex-col h-full">
                            <h3 className="text-3xl font-black italic tracking-tight mb-12">Data Export Center</h3>
                            
                            <div className="space-y-10 flex-1">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Select Dataset</label>
                                    <div className="relative">
                                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl h-16 px-6 text-sm font-bold appearance-none hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 ring-white/20">
                                            <option className="bg-secondary">Leakage & Pressure Logs</option>
                                            <option className="bg-secondary">Water Quality Trends</option>
                                        </select>
                                        <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40 rotate-90" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Date Range</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-xs font-bold placeholder:text-white/20" />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                                        </div>
                                        <div className="relative">
                                            <input type="text" placeholder="mm/dd/yyyy" className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 px-6 text-xs font-bold placeholder:text-white/20" />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Format</label>
                                    <div className="flex gap-4">
                                        {['CSV', 'XLSX', 'PDF'].map((f) => (
                                            <button key={f} className={cn("flex-1 h-14 rounded-xl border border-white/10 text-[10px] font-black tracking-widest transition-all hover:bg-white/10", f === 'CSV' ? "bg-white text-[#00606D]" : "")}>
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full h-20 mt-12 bg-white hover:bg-white/90 text-[#00606D] rounded-2xl font-black uppercase tracking-widest gap-4 shadow-3xl active:scale-95 transition-all">
                                Process Export
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Row: History Table */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden border border-slate-50">
                <CardContent className="p-12">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-3xl font-black text-secondary tracking-tighter italic uppercase">Report History</h3>
                        <div className="flex gap-4">
                            <Button variant="outline" className="h-12 rounded-xl px-8 text-[10px] font-black uppercase tracking-widest border-slate-200 italic">Filter</Button>
                            <Button variant="outline" className="h-12 rounded-xl px-8 text-[10px] font-black uppercase tracking-widest border-slate-200 italic">Sort</Button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    <th className="pb-8 text-left">Report Type</th>
                                    <th className="pb-8 text-left">Generation Date</th>
                                    <th className="pb-8 text-left">Generated By</th>
                                    <th className="pb-8 text-left">Size</th>
                                    <th className="pb-8 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {reportHistory.map((report, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-8">
                                            <div className="flex items-center gap-4">
                                                <div className={cn("p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm transition-colors group-hover:bg-white", report.color)}>
                                                    <report.icon className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-black text-secondary italic tracking-tight">{report.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <span className="text-xs font-bold text-slate-500 italic uppercase">{report.date}</span>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
                                                    <Activity className="w-4 h-4 text-slate-400" />
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 italic">{report.generatedBy}</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-xs font-black text-slate-400 tracking-tight italic uppercase">{report.size}</td>
                                        <td className="py-8 text-right">
                                            <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl text-slate-400 hover:text-[#007A8A] hover:bg-[#007A8A]/5 transition-all">
                                                <Download className="w-5 h-5" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-slate-50 rounded-[1.5rem] p-8 border border-slate-100/50 group-hover:bg-white transition-colors">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 italic">{label}</div>
            <div className="text-2xl font-black text-secondary tracking-tighter italic">{value}</div>
        </div>
    );
}

function AuditCard({ icon: Icon, title, desc, color }: { icon: any; title: string; desc: string; color: string }) {
    return (
        <Card className="border-none shadow-xl shadow-slate-200/40 rounded-[2rem] bg-white p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500 border border-slate-50">
            <div>
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shrink-0 shadow-inner group-hover:rotate-6 transition-transform bg-slate-50 border border-slate-100", color)}>
                    <Icon className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-black text-secondary tracking-tight mb-4 italic uppercase">{title}</h4>
                <p className="text-sm font-bold text-slate-500 leading-relaxed mb-10 italic">{desc}</p>
            </div>
            <div className="flex gap-4">
                <Button className="flex-1 h-14 bg-slate-50 hover:bg-secondary hover:text-white text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 transition-all active:scale-95">
                    Download PDF
                </Button>
                <Button variant="outline" size="icon" className="w-14 h-14 rounded-xl border-slate-100 text-slate-400 hover:bg-primary/5 transition-all">
                    <Mail className="w-5 h-5" />
                </Button>
            </div>
        </Card>
    );
}
