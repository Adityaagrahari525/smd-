"use client";

import * as React from "react";
import { getData, createData, updateData, deleteData } from "@/services/mongoService";
import type { WaterIssue } from "@/services/mongoService";

interface UseFetchState {
  issues: WaterIssue[];
  loading: boolean;
  error: string | null;
}

/**
 * useIssues — fetches, creates, updates, and deletes water issues from the
 * mock Mongo service. Swap getData/createData/etc. for real API calls later.
 */
export function useIssues(filters?: { status?: WaterIssue["status"]; severity?: WaterIssue["severity"] }) {
  const [state, setState] = React.useState<UseFetchState>({
    issues: [],
    loading: true,
    error: null,
  });

  const fetchIssues = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await getData(filters);
      setState({ issues: data, loading: false, error: null });
    } catch (err: any) {
      console.error("[useIssues] fetch failed:", err);
      setState({ issues: [], loading: false, error: err.message ?? "Fetch failed" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.severity]);

  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const addIssue = async (
    payload: Omit<WaterIssue, "id" | "createdAt" | "updatedAt">
  ): Promise<WaterIssue | null> => {
    try {
      const created = await createData(payload);
      setState((s) => ({ ...s, issues: [created, ...s.issues] }));
      console.log("[useIssues] addIssue:", created.id);
      return created;
    } catch (err: any) {
      console.error("[useIssues] addIssue failed:", err);
      return null;
    }
  };

  const editIssue = async (
    id: string,
    patch: Partial<Omit<WaterIssue, "id" | "createdAt">>
  ): Promise<boolean> => {
    try {
      const updated = await updateData(id, patch);
      if (!updated) return false;
      setState((s) => ({
        ...s,
        issues: s.issues.map((i) => (i.id === id ? updated : i)),
      }));
      return true;
    } catch (err: any) {
      console.error("[useIssues] editIssue failed:", err);
      return false;
    }
  };

  const removeIssue = async (id: string): Promise<boolean> => {
    try {
      const ok = await deleteData(id);
      if (ok) setState((s) => ({ ...s, issues: s.issues.filter((i) => i.id !== id) }));
      return ok;
    } catch (err: any) {
      console.error("[useIssues] removeIssue failed:", err);
      return false;
    }
  };

  return {
    issues: state.issues,
    loading: state.loading,
    error: state.error,
    refetch: fetchIssues,
    addIssue,
    editIssue,
    removeIssue,
  };
}
