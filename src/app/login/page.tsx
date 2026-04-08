import * as React from "react";
import LoginClient from "./LoginClient";

// Force the page to be dynamic to prevent prerendering errors with useSearchParams
export const dynamic = "force-dynamic";

export default function LoginPage() {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen bg-[#0d1f2d] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <LoginClient />
        </React.Suspense>
    );
}
