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
    Droplets,
    ThumbsUp,
    MessageSquare,
    Plus,
    CheckCircle2,
    CheckCircle,
    X as XIcon,
    Navigation
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useIssues } from "@/hooks/useIssues";

interface AssignmentFormData {
    assignedTeam: string;
    estimatedTime: string;
    status: "Pending" | "In Progress" | "Resolved";
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

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
    const { issues, editIssue, addReport, loading } = useIssues();
    const [selectedIssue, setSelectedIssue] = React.useState<any>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState<AssignmentFormData>({
        assignedTeam: "",
        estimatedTime: "",
        status: "Pending",
        severity: "MEDIUM"
    });

    const openAssignmentModal = (issue: any) => {
        setSelectedIssue(issue);
        setFormData({
            assignedTeam: issue.assignedTeam || "",
            estimatedTime: issue.estimatedTime || "",
            status: issue.status,
            severity: issue.severity
        });
        setIsModalOpen(true);
    };

    const handleSaveAssignment = async () => {
        if (!selectedIssue) return;
        
        const success = await editIssue(selectedIssue.id, {
            ...formData,
            isApproved: true,
            status: formData.status === "Pending" && formData.assignedTeam ? "In Progress" : formData.status
        });

        if (success) {
            setIsModalOpen(false);
            setSelectedIssue(null);
        }
    };

    const handleMarkAsDone = async (issue: any) => {
        const success = await editIssue(issue.id, {
            status: "Resolved",
            updatedAt: new Date().toISOString()
        });

        if (success) {
            await addReport({
                issueId: issue.id,
                title: `Resolution Report: ${issue.title}`,
                content: `Emergency response completed for ${issue.id}. Issue at ${issue.location} has been successfully resolved by the municipal maintenance team. All systems back to normal operational parameters.`,
                generatedBy: "Dashboard Control"
            });
            console.log(`[System] Issue ${issue.id} marked as resolved and report generated.`);
        }
    };

    const activeIssues = issues.filter(i => i.status !== "Resolved");
    
    // KPI Calculations
    const totalActive = activeIssues.length;
    const criticalCount = activeIssues.filter(i => i.severity === "CRITICAL").length;
    const pendingCount = activeIssues.filter(i => i.status === "Pending").length;
    const inProgressCount = activeIssues.filter(i => i.status === "In Progress").length;

