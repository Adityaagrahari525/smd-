"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
    Camera,
    MapPin,
    Send,
    CheckCircle,
    Navigation,
    ShieldCheck,
    X,
    ArrowRight,
    Locate,
    RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PickedLocation {
    lat: number;
    lng: number;
}

export default function ReportIssuePage() {
    const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
    const [description, setDescription] = React.useState("");
    const [citizenName, setCitizenName] = React.useState("");
    const [pickedLocation, setPickedLocation] = React.useState<PickedLocation | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [gpsLoading, setGpsLoading] = React.useState(false);
    const [gpsError, setGpsError] = React.useState<string | null>(null);

    // Refs for Leaflet
    const mapRef = React.useRef<HTMLDivElement>(null);
    const mapInstanceRef = React.useRef<any>(null);
    const markerRef = React.useRef<any>(null);
    const pickedLocationRef = React.useRef<PickedLocation | null>(null);

    // Keep ref up to date without re-running map effect
    React.useEffect(() => {
        pickedLocationRef.current = pickedLocation;
    }, [pickedLocation]);

    const placeMarker = React.useCallback((lat: number, lng: number) => {
        const L = (window as any).L;
        if (!L || !mapInstanceRef.current) return;

        const blueIcon = L.divIcon({
            html: `<div style="
                background:#0f766e;
                width:28px;height:28px;border-radius:50% 50% 50% 0;
                transform:rotate(-45deg);border:3px solid #fff;
                box-shadow:0 2px 8px rgba(0,0,0,0.35);
            "></div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            className: "",
        });

        if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
        } else {
            markerRef.current = L.marker([lat, lng], {
                icon: blueIcon,
                draggable: true,
            }).addTo(mapInstanceRef.current);

            markerRef.current.on("dragend", (e: any) => {
                const pos = e.target.getLatLng();
                setPickedLocation({ lat: pos.lat, lng: pos.lng });
            });
        }
        setPickedLocation({ lat, lng });
        mapInstanceRef.current.setView([lat, lng], 15);
    }, []);

    React.useEffect(() => {
        // Load Leaflet CSS
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
                zoomControl: true,
            });
            mapInstanceRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19,
            }).addTo(map);

            // Click to drop marker
            map.on("click", (e: any) => {
                placeMarker(e.latlng.lat, e.latlng.lng);
            });
        };

        if ((window as any).L) {
            initMap();
        } else {
            const script = document.createElement("script");
            script.id = "leaflet-js";
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.async = true;
            script.onload = initMap;
            if (!document.getElementById("leaflet-js")) {
                document.head.appendChild(script);
            }
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                markerRef.current = null;
            }
        };
    }, [placeMarker]);

    const handleGPS = () => {
        setGpsError(null);
        if (!navigator.geolocation) {
            setGpsError("Geolocation not supported by your browser.");
            return;
        }
        setGpsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setGpsLoading(false);
                placeMarker(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                setGpsLoading(false);
                setGpsError("Unable to get location. Please allow location access.");
            },
            { timeout: 10000 }
        );
    };

    const handleRecenter = () => {
        mapInstanceRef.current?.setView([19.076, 72.8777], 13);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pickedLocation) {
            alert("Please click on the map to select your issue location.");
            return;
        }
        if (description.length < 20) {
            alert("Please provide a description with at least 20 characters.");
            return;
        }

        const issue = {
            name: citizenName || "Anonymous Citizen",
            description,
            lat: pickedLocation.lat,
            lng: pickedLocation.lng,
            time: new Date().toISOString(),
        };

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem("civicIssues") || "[]");
        existing.push(issue);
        localStorage.setItem("civicIssues", JSON.stringify(existing));

        // Reset
        setSubmitted(true);
        setDescription("");
        setCitizenName("");
        setPickedLocation(null);
        if (markerRef.current && mapInstanceRef.current) {
            mapInstanceRef.current.removeLayer(markerRef.current);
            markerRef.current = null;
        }
        mapInstanceRef.current?.setView([19.076, 72.8777], 13);

        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="pb-24">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-black text-secondary tracking-tight">
                    Report a New <span className="italic text-primary font-serif font-bold">Issue</span>
                </h1>
                <p className="text-slate-500 mt-2 max-w-xl text-sm leading-relaxed">
                    Help us maintain the integrity of our water infrastructure. Your reports are
                    processed by our rapid response teams within 24 hours.
                </p>
            </div>

            {/* Success Banner */}
            {submitted && (
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-sm font-bold text-green-700">Issue submitted successfully! Our team has been notified.</span>
                </motion.div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        {/* Citizen Name */}
                        <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                <h3 className="text-base font-bold text-secondary">Your Name</h3>
                            </div>
                            <input
                                type="text"
                                value={citizenName}
                                onChange={e => setCitizenName(e.target.value)}
                                placeholder="Enter your name (or leave blank for Anonymous)"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-secondary placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
                            />
                        </Card>

                        {/* Upload Evidence */}
                        <Card className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm">
                            {!capturedImage ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-slate-200 rounded-xl hover:border-primary/40 transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Camera className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-base font-bold text-secondary mb-1">Upload Evidence</h3>
                                    <p className="text-xs text-slate-400 mb-5">Drag and drop images of leakages or contamination</p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-full px-6 text-xs font-semibold border-slate-300 hover:border-primary hover:text-primary transition-all"
                                    >
                                        Select Files
                                    </Button>
                                </div>
                            ) : (
                                <div className="relative rounded-xl overflow-hidden group">
                                    <img src={capturedImage} alt="Evidence" className="w-full aspect-video object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setCapturedImage(null)}
                                        className="absolute top-3 right-3 p-1.5 bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </Card>

                        {/* Describe the Issue */}
                        <Card className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                <h3 className="text-base font-bold text-secondary">Describe the Issue</h3>
                            </div>
                            <div className="relative">
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={5}
                                    required
                                    minLength={20}
                                    placeholder="Provide specific details about the water quality, pressure, or visible damage..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-secondary placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none"
                                />
                                <span className="absolute bottom-3 right-4 text-[10px] text-slate-300 uppercase tracking-widest">
                                    MINIMAL 20 CHARACTERS
                                </span>
                            </div>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                        {/* Map Card — Real Leaflet */}
                        <Card className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-bold text-secondary">Fix My Location</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRecenter}
                                    className="text-xs font-bold text-primary hover:underline uppercase tracking-wider"
                                >
                                    RECENTER
                                </button>
                            </div>

                            {/* Leaflet Map */}
                            <div ref={mapRef} style={{ height: "260px", width: "100%" }} />

                            {/* GPS Button */}
                            <div className="px-5 py-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={handleGPS}
                                    disabled={gpsLoading}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl text-xs font-bold text-primary uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                    {gpsLoading
                                        ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Locating...</>
                                        : <><Locate className="w-3.5 h-3.5" /> Use My Current Location</>
                                    }
                                </button>
                                {gpsError && <p className="text-xs text-red-500 mt-2 text-center">{gpsError}</p>}
                            </div>

                            {/* Detected Coordinates */}
                            <div className="flex items-center gap-3 px-5 py-3 border-t border-slate-100">
                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Navigation className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">SELECTED LOCATION</div>
                                    <div className="text-sm font-semibold text-secondary">
                                        {pickedLocation
                                            ? `${pickedLocation.lat.toFixed(5)}° N, ${pickedLocation.lng.toFixed(5)}° E`
                                            : "Click on the map to select a location"
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Finalize Report */}
                        <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm space-y-4">
                            <div>
                                <h3 className="text-base font-bold text-secondary mb-1">Finalize Report</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    By submitting, you confirm the provided data is accurate to the best of your knowledge.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-sm gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-secondary/20"
                            >
                                Submit My Issue <ArrowRight className="w-4 h-4" />
                            </Button>

                            <button type="button" className="w-full text-sm text-slate-400 hover:text-secondary transition-colors font-medium">
                                Save as Draft
                            </button>

                            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 rounded-xl border border-slate-100">
                                <ShieldCheck className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">ENCRYPTED & VERIFIED SUBMISSION</span>
                            </div>
                        </Card>
                    </div>
                </div>
            </form>

            {/* Footer */}
            <div className="mt-16 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-semibold text-slate-300 uppercase tracking-widest">
                <span>© 2024 JALSURAKSHA MUNICIPAL SERVICES</span>
                <div className="flex gap-8">
                    <button className="hover:text-primary transition-colors">PRIVACY POLICY</button>
                    <button className="hover:text-primary transition-colors">SUPPORT</button>
                </div>
            </div>
        </div>
    );
}
