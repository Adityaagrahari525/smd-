"use client";

import * as React from "react";
import {
    Eye,
    MapPin,
    ChevronRight,
    Layers,
    Navigation,
    ShieldAlert,
    Target,
    Plus,
    Minus,
    AlertTriangle,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

import { useIssues } from "@/hooks/useIssues";

export default function LiveMapPage() {
    const { issues, refetch } = useIssues();
    const mapRef = React.useRef<HTMLDivElement>(null);
    const mapInstanceRef = React.useRef<any>(null);
    const issueLayerRef = React.useRef<any>(null);

    const loadIssuesMarkers = React.useCallback(() => {
        if (!mapInstanceRef.current || !issueLayerRef.current) return;
        const L = (window as any).L;
        if (!L) return;

        issueLayerRef.current.clearLayers();

        issues.forEach((issue) => {
            const statusColor = issue.status === "Resolved" ? "#22c55e" : issue.severity === "CRITICAL" ? "#ef4444" : "#f59e0b";
            
            const icon = L.divIcon({
                html: `<div style="
                    background:${statusColor};
                    width:28px;height:28px;border-radius:50% 50% 50% 0;
                    transform:rotate(-45deg);border:3px solid #fff;
                    box-shadow:0 2px 8px rgba(0,0,0,0.35);
                "></div>`,
                iconSize: [28, 28],
                iconAnchor: [14, 28],
                className: "",
            });

            const marker = L.marker([issue.lat || 19.076, issue.lng || 72.8777], { icon });
            
            const popupContent = `
                <div style="font-family:system-ui,sans-serif;min-width:200px;padding:4px;">
                    <div style="display:flex;justify-content:between;align-items:center;margin-bottom:8px;">
                        <span style="font-weight:900;font-size:12px;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;">
                            ${issue.id}
                        </span>
                        <span style="margin-left:auto;font-size:10px;font-weight:800;color:${statusColor};text-transform:uppercase;">
                            ${issue.status}
                        </span>
                    </div>
                    <div style="font-weight:800;font-size:14px;color:#0f172a;margin-bottom:4px;line-height:1.2;">
                        ${issue.title}
                    </div>
                    <div style="font-size:12px;color:#64748b;margin-bottom:12px;line-height:1.4;">
                        ${issue.description}
                    </div>
                    <div style="background:#f8fafc;padding:8px;border-radius:8px;border:1px solid #f1f5f9;">
                        <div style="font-size:9px;font-weight:900;color:#94a3b8;text-transform:uppercase;margin-bottom:2px;">Location Provided</div>
                        <div style="font-size:11px;font-weight:700;color:#334155;">
                            ${issue.location}
                        </div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                closeButton: false,
                offset: [0, -20]
            });

            // Show popup on hover
            marker.on('mouseover', function (e: any) {
                e.target.openPopup();
            });
            marker.on('mouseout', function (e: any) {
                e.target.closePopup();
            });

            issueLayerRef.current.addLayer(marker);
        });
    }, [issues]);

    // Update markers whenever issues change
    React.useEffect(() => {
        loadIssuesMarkers();
    }, [loadIssuesMarkers]);

    React.useEffect(() => {
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }

        const initMap = () => {
            const L = (window as any).L;
            if (!mapRef.current || mapInstanceRef.current) return;

            const map = L.map(mapRef.current, {
                center: [19.076, 72.8777],
                zoom: 13,
                zoomControl: false,
            });
            mapInstanceRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            L.control.zoom({ position: "bottomright" }).addTo(map);

            const adminIcon = L.divIcon({
                html: `<div style="font-size:28px;line-height:1;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4))">🏛️</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                className: "",
            });
            L.marker([19.076, 72.8777], { icon: adminIcon })
                .addTo(map)
                .bindPopup(
                    `<div style="font-family:system-ui,sans-serif;font-weight:700;font-size:13px;color:#0f172a;">
                        🏛️ Municipal Corporation Office
                    </div>`,
                    { maxWidth: 220 }
                );

            issueLayerRef.current = L.layerGroup().addTo(map);
            loadIssuesMarkers();
        };

        if ((window as any).L) {
            initMap();
        } else {
            if (!document.getElementById("leaflet-js")) {
                const script = document.createElement("script");
                script.id = "leaflet-js";
                script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                script.async = true;
                script.onload = initMap;
                document.head.appendChild(script);
            }
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // Only once on mount


    return (
        <div className="flex flex-col gap-6 pb-10">

            {/* ── ROW 1: Cards above the map ── */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* Active Incident Card */}
                <Card className="shadow-lg rounded-[2rem] bg-white border-slate-100 overflow-hidden">
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex justify-between items-center mb-6 sm:mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-danger rounded-full animate-ping" />
                                <span className="text-[10px] font-black text-danger uppercase tracking-[0.2em] italic">Active Incident</span>
                            </div>
                            <span className="px-3 py-1 bg-danger text-white rounded-lg text-[9px] font-black uppercase tracking-widest italic">Critical</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight mb-2 italic">Main Pipe Leakage</h2>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs mb-6 italic">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="truncate">Mira Bhayandar Road East, Sector 12</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Score</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-2xl sm:text-3xl font-black text-secondary tracking-tighter">94</span>
                                    <span className="text-sm font-black text-slate-300">/100</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Severity</div>
                                <div className="text-lg sm:text-xl font-black text-danger tracking-tighter italic uppercase underline underline-offset-4 decoration-danger/20">High tier</div>
                            </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3 mb-6 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                            <div className="flex justify-between"><span>Coordinates</span><span className="text-secondary font-black">19.0760° N, 72.8777° E</span></div>
                            <div className="flex justify-between"><span>Loss Rate</span><span className="text-danger font-black font-mono">450 L/min</span></div>
                            <div className="flex justify-between"><span>Report Source</span><span className="text-secondary font-black">IoT-JS-882</span></div>
                        </div>

                        <div className="flex gap-3">
                            <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md transition-all hover:scale-[1.02]">
                                Assign Crew
                            </Button>
                            <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl border-slate-100 text-slate-400 hover:text-primary transition-all">
                                <Eye className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Map Overlays + Legend side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Map Overlays */}
                    <Card className="shadow-lg rounded-[2rem] bg-white border-slate-100">
                        <CardContent className="p-6 sm:p-7">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Map Overlays</div>
                            <div className="space-y-4 sm:space-y-5">
                                <OverlayToggle label="Network Heatmap" checked={true} />
                                <OverlayToggle label="Problem Markers" checked={true} />
                                <OverlayToggle label="Maintenance Crews" checked={false} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Legend */}
                    <Card className="shadow-lg rounded-[2rem] bg-white border-slate-100">
                        <CardContent className="p-6 sm:p-7">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 italic">Legend</div>
                            <div className="space-y-3 sm:space-y-4">
                                <LegendItem color="bg-danger" label="Critical (Red)" />
                                <LegendItem color="bg-orange-500" label="Amber Alert" />
                                <LegendItem color="bg-blue-500" label="Operation Blue" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* ── ROW 2: Full-width Leaflet Map ── */}
            <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl h-[350px] sm:h-[450px] lg:h-[520px]">
                <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            </div>

            {/* ── ROW 3: Refresh button (right-aligned) ── */}
            <div className="flex justify-end">
                <button
                    onClick={loadIssuesMarkers}
                    className="flex items-center gap-2 py-2.5 px-5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-95"
                >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Refresh Issues
                </button>
            </div>

            {/* ── ROW 4: Live Feed + Alert cards (horizontal scroll) ── */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-4 min-w-max">
                    {/* Live Feed status pill */}
                    <Card className="shadow-md rounded-2xl bg-white border-slate-100 shrink-0">
                        <CardContent className="h-20 px-8 flex items-center gap-4">
                            <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                            <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] italic whitespace-nowrap">Live Feed</span>
                        </CardContent>
                    </Card>

                    {/* Contamination Alert */}
                    <Card className="shadow-md rounded-2xl bg-white border-slate-100 shrink-0">
                        <CardContent className="h-20 px-6 flex items-center">
                            <FeedItem icon={AlertTriangle} label="Contamination Alert" meta="Mira Road • 2m ago" color="text-orange-600" />
                        </CardContent>
                    </Card>

                    {/* Low Pressure */}
                    <Card className="shadow-md rounded-2xl bg-white border-slate-100 shrink-0">
                        <CardContent className="h-20 px-6 flex items-center">
                            <FeedItem icon={ShieldAlert} label="Low Pressure" meta="Sasunavghar • 14m ago" color="text-blue-600" />
                        </CardContent>
                    </Card>

                    {/* Details button card */}
                    <Card className="shadow-md rounded-2xl bg-white border-slate-100 shrink-0">
                        <CardContent className="h-20 px-6 flex items-center">
                            <Button variant="ghost" size="sm" className="text-[10px] font-black text-primary hover:bg-primary/5 uppercase tracking-widest h-10 gap-2">
                                Details <ChevronRight className="w-4 h-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}

function OverlayToggle({ label, checked }: { label: string; checked: boolean }) {
    return (
        <div className="flex items-center justify-between group">
            <span className="text-[11px] font-black text-secondary tracking-tight group-hover:text-primary transition-colors italic">{label}</span>
            <Switch checked={checked} className="data-[state=checked]:bg-primary" />
        </div>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm shrink-0", color)} />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">{label}</span>
        </div>
    );
}

function FeedItem({ icon: Icon, label, meta, color }: any) {
    return (
        <div className="flex items-center gap-4 group cursor-pointer hover:translate-y-[-2px] transition-transform">
            <div className="bg-slate-50 p-2 rounded-xl border border-transparent group-hover:border-slate-100 transition-all">
                <Icon className={cn("w-4 h-4", color)} />
            </div>
            <div>
                <div className="text-[11px] font-black text-secondary tracking-tight italic whitespace-nowrap">{label}</div>
                <div className="text-[9px] font-bold text-slate-300 uppercase tracking-widest whitespace-nowrap">{meta}</div>
            </div>
        </div>
    );
}
