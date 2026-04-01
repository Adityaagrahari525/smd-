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
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const feedPosts = [
    {
        id: 1,
        sector: "SECTOR 14",
        category: "INFRASTRUCTURE",
        timeAgo: "2 hours ago",
        badge: "Accelerated: +40% priority",
        badgeColor: "bg-red-100 text-red-600",
        title: "Mainline Leak in Sector 14",
        description: "Significant water wastage observed near the main substation. The pressure is dropping across the residential block. Urgent...",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=300",
        supports: 124,
        comments: 18,
        progress: 72,
        progressColor: "bg-primary",
    },
    {
        id: 2,
        sector: "LAJPAT NAGAR",
        category: "SUPPLY CHAIN",
        timeAgo: "5 hours ago",
        badge: "Trending Topic",
        badgeColor: "bg-amber-100 text-amber-600",
        title: "Supply Gap in Block C & D",
        description: "Zero water pressure since 6 AM today. Multiple households reporting dry taps. Local water tank levels seem abnormally lo...",
        image: "https://images.unsplash.com/photo-1504376379689-8d54347b26c6?auto=format&fit=crop&q=80&w=300",
        supports: null,
        supportLabel: "Support",
        comments: 4,
        moreSupports: "15 more supporters for acceleration",
        progress: 45,
        progressColor: "bg-amber-400",
    },
    {
        id: 3,
        sector: "GREEN PARK",
        category: "QUALITY CONTROL",
        timeAgo: "1 day ago",
        badge: "Investigation Phase",
        badgeColor: "bg-blue-100 text-blue-600",
        title: "Cloudy Water Discharge",
        description: "Residents in Phase 2 reporting turbid water appearance for the last 24 hours. No odor detected, but clarity is compromised...",
        image: "https://images.unsplash.com/photo-1547700055-b61caced3fc3?auto=format&fit=crop&q=80&w=300",
        supports: 89,
        comments: 31,
        progress: 30,
        progressColor: "bg-blue-400",
    },
];

const impactfulIssues = [
    { rank: "01", title: "Sector 14 Mainline Leak", supports: 124, tag: "High Priority", tagColor: "text-red-500 bg-red-50" },
    { rank: "02", title: "Green Park Turbidity", supports: 89, tag: "Investigating", tagColor: "text-blue-500 bg-blue-50" },
    { rank: "03", title: "Rohini Pump Failure", supports: 72, tag: "Queued", tagColor: "text-slate-500 bg-slate-50" },
];

export default function CommunityPage() {
    const [view, setView] = React.useState<"list" | "map">("list");

    return (
        <div className="pb-12">
            {/* Page Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-black text-secondary tracking-tight mb-3">Community Feed</h1>
                    <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                        Monitor water security concerns raised by fellow citizens. Support
                        high-impact issues to accelerate their resolution by municipal teams.
                    </p>
                </div>
                <div className="flex gap-2 shrink-0 mt-1">
                    <button
                        onClick={() => setView("list")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold border transition-all",
                            view === "list"
                                ? "bg-white border-slate-300 text-secondary shadow-sm"
                                : "border-transparent text-slate-400 hover:text-secondary"
                        )}
                    >
                        Live List
                    </button>
                    <button
                        onClick={() => setView("map")}
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold border transition-all",
                            view === "map"
                                ? "bg-white border-slate-300 text-secondary shadow-sm"
                                : "border-transparent text-slate-400 hover:text-secondary"
                        )}
                    >
                        Map View
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Feed */}
                <div className="lg:col-span-2 space-y-5">
                    {feedPosts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                <div className="flex gap-5 p-5">
                                    {/* Image */}
                                    <div className="w-28 h-24 rounded-xl overflow-hidden shrink-0">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-2">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                {post.sector} • {post.category} • {post.timeAgo}
                                            </span>
                                            {post.badge && (
                                                <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full", post.badgeColor)}>
                                                    {post.badge}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-base font-black text-secondary mb-1 leading-snug">{post.title}</h3>
                                        <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">{post.description}</p>

                                        {/* Progress */}
                                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
                                            <div
                                                className={cn("h-full rounded-full", post.progressColor)}
                                                style={{ width: `${post.progress}%` }}
                                            />
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors group">
                                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                                                    <ThumbsUp className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="text-xs font-bold">
                                                    {post.supports ? `${post.supports} Support` : post.supportLabel}
                                                </span>
                                            </button>
                                            <button className="flex items-center gap-1.5 text-slate-400 hover:text-secondary transition-colors">
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-xs font-bold">{post.comments} Comments</span>
                                            </button>
                                            {post.moreSupports && (
                                                <span className="text-[10px] text-primary font-bold ml-auto">{post.moreSupports}</span>
                                            )}
                                            <button className="ml-auto text-slate-300 hover:text-slate-500 transition-colors">
                                                <Share2 className="w-4 h-4" />
                                            </button>
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
