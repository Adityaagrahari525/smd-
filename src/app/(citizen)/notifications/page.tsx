"use client";

import * as React from "react";
import { Bell, Clock, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">Notifications</h1>
                <p className="text-slate-500 font-medium">Stay updated with system alerts and report status</p>
            </div>

            <div className="space-y-4">
                {[
                    { title: "System Update", desc: "Predictive engine optimization completed for Sector 7.", time: "2 hours ago", type: "info" },
                    { title: "Report Status", desc: "Your issue report regarding 'Pressure Drop' has been closed.", time: "5 hours ago", type: "success" },
                    { title: "Grid Alert", desc: "Minor flow anomaly detected in northern grid. Causal analysis in progress.", time: "1 day ago", type: "warning" },
                ].map((note, i) => (
                    <Card key={i} className="border-none shadow-lg shadow-slate-100/50 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all cursor-pointer group">
                        <CardContent className="p-6 flex items-start gap-5">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary/5 transition-colors shrink-0">
                                <Bell className="w-5 h-5" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">{note.title}</h3>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <Clock className="w-3 h-3" />
                                        {note.time}
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed italic">{note.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 text-center max-w-2xl mx-auto">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-primary mx-auto mb-6">
                    <Info className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-secondary mb-2 italic">Notification Hub</h2>
                <p className="text-sm font-medium text-slate-500 italic leading-relaxed">
                    All critical infrastructure alerts and status updates will appear here. 
                    Ensure your email notifications are enabled in settings for real-time reporting.
                </p>
            </div>
        </div>
    );
}
