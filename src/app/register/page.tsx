import * as React from "react";
import RegisterClient from "./RegisterClient";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen bg-[#0d1f2d] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <RegisterClient />
        </React.Suspense>
    );
}
