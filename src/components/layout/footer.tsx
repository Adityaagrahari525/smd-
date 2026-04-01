import * as React from "react";
import Link from "next/link";
import { Droplets, Globe, Send, ShieldCheck, Zap, Waves } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <Droplets className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold text-secondary">JalSuraksha</span>
                        </Link>
                        <p className="text-muted text-xs leading-relaxed mb-8 max-w-xs font-medium italic">
                            Leading the digital transformation of water infrastructure through authoritative, data-driven engineering.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="p-2.5 border border-slate-100 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all">
                                <Globe className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2.5 border border-slate-100 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all">
                                <Waves className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2.5 border border-slate-100 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all">
                                <ShieldCheck className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-secondary mb-8 text-[10px] uppercase tracking-[0.25em] italic">Infrastructure</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Asset Management</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Real-time Analytics</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Leakage Control</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-secondary mb-8 text-[10px] uppercase tracking-[0.25em] italic">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Water Quality</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Public Safety</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-secondary mb-8 text-[10px] uppercase tracking-[0.25em] italic">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Terms of Service</Link></li>
                            <li><Link href="#" className="text-xs font-medium text-muted hover:text-primary transition-colors italic">Governance</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-50 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.25em] text-center md:text-left italic">
                        © 2024 JALSURAKSHA STRATEGIC ASSETS. THE STANDARD IN RESILIENT WATER INFRASTRUCTURE.
                    </p>
                </div>
            </div>
        </footer>
    );
}
