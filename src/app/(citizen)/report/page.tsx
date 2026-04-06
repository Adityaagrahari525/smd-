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
import { useIssues } from "@/hooks/useIssues";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { calculateDistance, formatDistance, MC_COORDINATES } from "@/lib/geo";

interface PickedLocation {
    lat: number;
    lng: number;
}

export default function ReportIssuePage() {
    const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
    const [description, setDescription] = React.useState("");
    const [citizenName, setCitizenName] = React.useState("");
    const [category, setCategory] = React.useState<string>("Leakage");
    const [severity, setSeverity] = React.useState<WaterIssue["severity"]>("MEDIUM");
    const [pickedLocation, setPickedLocation] = React.useState<PickedLocation | null>(null);
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [gpsLoading, setGpsLoading] = React.useState(false);
    const [gpsError, setGpsError] = React.useState<string | null>(null);
    const { addIssue } = useIssues();
    const { user } = useAuth();
    const router = useRouter();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCapturedImage(file.name); // Store filename as reference
            // For real apps, we'd upload here. For mock, just show filename.
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!pickedLocation) {
            alert("Please click on the map to select your issue location.");
            return;
        }
        if (description.length < 20) {
            alert("Please provide a description with at least 20 characters.");
            return;
        }
        if (!user || !user.id) {
            alert("You must be logged in to submit a report.");
            return;
        }

        setIsSubmitting(true);
        try {
            const success = await addIssue({
                userId: user.id,
                title: `${category}: ${description.substring(0, 20)}...`,
                description,
                location: `Sector ${Math.floor(Math.random() * 10)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
                lat: pickedLocation.lat,
                lng: pickedLocation.lng,
                status: "Pending",
                severity: severity,
                evidenceUrl: capturedImage || undefined,
            });

            if (success) {
                setSubmitted(true);
                setDescription("");
                setCitizenName("");
                setPickedLocation(null);
                setCapturedImage(null);
                if (markerRef.current && mapInstanceRef.current) {
                    mapInstanceRef.current.removeLayer(markerRef.current);
                    markerRef.current = null;
                }
                mapInstanceRef.current?.setView([19.076, 72.8777], 13);
            } else {
                alert("Failed to submit issue. Please check your connection and try again.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            alert("An unexpected error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pb-24">
            {/* Page Header */}
            {/* Success Popup Modal */}
            {submitted && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-100/50 text-center relative overflow-hidden"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-dark" />
                        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                        
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-primary" />
                        </div>
                        
                        <h2 className="text-2xl font-black text-secondary mb-4 tracking-tight">Report Received</h2>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                            Your report has been successfully submitted to the <span className="text-secondary font-bold">Municipal Corporation</span>. 
                            Our engineers will review the issue, assign a response team, and update your status shortly.
                        </p>
                        
                        <div className="space-y-3">
                            <Button 
                                onClick={() => router.push("/overview")}
                                className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold uppercase tracking-widest text-xs gap-2"
                            >
                                View My Dashboard <ArrowRight className="w-4 h-4" />
                            </Button>
                            <button 
                                onClick={() => setSubmitted(false)}
                                className="text-xs font-black text-slate-400 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                            >
                                Submit Another Report
                            </button>
                        </div>
                    </motion.div>
                </div>
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

                        {/* Issue Category */}
                        <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                <h3 className="text-base font-bold text-secondary">Issue Category</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {["Leakage", "Pressure", "Quality", "Other"].map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setCategory(cat)}
                                        className={cn(
                                            "py-3 rounded-xl border text-xs font-bold transition-all",
                                            category === cat 
                                                ? "bg-primary/10 border-primary text-primary shadow-sm"
                                                : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Severity Assessment */}
                        <Card className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                <h3 className="text-base font-bold text-secondary">Severity Assessment</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {(["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const).map((sev) => (
                                    <button
                                        key={sev}
                                        type="button"
                                        onClick={() => setSeverity(sev)}
                                        className={cn(
                                            "py-2.5 rounded-lg border text-[10px] font-black tracking-widest transition-all",
                                            severity === sev 
                                                ? "bg-secondary text-white border-secondary shadow-md"
                                                : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100"
                                        )}
                                    >
                                        {sev}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Upload Evidence */}
                        <Card className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                hidden 
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" 
                                onChange={handleFileChange} 
                            />
                            {!capturedImage ? (
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-slate-200 rounded-xl hover:border-primary/40 transition-colors cursor-pointer group"
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                        <Camera className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-base font-bold text-secondary mb-1">Upload Evidence</h3>
                                    <p className="text-xs text-slate-400 mb-5">Select images (JPG, PNG), PDF, or Word documents</p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-full px-6 text-xs font-semibold border-slate-300 hover:border-primary hover:text-primary transition-all"
                                    >
                                        Select Files
                                    </Button>
                                </div>
                            ) : (
                                <div className="p-6 border-2 border-primary/20 bg-primary/5 rounded-xl text-center relative group">
                                    <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
                                    <h4 className="text-sm font-bold text-secondary truncate px-4">{capturedImage}</h4>
                                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-black">Ready for upload</p>
                                    <button
                                        type="button"
                                        onClick={() => setCapturedImage(null)}
                                        className="mt-4 text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest"
                                    >
                                        Remove File
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
                                    {pickedLocation && (
                                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-bold text-primary italic uppercase tracking-widest">
                                            <Navigation className="w-3 h-3" />
                                            {formatDistance(calculateDistance(pickedLocation.lat, pickedLocation.lng, MC_COORDINATES.lat, MC_COORDINATES.lng))} FROM MUNICIPAL CORP
                                        </div>
                                    )}
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
                                disabled={isSubmitting}
                                className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-sm gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-secondary/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <><RefreshCw className="w-4 h-4 animate-spin" /> Processing...</>
                                ) : (
                                    <><Send className="w-4 h-4" /> Submit My Issue <ArrowRight className="w-4 h-4" /></>
                                )}
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
