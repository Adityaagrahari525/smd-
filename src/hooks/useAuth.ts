"use client";

import * as React from "react";
import { supabase } from "@/lib/supabaseClient";

export interface AuthUser {
  id: string;
  email: string;
  role: "citizen" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to Supabase auth state changes
  React.useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session?.user) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email ?? "",
            role: (session.user.user_metadata?.role as "citizen" | "admin") ?? "citizen",
          },
          loading: false,
          error: null,
        });
      } else if (mounted) {
        setState({ user: null, loading: false, error: null });
      }
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        setState({
          user: {
            id: session.user.id,
            email: session.user.email ?? "",
            role: (session.user.user_metadata?.role as "citizen" | "admin") ?? "citizen",
          },
          loading: false,
          error: null,
        });
      } else {
        setState({ user: null, loading: false, error: null });
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────────

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      console.log("[Auth] signIn success:", email);
      return true;
    } catch (err: any) {
      console.error("[Auth] signIn failed:", err.message);
      setState((s) => ({ ...s, loading: false, error: err.message }));
      return false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    role: "citizen" | "admin" = "citizen"
  ): Promise<boolean> => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { role } },
      });
      if (error) throw error;
      console.log("[Auth] signUp success:", email, "role:", role);
      return true;
    } catch (err: any) {
      console.error("[Auth] signUp failed:", err.message);
      setState((s) => ({ ...s, loading: false, error: err.message }));
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      console.log("[Auth] signed out");
    } catch (err: any) {
      console.error("[Auth] signOut failed:", err.message);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      await supabase.auth.signInWithOAuth({ provider: "google" });
    } catch (err: any) {
      console.error("[Auth] Google signIn failed:", err.message);
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
}
