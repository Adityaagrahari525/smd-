import { createClient } from "@supabase/supabase-js";

// Safe environment variable retrieval with placeholders for local development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project") &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes("your-anon-key");

if (!isSupabaseConfigured) {
  console.warn(
    "[Supabase] Running in MOCK MODE: Missing or placeholder environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
