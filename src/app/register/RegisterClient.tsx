"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    AtSign,
    Lock,
    User,
    Shield,
    Eye,
    EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterClient() {
    const [activeTab, setActiveTab] = React.useState<"citizen" | "authority">("citizen");
    const [showPassword, setShowPassword] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState(false);
    const router = useRouter();
    const { signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const role = activeTab === "authority" ? "admin" : "citizen";
            const result = await signUp(email, password, role);

            if (result) {
                setSuccess(true);
                // Redirect after a short delay
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setError("Registration failed. Email may already be in use.");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-[#0d1f2d]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-[#0f2030] p-10 rounded-2xl border border-primary/20 text-center space-y-6"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Registration Successful!</h1>
                    <p className="text-slate-400">
                        Your account has been created. Redirecting you to login...
                    </p>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-[progress_3s_linear_filled]" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 px-4 bg-[#0d1f2d] relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f2d] via-[#0e2233] to-[#0a1a26]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-[#0f2030]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-sm text-slate-400">Join the JalSuraksha Network</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mb-8">
                        <button
                            onClick={() => setActiveTab("citizen")}
                            className={cn(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                                activeTab === "citizen" ? "bg-white text-secondary" : "text-slate-400"
                            )}
                        >
                            Citizen
                        </button>
                        <button
                            onClick={() => setActiveTab("authority")}
                            className={cn(
                                "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all",
                                activeTab === "authority" ? "bg-white text-secondary" : "text-slate-400"
                            )}
                        >
                            Authority
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                            <div className="relative">
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@domain.com"
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 text-white text-sm focus:ring-1 focus:ring-primary/50 outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 text-white text-sm focus:ring-1 focus:ring-primary/50 outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-7">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
