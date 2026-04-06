"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    ThumbsUp,
    MessageCircle,
    Share2,
    Search,
    Map,
    List,
    TrendingUp,
    Users,
    Plus,
    Circle,
    ArrowRight,
    Navigation,
    MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIssues } from "@/hooks/useIssues";
import { calculateDistance, formatDistance, MC_COORDINATES } from "@/lib/geo";

export default function CommunityPage() {
    const [view, setView] = React.useState<"list" | "map">("list");
    const { issues, loading, addReaction } = useIssues({ isApproved: true });

    // Filter out resolved issues for the community feed
    const activeIssues = issues.filter(i => i.status !== "Resolved");

    // Derive impactful issues from real data
    const impactfulIssues = [...activeIssues]
        .sort((a, b) => (b.reactions?.length || 0) - (a.reactions?.length || 0))
        .slice(0, 3)
        .map((issue, idx) => ({
            rank: `0${idx + 1}`,
            title: issue.title,
            supports: issue.reactions?.length || 0,
            tag: issue.severity,
            tagColor: issue.severity === "CRITICAL" ? "text-red-500 bg-red-50" : "text-primary bg-primary/5"
        }));

    return (
        <div className="pb-12">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-secondary tracking-tight mb-3">Community Feed</h1>
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                        Monitor water security concerns raised by fellow citizens. Support
                        high-impact issues to accelerate their resolution.
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto shrink-0 mt-1">
                    <button
                        onClick={() => setView("list")}
                        className={cn(
                            "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold border transition-all",
                            view === "list"
                                ? "bg-white border-slate-300 text-secondary shadow-sm"
                                : "border-transparent text-slate-400 hover:text-secondary bg-slate-50/50"
                        )}
                    >
                        Live List
                    </button>
                    <button
                        onClick={() => setView("map")}
                        className={cn(
                            "flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold border transition-all",
                            view === "map"
                                ? "bg-white border-slate-300 text-secondary shadow-sm"
                                : "border-transparent text-slate-400 hover:text-secondary bg-slate-50/50"
                        )}
                    >
                        Map View
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Feed */}
                <div className="lg:col-span-2 space-y-5">
                    {activeIssues.length === 0 && !loading && (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <TrendingUp className="w-12 h-12 text-slate-200 mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs text-center">
                                No active community issues right now.<br/>Everything seems to be flowing correctly.
                            </p>
                        </div>
                    )}
                    {activeIssues.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="flex gap-5 p-5">
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {post.location} • {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className={cn(
                                                "text-[9px] font-black px-2 py-0.5 rounded-full",
                                                post.severity === "CRITICAL" ? "bg-red-50 text-red-600" :
                                                post.severity === "HIGH" ? "bg-amber-50 text-amber-600" :
                                                "bg-blue-50 text-blue-600"
                                            )}>
                                                {post.severity}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-black text-secondary mb-1 leading-snug">{post.title}</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{post.description}</p>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => addReaction(post.id, "current-user")}
                                                className="flex items-center gap-1.5 text-primary hover:scale-105 transition-transform"
                                            >
                                                <div className="w-8 h-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
                                                    <ThumbsUp className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-xs font-bold">
                                                    {post.reactions?.length || 0} Support
                                                </span>
                                            </button>
                                            <div className="flex items-center gap-1.5 text-secondary">
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-xs font-bold">{post.comments?.length || 0} Comments</span>
                                            </div>

                                            {post.lat && post.lng && (
                                                <div className="ml-auto flex items-center gap-1.5 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                                    <MapPin className="w-3 h-3" />
                                                    {formatDistance(calculateDistance(post.lat, post.lng, MC_COORDINATES.lat, MC_COORDINATES.lng))} FROM MC
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Community Hotspots */}
                    <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                            <h3 className="text-sm font-black text-secondary">Community Hotspots</h3>
                            <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full">Live</span>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-40 bg-[#1a2a3a] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(100,180,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(100,180,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
                            <button className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold text-white hover:bg-white/20 transition-all">
                                Interactive Map View
                            </button>
                        </div>

                        <div className="px-5 py-4 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                                High Support Density (Sector 14)
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                                Resolved Areas (South Ext.)
                            </div>
                        </div>
                    </Card>

                    {/* Most Impactful Issues */}
                    <Card className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm">
                        <div className="flex items-center gap-2 mb-5">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-black text-secondary">Most Impactful Issues</h3>
                        </div>
                        <div className="space-y-4">
                            {impactfulIssues.map((issue) => (
                                <div key={issue.rank} className="flex items-start gap-4">
                                    <span className="text-2xl font-black text-slate-100 w-8 shrink-0">{issue.rank}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-secondary leading-snug mb-1">{issue.title}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-primary font-bold">{issue.supports} Support</span>
                                            <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full", issue.tagColor)}>
                                                {issue.tag}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] hover:text-primary transition-colors border border-slate-100 rounded-xl py-3 hover:border-primary/30">
                            VIEW LEADERBOARD ARCHIVE
                        </button>
                    </Card>

                    {/* Community Actions */}
                    <Card className="border border-slate-200 rounded-2xl p-5 bg-secondary text-white shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <Users className="w-5 h-5 text-white/60" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">THIS MONTH</span>
                        </div>
                        <div className="text-4xl font-black mb-1">1,402</div>
                        <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-4">COMMUNITY ACTIONS TAKEN</div>
                        <p className="text-xs text-white/70 leading-relaxed">
                            People like you are fixing JalSuraksha.
                        </p>
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
