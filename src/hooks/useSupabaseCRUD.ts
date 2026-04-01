"use client";

import * as React from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * useSupabaseCRUD — generic CRUD wrapper around any Supabase table.
 * Usage: const { rows, insert, update, remove } = useSupabaseCRUD("issues");
 */
export function useSupabaseCRUD<T extends Record<string, any>>(tableName: string) {
  const [rows, setRows] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAll = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sbErr } = await supabase.from(tableName).select("*");
      if (sbErr) throw sbErr;
      setRows((data as T[]) ?? []);
      console.log(`[Supabase] fetchAll(${tableName}) →`, data?.length, "rows");
    } catch (err: any) {
      console.error(`[Supabase] fetchAll(${tableName}) failed:`, err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  React.useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const insert = async (payload: Partial<T>): Promise<T | null> => {
    try {
      const { data, error: sbErr } = await supabase
        .from(tableName)
        .insert([payload])
        .select()
        .single();
      if (sbErr) throw sbErr;
      setRows((prev) => [data as T, ...prev]);
      console.log(`[Supabase] insert(${tableName}) →`, data);
      return data as T;
    } catch (err: any) {
      console.error(`[Supabase] insert(${tableName}) failed:`, err.message);
      return null;
    }
  };

  const update = async (id: string | number, patch: Partial<T>): Promise<boolean> => {
    try {
      const { error: sbErr } = await supabase
        .from(tableName)
        .update(patch)
        .eq("id", id);
      if (sbErr) throw sbErr;
      setRows((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
      );
      console.log(`[Supabase] update(${tableName}) id=${id}`);
      return true;
    } catch (err: any) {
      console.error(`[Supabase] update(${tableName}) failed:`, err.message);
      return false;
    }
  };

  const remove = async (id: string | number): Promise<boolean> => {
    try {
      const { error: sbErr } = await supabase
        .from(tableName)
        .delete()
        .eq("id", id);
      if (sbErr) throw sbErr;
      setRows((prev) => prev.filter((r) => r.id !== id));
      console.log(`[Supabase] remove(${tableName}) id=${id}`);
      return true;
    } catch (err: any) {
      console.error(`[Supabase] remove(${tableName}) failed:`, err.message);
      return false;
    }
  };

  return { rows, loading, error, refetch: fetchAll, insert, update, remove };
}
