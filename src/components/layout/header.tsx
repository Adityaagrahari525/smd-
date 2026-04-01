"use client";

import * as React from "react";
import Link from "next/link";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Reports", href: "#" },
    { name: "Infrastructure", href: "#" },
    { name: "Quality", href: "#" },
    { name: "Contact", href: "#" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);

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

                <div className="flex items-center gap-6">
                    <Link
                        href="/login"
                        className={cn(
                            "text-sm font-semibold transition-colors underline underline-offset-4",
                            isScrolled ? "text-primary decoration-primary" : "text-primary decoration-primary"
                        )}
                    >
                        Login
                    </Link>
                    <Link href="/login">
                        <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-lg px-5 py-2 text-sm font-semibold transition-all shadow-md">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
