import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Helper to get clean username from email */
export function getCleanUsername(email: string): string {
    if (!email) return "Citizen";
    return email.split('@')[0].replace(/[._]/g, ' ');
}