    return (
        <div className="space-y-10 pb-20 relative">
            {/* Assignment Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/60 backdrop-blur-md">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            className="bg-white rounded-3xl sm:rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200/50"
                        >
                            <div className="p-6 sm:p-10 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">Assignment Command</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Issue ID: {selectedIssue?.id}</p>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-full hover:bg-slate-200/50"
                                >
                                    <XIcon className="w-5 h-5 text-slate-400" />
                                </Button>
                            </div>

                            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Side: Details */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Issue Type & Desc</label>
                                        <div className="text-sm font-bold text-secondary mb-1">{selectedIssue?.title}</div>
                                        <p className="text-xs text-slate-500 leading-relaxed italic">{selectedIssue?.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-bold text-slate-600">{selectedIssue?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-6 px-4 py-3 bg-primary/5 rounded-2xl border border-primary/10">
                                        <div className="flex items-center gap-2 text-primary">
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            <span className="text-xs font-black">{selectedIssue?.reactions?.length || 0} Supports</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-secondary">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span className="text-xs font-black">{selectedIssue?.comments?.length || 0} Comments</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Form */}
                                <div className="space-y-5">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Assigned Team</label>
                                        <input 
                                            value={formData.assignedTeam}
                                            onChange={e => setFormData({...formData, assignedTeam: e.target.value})}
                                            placeholder="e.g. Rapid Response Alpha"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Est. Time to Resolve</label>
                                        <input 
                                            value={formData.estimatedTime}
                                            onChange={e => setFormData({...formData, estimatedTime: e.target.value})}
                                            placeholder="e.g. 2 hours / 45 mins"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-secondary focus:ring-2 focus:ring-primary/20 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Status</label>
                                            <select 
                                                value={formData.status}
                                                onChange={e => setFormData({...formData, status: e.target.value as any})}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-secondary outline-none"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Resolved">Resolved</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Severity</label>
                                            <select 
                                                value={formData.severity}
                                                onChange={e => setFormData({...formData, severity: e.target.value as any})}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-secondary outline-none"
                                            >
                                                <option value="LOW">LOW</option>
                                                <option value="MEDIUM">MEDIUM</option>
                                                <option value="HIGH">HIGH</option>
                                                <option value="CRITICAL">CRITICAL</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-10 bg-slate-50/50 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-success" />
                                    <span className="text-[9px] font-black text-success uppercase tracking-widest">Authorized Command</span>
                                </div>
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 sm:flex-none h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400"
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        onClick={handleSaveAssignment}
                                        className="flex-1 sm:flex-none h-12 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-secondary/20"
                                    >
                                        Save & Dispatch
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
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
                    value={totalActive} 
                    trend={criticalCount > 0 ? `${criticalCount} Critical` : "Clear Status"} 
                    trendColor={criticalCount > 0 ? "text-danger" : "text-success"} 
                    icon={AlertCircle} 
                    iconBg="bg-secondary" 
                />
                <KPICard 
                    label="Pending Review" 
                    value={pendingCount} 
                    trend={`${Math.round((pendingCount/Math.max(issues.length, 1))*100)}% of total`} 
                    trendColor="text-primary" 
                    icon={Clock} 
                    iconBg="bg-primary" 
                />
                <KPICard 
                    label="In Dispatch" 
                    value={inProgressCount} 
                    trend="Teams Active" 
                    trendColor="text-success" 
                    icon={ShieldCheck} 
                    iconBg="bg-success" 
                />
                <KPICard 
                    label="System Pulse" 
                    value={totalActive > 10 ? "Heavy" : "Normal"} 
                    isTextValue 
                    trend={`${issues.length} Lifetime`} 
                    trendColor="text-slate-400" 
                    icon={Zap} 
                    iconBg="bg-secondary" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* High-Fidelity Table */}
                <div className="lg:col-span-8">
                    <Card className="shadow-2xl shadow-slate-200/40 rounded-3xl sm:rounded-[3rem] bg-white overflow-hidden border-slate-100">
                        <div className="p-6 sm:p-10 border-b border-slate-50 flex flex-row items-center justify-between bg-white">
                            <h3 className="text-xl font-black text-secondary tracking-tight">Active Problem Feed</h3>
                            <Button variant="ghost" className="h-10 text-[10px] font-black text-primary hover:bg-primary/5 uppercase tracking-widest gap-2">
                                <span className="hidden sm:inline">Manage Queue</span> <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="p-0">
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="px-10 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Type & Issue</th>
                                            <th className="px-6 py-5 text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                                            <th className="px-6 py-5 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">Engagement</th>
                                            <th className="px-6 py-5 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest">Status / Severity</th>
                                            <th className="px-10 py-5 text-right text-[9px] font-black text-slate-400 uppercase tracking-widest">Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {activeIssues.map((issue, i) => (
                                            <tr key={issue.id} className={cn(
                                                "group hover:bg-slate-50/60 transition-colors",
                                                !issue.isApproved && "bg-primary/5"
                                            )}>
                                                <td className="px-10 py-8">
                                                    <div className="space-y-1 mb-3">
                                                        <div className="text-sm font-black text-secondary tracking-tight">{issue.title}</div>
                                                        <div className="text-xs text-slate-400 line-clamp-1">{issue.description}</div>
                                                    </div>
                                                    {!issue.isApproved && (
                                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-md w-fit">
                                                            <AlertCircle className="w-3 h-3 text-primary" />
                                                            <span className="text-[8px] font-black text-primary uppercase tracking-widest">New Unreviewed</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-8">
                                                    <div className="flex gap-2 items-center">
                                                        <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                                        <div className="text-sm font-bold text-slate-500 tracking-tight">{issue.location}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-8 text-center">
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="flex items-center gap-1.5 text-primary">
                                                            <ThumbsUp className="w-3 h-3" />
                                                            <span className="text-[10px] font-black">{issue.reactions?.length || 0}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-secondary">
                                                            <MessageSquare className="w-3 h-3" />
                                                            <span className="text-[10px] font-black">{issue.comments?.length || 0}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-8 text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                                            issue.severity === "CRITICAL" ? "text-danger bg-danger/10 border-danger/20" :
                                                            issue.severity === "HIGH" ? "text-primary bg-primary/10 border-primary/20" :
                                                            "text-secondary bg-secondary/10 border-secondary/20"
                                                        )}>
                                                            {issue.severity}
                                                        </span>
                                                        <span className={cn(
                                                            "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border",
                                                            issue.status === "In Progress" ? "text-blue-500 bg-blue-50 border-blue-100" : "text-slate-300 border-transparent"
                                                        )}>
                                                            {issue.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <Button 
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleMarkAsDone(issue)}
                                                            className="h-10 w-10 rounded-xl hover:bg-success/10 text-success opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-success/10"
                                                            title="Mark as Resolved"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </Button>
                                                        <Button 
                                                            onClick={() => openAssignmentModal(issue)}
                                                            className="h-10 px-6 rounded-xl bg-secondary hover:bg-secondary/90 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-secondary/10"
                                                        >
                                                            {issue.assignedTeam ? "Update Team" : "Review & Assign"}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-slate-50">
                                {issues.map((issue, i) => (
                                    <div key={issue.id} className={cn(
                                        "p-6 space-y-4",
                                        !issue.isApproved && "bg-primary/5"
                                    )}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ID: {issue.id}</div>
                                                    {!issue.isApproved && (
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                                                    )}
                                                </div>
                                                <h4 className="text-base font-black text-secondary tracking-tight">{issue.title}</h4>
                                            </div>
                                            <span className={cn(
                                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                                issue.severity === "CRITICAL" ? "text-danger bg-danger/10 border-danger/20" :
                                                issue.severity === "HIGH" ? "text-primary bg-primary/10 border-primary/20" :
                                                "text-secondary bg-secondary/10 border-secondary/20"
                                            )}>
                                                {issue.severity}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                                            <div className="flex items-center gap-1.5 text-primary bg-primary/5 px-2 py-1 rounded-md">
                                                <ThumbsUp className="w-3 h-3" />
                                                {issue.reactions?.length || 0} Supports
                                            </div>
                                            <div className="flex items-center gap-1.5 text-secondary bg-secondary/5 px-2 py-1 rounded-md">
                                                <MessageSquare className="w-3 h-3" />
                                                {issue.comments?.length || 0} Comments
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-500 tracking-tight">
                                            <MapPin className="w-3.5 h-3.5 text-slate-300" />
                                            {issue.location}
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{issue.status}</div>
                                            <Button 
                                                onClick={() => openAssignmentModal(issue)}
                                                className="h-10 px-5 rounded-xl bg-secondary text-white text-[10px] font-black uppercase"
                                            >
                                                Manage Dispatch
                                            </Button>
                                        </div>
                                    </div>
                                ))}
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
