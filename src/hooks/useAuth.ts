"use client";

import * as React from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

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

  // 1. INITIALIZATION & SESSION SYNC
  React.useEffect(() => {
    let mounted = true;

    if (isSupabaseConfigured) {
      // REAL MODE: Use Supabase
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
    } else {
      // MOCK MODE: Use localStorage fallback
      const mockSession = localStorage.getItem("jalsuraksha_mock_user");
      if (mockSession) {
        try {
          setState({
            user: JSON.parse(mockSession),
            loading: false,
            error: null,
          });
        } catch {
          localStorage.removeItem("jalsuraksha_mock_user");
          setState({ user: null, loading: false, error: null });
        }
      } else {
        setState({ user: null, loading: false, error: null });
      }
      return () => { mounted = false; };
    }
  }, []);

  // ── Actions ──────────────────────────────────────────────────────────────────

  const signIn = async (email: string, _password: string): Promise<boolean> => {
    setState((s) => ({ ...s, loading: true, error: null }));
    
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithPassword({ email, password: _password });
        if (error) throw error;
        return true;
      } catch (err: any) {
        setState((s) => ({ ...s, loading: false, error: err.message }));
        return false;
      }
    } else {
      // MOCK MODE: Always succeed, determine role based on email or fixed rule
      return new Promise((resolve) => {
        setTimeout(() => {
          const role = email.toLowerCase().includes("admin") ? "admin" : "citizen";
          const mockUser: AuthUser = {
            id: "mock-uid-" + Date.now(),
            email: email,
            role: role,
          };
          
          localStorage.setItem("jalsuraksha_mock_user", JSON.stringify(mockUser));
          setState({ user: mockUser, loading: false, error: null });
          console.log("[Auth] Signed in as MOCK USER:", mockUser);
          resolve(true);
        }, 800);
      });
    }
  };

  const signUp = async (
    email: string,
    _password: string,
    role: "citizen" | "admin" = "citizen"
  ): Promise<boolean> => {
    setState((s) => ({ ...s, loading: true, error: null }));

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password: _password,
          options: { data: { role } },
        });
        if (error) throw error;
        return true;
      } catch (err: any) {
        setState((s) => ({ ...s, loading: false, error: err.message }));
        return false;
      }
    } else {
      // MOCK MODE: Always succeed
      const mockUser: AuthUser = {
        id: "mock-uid-" + Date.now(),
        email,
        role,
      };
      localStorage.setItem("jalsuraksha_mock_user", JSON.stringify(mockUser));
      setState({ user: mockUser, loading: false, error: null });
      return true;
    }
  };

  const signOut = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err: any) {
        console.error("[Auth] signOut failed:", err.message);
      }
    } else {
      localStorage.removeItem("jalsuraksha_mock_user");
      setState({ user: null, loading: false, error: null });
      console.log("[Auth] Signed out MOCK USER");
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signInWithOAuth({ provider: "google" });
      } catch (err: any) {
        console.error("[Auth] Google signIn failed:", err.message);
      }
    } else {
      alert("Mock Mode: Google Sign-in initialized (mocking success)");
      signIn("demo@example.com", "password");
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
