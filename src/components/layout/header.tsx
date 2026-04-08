"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Droplets, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks: { name: string; href: string }[] = [];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-1.5 group">
                    <span className={cn(
                        "text-xl font-bold tracking-tight transition-colors",
                        isScrolled ? "text-secondary" : "text-white"
                    )}>
                        JalSuraksha
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-primary",
                                isScrolled ? "text-slate-600" : "text-white/80 hover:text-white"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/login"
                        className={cn(
                            "text-sm font-semibold transition-colors underline underline-offset-4 hidden sm:block",
                            isScrolled ? "text-primary decoration-primary" : "text-primary decoration-primary"
                        )}
                    >
                        Login
                    </Link>
                    <Link href="/login" className="hidden sm:block">
                        <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-lg px-5 py-2 text-sm font-semibold transition-all shadow-md">
                            Sign Up
                        </Button>
                    </Link>
                    <button 
                        className="md:hidden p-2 text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl md:hidden"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold uppercase tracking-[0.2em] text-slate-600 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <hr className="border-slate-50" />
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-sm font-bold text-primary uppercase tracking-widest text-center"
                        >
                            Login
                        </Link>
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button className="w-full bg-secondary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
}
