"use client";

import * as React from "react";
import { 
  getData, 
  createData, 
  updateData, 
  deleteData, 
  addReaction as apiAddReaction, 
  addComment as apiAddComment, 
  getReports, 
  createReport, 
  deleteReport, 
  Report,
  WaterIssue
} from "@/services/mongoService";

interface UseFetchState {
  issues: WaterIssue[];
  reports: Report[];
  loading: boolean;
  error: string | null;
}

/**
 * useIssues — fetches, creates, updates, and deletes water issues from the
 * mock Mongo service. Swap getData/createData/etc. for real API calls later.
 */
export function useIssues(filters?: { 
  status?: WaterIssue["status"]; 
  severity?: WaterIssue["severity"];
  isApproved?: boolean;
  userId?: string; // NEW: Identification for user-specific data
}) {
  const [state, setState] = React.useState<UseFetchState>({
    issues: [],
    reports: [],
    loading: true,
    error: null,
  });

  const fetchData = React.useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const [issuesData, reportsData] = await Promise.all([
        getData(filters),
        getReports()
      ]);
      setState({ issues: issuesData, reports: reportsData, loading: false, error: null });
    } catch (err: any) {
      console.error("[useIssues] fetch failed:", err);
      setState({ issues: [], reports: [], loading: false, error: err.message ?? "Fetch failed" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.severity, filters?.isApproved, filters?.userId]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addIssue = async (
    payload: Omit<WaterIssue, "id" | "createdAt" | "updatedAt" | "isApproved" | "reactions" | "comments">
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

  const addReport = async (payload: Omit<Report, "id" | "createdAt">): Promise<Report | null> => {
    try {
      const created = await createReport(payload);
      setState((s) => ({ ...s, reports: [created, ...s.reports] }));
      return created;
    } catch (err) {
      return null;
    }
  };

  const removeReport = async (id: string): Promise<boolean> => {
    try {
      const ok = await deleteReport(id);
      if (ok) setState((s) => ({ ...s, reports: s.reports.filter(r => r.id !== id) }));
      return ok;
    } catch (err) {
      return false;
    }
  };

  const addReaction = async (id: string, userId: string): Promise<boolean> => {
    try {
      const ok = await apiAddReaction(id, userId);
      if (ok) fetchData();
      return ok;
    } catch (err) { return false; }
  };

  const addComment = async (id: string, comment: { userId: string, userName: string, text: string }): Promise<boolean> => {
    try {
      const ok = await apiAddComment(id, comment);
      if (ok) fetchData();
      return ok;
    } catch (err) { return false; }
  };

  return {
    issues: state.issues,
    reports: state.reports,
    loading: state.loading,
    error: state.error,
    refetch: fetchData,
    addIssue,
    editIssue,
    removeIssue,
    addReaction,
    addComment,
    addReport,
    removeReport,
  };
}
