/**
 * mongoService.ts
 * Mock MongoDB service layer with localStorage persistence.
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WaterIssue {
  id: string;
  userId: string; // NEW: Identification for "My Reports"
  title: string;
  description: string;
  location: string;
  lat?: number;
  lng?: number;
  status: "Pending" | "Assigned" | "In Progress" | "Resolved";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  isApproved: boolean; 
  assignedTeam?: string; 
  estimatedTime?: string; 
  evidenceUrl?: string; // NEW: Store filename/reference
  reactions: string[]; // NEW: Array of userIds who liked
  comments: { 
    userId: string; 
    userName: string; 
    text: string; 
    createdAt: string; 
  }[]; // NEW: Social interactions
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  issueId?: string;
  title: string;
  content: string;
  generatedBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "admin";
  createdAt: string;
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const mockReports: Report[] = [
    { 
        id: "R-7721", 
        title: "Sector 14 Pipeline Integrity Audit", 
        content: "Detailed analysis of structural integrity following the major burst on Oct 28. Repair confirmed with 10-year lifespan expectation.", 
        generatedBy: "Systems Auto-Gen", 
        createdAt: new Date().toISOString() 
    }
];

// ─── Persistence Helper ───────────────────────────────────────────────────────
const STORAGE_KEY = "jalsuraksha_issue_store";
const REPORT_STORAGE_KEY = "jalsuraksha_report_store";

const loadStore = (): WaterIssue[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as WaterIssue[];
      return parsed.map(issue => ({
        ...issue,
        reactions: issue.reactions || [],
        comments: issue.comments || [],
        userId: issue.userId || "legacy-user",
        isApproved: typeof issue.isApproved === "boolean" ? issue.isApproved : true
      }));
    } catch {
      return [];
    }
  }
  return [];
};

const loadReports = (): Report[] => {
  if (typeof window === "undefined") return [...mockReports];
  const saved = localStorage.getItem(REPORT_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as Report[];
    } catch {
      return [...mockReports];
    }
  }
  return [...mockReports];
};

const saveStore = (issues: WaterIssue[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
  }
};

const saveReports = (reports: Report[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(reports));
  }
};

// In-memory store initialized from localStorage or seed
let issueStore: WaterIssue[] = loadStore();
let reportStore: Report[] = loadReports();

// ─── Utility ──────────────────────────────────────────────────────────────────
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));
const genId = (prefix = "JS") => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

// ─── CRUD — Issues ────────────────────────────────────────────────────────────

/** Fetch all issues */
export async function getData(filters?: {
  status?: WaterIssue["status"];
  severity?: WaterIssue["severity"];
  isApproved?: boolean;
  userId?: string; // NEW: Privacy filter
}): Promise<WaterIssue[]> {
  try {
    await delay();
    let results = [...issueStore];
    if (filters?.status) results = results.filter((i) => i.status === filters.status);
    if (filters?.severity) results = results.filter((i) => i.severity === filters.severity);
    if (typeof filters?.isApproved === "boolean") {
        results = results.filter((i) => i.isApproved === filters.isApproved);
    }
    if (filters?.userId) {
        results = results.filter((i) => i.userId === filters.userId);
    }
    return results;
  } catch (err) {
    console.error("[MongoDB] getData failed:", err);
    throw err;
  }
}

/** Fetch a single issue by id */
export async function getDataById(id: string): Promise<WaterIssue | null> {
  try {
    await delay();
    return issueStore.find((i) => i.id === id) ?? null;
  } catch (err) {
    console.error("[MongoDB] getDataById failed:", err);
    throw err;
  }
}

/** Create a new issue */
export async function createData(
  payload: Omit<WaterIssue, "id" | "createdAt" | "updatedAt" | "isApproved" | "reactions" | "comments">
): Promise<WaterIssue> {
  try {
    await delay();
    const newIssue: WaterIssue = {
      ...payload,
      id: genId(),
      isApproved: false,
      reactions: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    issueStore = [newIssue, ...issueStore];
    saveStore(issueStore);
    return newIssue;
  } catch (err) {
    console.error("[MongoDB] createData failed:", err);
    throw err;
  }
}

/** Update an existing issue by id */
export async function updateData(
  id: string,
  patch: Partial<Omit<WaterIssue, "id" | "createdAt">>
): Promise<WaterIssue | null> {
  try {
    await delay();
    const idx = issueStore.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    
    issueStore[idx] = {
      ...issueStore[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    saveStore(issueStore);
    return issueStore[idx];
  } catch (err) {
    console.error("[MongoDB] updateData failed:", err);
    throw err;
  }
}

/** Delete an issue by id */
export async function deleteData(id: string): Promise<boolean> {
  try {
    await delay();
    const before = issueStore.length;
    issueStore = issueStore.filter((i) => i.id !== id);
    const deleted = issueStore.length < before;
    if (deleted) saveStore(issueStore);
    return deleted;
  } catch (err) {
    console.error("[MongoDB] deleteData failed:", err);
    throw err;
  }
}

// ─── CRUD — Reports ───────────────────────────────────────────────────────────

export async function getReports(): Promise<Report[]> {
  await delay();
  return [...reportStore];
}

export async function createReport(payload: Omit<Report, "id" | "createdAt">): Promise<Report> {
  await delay();
  const newReport: Report = {
    ...payload,
    id: genId("R"),
    createdAt: new Date().toISOString(),
  };
  reportStore = [newReport, ...reportStore];
  saveReports(reportStore);
  return newReport;
}

export async function deleteReport(id: string): Promise<boolean> {
  await delay();
  const before = reportStore.length;
  reportStore = reportStore.filter(r => r.id !== id);
  const ok = reportStore.length < before;
  if (ok) saveReports(reportStore);
  return ok;
}

// ─── Social Actions ──────────────────────────────────────────────────────────

export async function addReaction(id: string, userId: string): Promise<boolean> {
    await delay(100);
    const idx = issueStore.findIndex(i => i.id === id);
    if (idx === -1) return false;
    
    const reactions = issueStore[idx].reactions || [];
    if (reactions.includes(userId)) {
        issueStore[idx].reactions = reactions.filter(u => u !== userId);
    } else {
        issueStore[idx].reactions = [...reactions, userId];
    }
    saveStore(issueStore);
    return true;
}

export async function addComment(id: string, comment: { userId: string, userName: string, text: string }): Promise<boolean> {
    await delay(100);
    const idx = issueStore.findIndex(i => i.id === id);
    if (idx === -1) return false;
    
    const newComment = {
        ...comment,
        createdAt: new Date().toISOString()
    };
    
    issueStore[idx].comments = [...(issueStore[idx].comments || []), newComment];
    saveStore(issueStore);
    return true;
}

/** Helper to get clean username from email */
export function getCleanUsername(email: string): string {
    if (!email) return "Citizen";
    return email.split('@')[0].replace(/[._]/g, ' ');
}

// ─── Users ────────────────────────────────────────────────────────────────────
const mockUsers: User[] = [
    { id: "u-001", name: "Admin Mehta", email: "admin@example.com", role: "admin", createdAt: "2024-01-10T00:00:00Z" }
];

export async function getUsers(): Promise<User[]> {
  try {
    await delay();
    return [...mockUsers];
  } catch (err) {
    console.error("[MongoDB] getUsers failed:", err);
    throw err;
  }
}

