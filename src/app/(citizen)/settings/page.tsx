"use client";

import * as React from "react";
import { User, Mail, Shield, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">User Profile</h1>
                <p className="text-slate-500 font-medium">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1 border-none shadow-xl shadow-slate-200/50 rounded-[2rem] overflow-hidden">
                    <div className="h-32 bg-primary relative">
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                            <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden">
                                {user?.email ? (
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" />
                                ) : (
                                    <User className="w-10 h-10 text-slate-300" />
                                )}
                            </div>
                        </div>
                    </div>
                    <CardContent className="pt-16 pb-8 text-center">
                        <h2 className="text-xl font-bold text-secondary">{user?.email.split('@')[0] || "Citizen"}</h2>
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mt-1">Active Member</p>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border-none shadow-xl shadow-slate-200/50 rounded-[2rem]">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-secondary">Account Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Email Address</div>
                                <div className="text-sm font-bold text-secondary">{user?.email || "Not logged in"}</div>
                            </div>
                            <CheckCircle2 className="ml-auto w-5 h-5 text-emerald-500" />
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Access Role</div>
                                <div className="text-sm font-bold text-secondary capitalize">{user?.role || "Citizen"}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
