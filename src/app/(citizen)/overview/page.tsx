"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    Plus,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIssues } from "@/hooks/useIssues";
import { useAuth } from "@/hooks/useAuth";
import { getCleanUsername } from "@/services/mongoService";
import { ThumbsUp, MessageSquare, Send } from "lucide-react";

// Helper for type icons (not in the DB model)
const getIssueIcon = (title: string) => {
    if (title.toLowerCase().includes("leak")) return Droplets;
    if (title.toLowerCase().includes("contamination")) return Activity;
    if (title.toLowerCase().includes("pressure")) return AlertTriangle;
    return Droplets;
};

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
    const [selectedSector, setSelectedSector] = React.useState("All Sectors");
    const [selectedStatus, setSelectedStatus] = React.useState("All Statuses");
    const [expandedComments, setExpandedComments] = React.useState<string | null>(null);
    const [newComment, setNewComment] = React.useState("");
    
    const { user } = useAuth();
    
    // Connect to dynamic data
    const { issues, removeIssue, addReaction, addComment } = useIssues({ isApproved: true });

    const filteredIssues = issues.filter(issue => {
        const isNotResolved = issue.status !== "Resolved";
        const matchesSearch = issue.id.toLowerCase().includes(search.toLowerCase()) || 
                             issue.location.toLowerCase().includes(search.toLowerCase()) ||
                             issue.title.toLowerCase().includes(search.toLowerCase());
        const matchesSector = selectedSector === "All Sectors" || issue.location === selectedSector;
        const matchesStatus = selectedStatus === "All Statuses" || issue.status === selectedStatus;
        return isNotResolved && matchesSearch && matchesSector && matchesStatus;
    });

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this issue report?")) {
            await removeIssue(id);
        }
    };

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
                <select 
                    value={selectedSector}
                    onChange={e => setSelectedSector(e.target.value)}
                    className="text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer w-full sm:w-auto"
                >
                    <option>All Sectors</option>
                    <option>Sector 4-C</option>
                    <option>Sector 9-G</option>
                    <option>Industrial Hub</option>
                    <option>Sector 1-A</option>
                </select>
                <select 
                    value={selectedStatus}
                    onChange={e => setSelectedStatus(e.target.value)}
                    className="text-sm bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer w-full sm:w-auto"
                >
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                </select>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-500 text-sm gap-2 hover:text-primary hover:border-primary/30 transition-all w-full sm:w-auto justify-center">
                    <Filter className="w-4 h-4" /> Advanced Filters
                </Button>
                <Button variant="outline" className="rounded-xl border-slate-200 text-slate-500 text-sm gap-2 hover:text-primary hover:border-primary/30 transition-all">
                    <Download className="w-4 h-4" /> Export CSV
                </Button>
            </div>

            {/* Issues Table */}
            <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden mb-8">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
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
                            {filteredIssues.map((issue, i) => (
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
                                        <div className="text-xs text-slate-400">{issue.description.substring(0, 30)}...</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            {React.createElement(getIssueIcon(issue.title), { className: "w-4 h-4 text-primary" })}
                                            {issue.title}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={cn("text-sm font-black", 
                                                issue.severity === "CRITICAL" ? "text-red-500" :
                                                issue.severity === "HIGH" ? "text-orange-500" :
                                                issue.severity === "MEDIUM" ? "text-amber-500" : "text-green-500"
                                            )}>●  {issue.severity}</span>
                                            <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full",
                                                issue.severity === "CRITICAL" ? "bg-red-50 text-red-500" :
                                                issue.severity === "HIGH" ? "bg-orange-50 text-orange-500" :
                                                issue.severity === "MEDIUM" ? "bg-amber-50 text-amber-500" : "bg-green-50 text-green-500"
                                            )}>
                                                {issue.severity}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={cn("text-xs font-bold px-3 py-1.5 rounded-full border w-fit", 
                                                issue.status === "Pending" ? "text-amber-600 bg-amber-50 border-amber-200" :
                                                issue.status === "In Progress" ? "text-blue-600 bg-blue-50 border-blue-200" :
                                                "text-green-600 bg-green-50 border-green-200"
                                            )}>
                                                {issue.status}
                                            </span>
                                            {issue.assignedTeam && (
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">{issue.assignedTeam}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-500">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                            {issue.estimatedTime && (
                                                <span className="text-[10px] font-bold text-primary italic uppercase tracking-tighter">ETA: {issue.estimatedTime}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-3">
                                                <button 
                                                    onClick={() => user && addReaction(issue.id, user.id)}
                                                    className={cn(
                                                        "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-black transition-all",
                                                        issue.reactions?.includes(user?.id || "")
                                                            ? "bg-primary/10 border-primary/20 text-primary"
                                                            : "bg-slate-50 border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20"
                                                    )}
                                                >
                                                    <ThumbsUp className="w-3.5 h-3.5" />
                                                    SUPPORT {(issue.reactions?.length || 0) > 0 && `(${issue.reactions?.length})`}
                                                </button>
                                                <button 
                                                    onClick={() => setExpandedComments(expandedComments === issue.id ? null : issue.id)}
                                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 hover:text-secondary hover:border-secondary/20 text-[10px] font-black transition-all"
                                                >
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    REPLY {(issue.comments?.length || 0) > 0 && `(${issue.comments?.length})`}
                                                </button>
                                            </div>

                                            {/* Expandable Comments Section */}
                                            <AnimatePresence>
                                                {expandedComments === issue.id && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-2 border-t border-slate-50 flex flex-col gap-2">
                                                            {issue.comments?.map((c, idx) => (
                                                                <div key={idx} className="bg-slate-50/50 p-2 rounded-lg text-[11px]">
                                                                    <div className="flex justify-between items-start mb-0.5">
                                                                        <span className="font-bold text-secondary">{c.userName}</span>
                                                                        <span className="text-[9px] text-slate-400 font-medium">{new Date(c.createdAt).toLocaleDateString()}</span>
                                                                    </div>
                                                                    <p className="text-slate-500 leading-relaxed italic">"{c.text}"</p>
                                                                </div>
                                                            ))}
                                                            
                                                            {user && (
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <input 
                                                                        value={newComment}
                                                                        onChange={e => setNewComment(e.target.value)}
                                                                        placeholder="Write a message..."
                                                                        className="flex-1 h-8 bg-white border border-slate-200 rounded-lg px-3 text-[11px] focus:outline-none focus:ring-1 focus:ring-primary/30"
                                                                        onKeyDown={async (e) => {
                                                                            if (e.key === 'Enter' && newComment.trim()) {
                                                                                await addComment(issue.id, {
                                                                                    userId: user.id,
                                                                                    userName: getCleanUsername(user.email),
                                                                                    text: newComment
                                                                                });
                                                                                setNewComment("");
                                                                            }
                                                                        }}
                                                                    />
                                                                    <button 
                                                                        disabled={!newComment.trim()}
                                                                        onClick={async () => {
                                                                            await addComment(issue.id, {
                                                                                userId: user.id,
                                                                                userName: getCleanUsername(user.email),
                                                                                text: newComment
                                                                            });
                                                                            setNewComment("");
                                                                        }}
                                                                        className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50"
                                                                    >
                                                                        <Send className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-100">
                    {filteredIssues.map((issue, i) => (
                        <motion.div
                            key={issue.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-5 flex flex-col gap-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xs font-black text-primary mb-1">{issue.id}</div>
                                    <div className="text-base font-bold text-secondary">{issue.location}</div>
                                    <div className="text-xs text-slate-400 line-clamp-1">{issue.description}</div>
                                </div>
                                <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full border shrink-0", 
                                    issue.status === "Pending" ? "text-amber-600 bg-amber-50 border-amber-200" :
                                    issue.status === "In Progress" ? "text-blue-600 bg-blue-50 border-blue-200" :
                                    "text-green-600 bg-green-50 border-green-200"
                                )}>
                                    {issue.status}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                    {React.createElement(getIssueIcon(issue.title), { className: "w-3.5 h-3.5 text-primary" })}
                                    {issue.title}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={cn("text-xs font-black", 
                                        issue.severity === "CRITICAL" ? "text-red-500" :
                                        issue.severity === "HIGH" ? "text-orange-500" :
                                        issue.severity === "MEDIUM" ? "text-amber-500" : "text-green-500"
                                    )}>●  {issue.severity}</span>
                                    <span className={cn("text-[8px] font-black px-2 py-0.5 rounded-full",
                                        issue.severity === "CRITICAL" ? "bg-red-50 text-red-500" :
                                        issue.severity === "HIGH" ? "bg-orange-50 text-orange-500" :
                                        issue.severity === "MEDIUM" ? "bg-amber-50 text-amber-500" : "bg-green-50 text-green-500"
                                    )}>
                                        {issue.severity}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-slate-400">{new Date(issue.createdAt).toLocaleDateString()}</span>
                                    {issue.assignedTeam && (
                                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{issue.assignedTeam}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-8 rounded-lg text-[10px] gap-2 border-slate-200">
                                        <Eye className="w-3.5 h-3.5" /> Details
                                    </Button>
                                    <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={() => handleDelete(issue.id)}
                                        className="h-8 rounded-lg text-[10px] gap-2 border-red-100 text-red-400 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Delete
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {filteredIssues.length === 0 && (
                        <div className="p-10 text-center text-slate-400 italic text-sm">
                            No issues found matching your criteria.
                        </div>
                    )}
                </div>

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
