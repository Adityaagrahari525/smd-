"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Droplets, 
  Activity, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Navigation, 
  Waves,
  LayoutGrid,
  Search,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const stats = [
  { label: "Active Grid Nodes", value: "12.4M", icon: Activity },
  { label: "Leaks Averted", value: "3,240", icon: ShieldCheck },
  { label: "Median Response", value: "2hr", icon: Clock },
  { label: "System Stability", value: "98.2%", icon: CheckCircle2 },
];

const operations = [
  {
    title: "Signal Intake",
    desc: "IoT nodes across the city send real-time pressure data to our central hub.",
    icon: Waves,
  },
  {
    title: "AI Analysis",
    desc: "Neural networks filter patterns identifying true anomalies with 99.8% accuracy.",
    icon: Cpu,
  },
  {
    title: "Command Dispatch",
    desc: "Immediate notifications onboard field crews via the Command Center platform.",
    icon: Navigation,
  },
  {
    title: "Final Resolution",
    desc: "Repairs are validated via pink path signatures and closed in the app layer.",
    icon: CheckCircle2,
  }
];

export default function LandingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push("/report");
    } else {
      router.push("/login?redirect=/report");
    }
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      router.push(user.role === "admin" ? "/dashboard" : "/overview");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-primary/20">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
            style={{ filter: "brightness(0.4) contrast(1.2)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-bold text-white leading-tight mb-8 px-4 sm:px-0">
              Authority in <br />
              <span className="text-primary italic font-light">Water Security</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 font-medium leading-relaxed mb-12 max-w-2xl px-4 sm:px-0">
              Predictive infrastructure management for resilient water systems. 
              JalSuraksha ensures sustainable water cycles through real-time predictive monitoring.
            </p>
            
            <div className="flex flex-wrap gap-4 px-4 sm:px-0">
              <Button 
                onClick={handleReportClick}
                className="w-full sm:w-auto sm:h-16 h-14 px-10 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold uppercase tracking-widest text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Submit Report
              </Button>
              <Button 
                onClick={handleDashboardClick}
                variant="outline" 
                className="w-full sm:w-auto sm:h-16 h-14 px-10 border-white/30 text-white hover:bg-white/10 rounded-lg font-bold uppercase tracking-widest text-sm backdrop-blur-md transition-all"
              >
                Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-8 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4 italic">Real-World Resilience</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-none bg-slate-50/50 p-10 hover:bg-white hover:shadow-2xl transition-all duration-500 group rounded-[2rem]">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-5xl font-bold text-secondary tracking-tighter">{stat.value}</div>
                    <div className="text-sm font-semibold text-muted uppercase tracking-widest">{stat.label}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISUALIZATION SECTION */}
      <section className="py-32 bg-[#050B15] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.2em]">Operational Performance</div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight italic">
              Intelligent <br /> Grid Visualization
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
              High-fidelity infrastructure mapping subterranean assets and real-time flow dynamics across the JalSuraksha network.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 glass">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Critical Anomaly Map</span>
                <ArrowRight className="ml-auto w-4 h-4 text-white/40" />
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 glass">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Grid Operational Status</span>
                <span className="ml-auto text-primary font-black">97.4%</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-slate-900 rounded-[3rem] border border-white/10 overflow-hidden relative group">
              {/* Radar Mock */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]" />
                <div className="w-[80%] h-[80%] border border-white/5 rounded-full" />
                <div className="w-[60%] h-[60%] border border-white/5 rounded-full" />
                <div className="w-[40%] h-[40%] border border-white/5 rounded-full" />
                
                {/* Radar Line */}
                <div className="absolute inset-0 flex items-center justify-center animate-[spin_6s_linear_infinite]">
                  <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-primary" />
                </div>

                {/* Nodes */}
                <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,1)]" />
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]" />
              </div>
              
              <div className="absolute bottom-8 left-8 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1 italic">Scanning Node</div>
                <div className="text-lg font-black text-white italic tracking-tighter">SEC: 84B-92</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary mb-6 italic tracking-tight">Streamlined Operations</h2>
          <p className="text-xl text-muted font-medium italic max-w-2xl mx-auto">
            Engineered for maximum operational efficiency across the water cycle.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-100 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center">
              {operations.map((op, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-xl mx-auto flex items-center justify-center text-primary relative group hover:border-primary transition-all duration-500">
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-white italic shadow-lg">0{i+1}</div>
                    <op.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-secondary italic uppercase tracking-wider">{op.title}</h4>
                    <p className="text-sm font-medium text-muted leading-relaxed italic">{op.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <Card className="rounded-[2.5rem] md:rounded-[4rem] bg-[#0A192F] p-10 md:p-24 relative overflow-hidden border-none shadow-3xl text-center group">
            {/* Glowing backgrounds */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 space-y-8 md:space-y-12">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif font-bold text-white italic tracking-tighter leading-none">
                Ready to <span className="text-primary">Modernize?</span>
              </h2>
              <p className="text-lg md:text-2xl text-white/60 font-medium italic max-w-3xl mx-auto">
                Join forward-thinking cities using JalSuraksha to protect their most vital resource.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                <Button 
                  onClick={handleReportClick}
                  className="h-16 px-12 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold uppercase tracking-widest text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  Request Demo
                </Button>
                <Button 
                  onClick={handleReportClick}
                  variant="outline" 
                  className="h-16 px-12 border-white/20 text-white hover:bg-white/10 rounded-lg font-bold uppercase tracking-widest text-sm backdrop-blur-md transition-all"
                >
                  Speak with an Expert
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
