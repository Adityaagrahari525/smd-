"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    AtSign,
    Lock,
    Eye,
    EyeOff,
    Globe,
    MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginClient() {
    const [activeTab, setActiveTab] = React.useState<"citizen" | "authority">("citizen");
    const [showPassword, setShowPassword] = React.useState(false);
    const [remember, setRemember] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const { signIn, error: authError } = useAuth();
    const redirectPath = searchParams.get("redirect");

    // Sync auth error to local state for display
    React.useEffect(() => {
        if (authError) setError(authError);
    }, [authError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const success = await signIn(email, password);

            if (success) {
                if (redirectPath) {
                    router.push(redirectPath);
                } else if (activeTab === "authority") {
                    router.push("/dashboard");
                } else {
                    router.push("/overview");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 bg-[#0d1f2d] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Dark water-like abstract background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f2d] via-[#0e2233] to-[#0a1a26]" />

                {/* Decorative curved lines - water wave effect */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1024 768" preserveAspectRatio="xMidYMid slice">
                    <path d="M 0 400 Q 200 300 400 450 Q 600 600 800 400 Q 900 300 1024 350" stroke="#38b2ac" strokeWidth="1.5" fill="none" />
                    <path d="M 0 450 Q 250 350 450 500 Q 650 650 850 450 Q 950 350 1024 400" stroke="#38b2ac" strokeWidth="1" fill="none" />
                    <path d="M 0 350 Q 150 250 350 400 Q 550 550 750 350 Q 850 250 1024 300" stroke="#38b2ac" strokeWidth="0.5" fill="none" />
                    <circle cx="300" cy="200" r="120" stroke="#38b2ac" strokeWidth="0.5" fill="none" opacity="0.4" />
                    <circle cx="300" cy="200" r="80" stroke="#38b2ac" strokeWidth="0.5" fill="none" opacity="0.3" />
                    <circle cx="300" cy="200" r="40" stroke="#38b2ac" strokeWidth="0.5" fill="none" opacity="0.2" />
                    <circle cx="750" cy="550" r="100" stroke="#38b2ac" strokeWidth="0.5" fill="none" opacity="0.3" />
                    <circle cx="750" cy="550" r="60" stroke="#38b2ac" strokeWidth="0.5" fill="none" opacity="0.2" />
                </svg>

                {/* Glow accents */}
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/5 blur-[80px] rounded-full" />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#0f2030]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-sm text-slate-400">Access the JalSuraksha Command Center</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center animate-shake">
                            {error}
                        </div>
                    )}

                    {/* Tab Switcher */}
                    <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => setActiveTab("citizen")}
                            className={cn(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300",
                                activeTab === "citizen"
                                    ? "bg-white text-secondary shadow-md"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            Citizen Login
                        </button>
                        <button
                            onClick={() => setActiveTab("authority")}
                            className={cn(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300",
                                activeTab === "authority"
                                    ? "bg-white text-secondary shadow-md"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            Municipal Authority
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em] mb-2">
                                Email or Username
                            </label>
                            <div className="relative">
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="name@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-white/8 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.18em]">
                                    Password
                                </label>
                                <button type="button" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 focus:bg-white/8 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/30 cursor-pointer accent-primary"
                            />
                            <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer select-none">
                                Remember this device for 30 days
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Authenticating..." : "Secure Login"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-7 flex items-center">
                        <div className="flex-1 border-t border-white/8" />
                        <span className="px-4 text-[10px] font-semibold text-slate-500 uppercase tracking-[0.2em]">
                            Or Continue With
                        </span>
                        <div className="flex-1 border-t border-white/8" />
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2.5 h-11 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 hover:border-white/20 transition-all">
                            <Globe className="w-4 h-4 text-primary" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2.5 h-11 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 hover:border-white/20 transition-all">
                            <MessageSquare className="w-4 h-4 text-primary" />
                            OTP Login
                        </button>
                    </div>

                        Don't have an account?{" "}
                        <Link href="/register" className="text-primary font-bold hover:text-primary/80 transition-colors">
                            Sign Up
                        </Link>
                </div>
            </motion.div>
        </div>
    );
}
