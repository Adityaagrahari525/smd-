/**
 * mongoService.ts
 * Mock MongoDB service layer. Replace mock bodies with real API calls
 * (fetch/axios to /api routes) when backend is ready.
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WaterIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  lat?: number;
  lng?: number;
  status: "Pending" | "In Progress" | "Resolved";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "citizen" | "admin";
  createdAt: string;
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const mockIssues: WaterIssue[] = [
  {
    id: "JS-9021",
    title: "Mainline Leakage",
    description: "Large crack in the primary main line at the intersection.",
    location: "Sector 4-C, Palm Grove Avenue",
    lat: 19.076,
    lng: 72.8777,
    status: "Pending",
    severity: "CRITICAL",
    createdAt: "2024-10-24T10:30:00Z",
    updatedAt: "2024-10-24T10:30:00Z",
  },
  {
    id: "JS-8842",
    title: "Contamination Warning",
    description: "Yellowish water with metallic smell in Block C.",
    location: "Sector 9-G, Hillcrest Bypass",
    lat: 19.082,
    lng: 72.891,
    status: "In Progress",
    severity: "MEDIUM",
    createdAt: "2024-10-22T15:15:00Z",
    updatedAt: "2024-10-23T08:00:00Z",
  },
  {
    id: "JS-8751",
    title: "Pressure Drop",
    description: "Significant pressure loss in Warehouse Row 14.",
    location: "Industrial Hub, Warehouse Row 14",
    status: "Resolved",
    severity: "LOW",
    createdAt: "2024-10-20T09:00:00Z",
    updatedAt: "2024-10-21T14:00:00Z",
  },
];

const mockUsers: User[] = [
  {
    id: "u-001",
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "citizen",
    createdAt: "2024-01-10T00:00:00Z",
  },
  {
    id: "u-002",
    name: "Admin Singh",
    email: "admin@jalsuraksha.gov.in",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
];

// In-memory store (simulates a DB collection)
let issueStore: WaterIssue[] = [...mockIssues];

// ─── Utility ──────────────────────────────────────────────────────────────────
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));
const genId = () => `JS-${Math.floor(1000 + Math.random() * 9000)}`;

// ─── CRUD — Issues ────────────────────────────────────────────────────────────

/** Fetch all issues, optionally filtered by status */
export async function getData(filters?: {
  status?: WaterIssue["status"];
  severity?: WaterIssue["severity"];
}): Promise<WaterIssue[]> {
  try {
    await delay();
    let results = [...issueStore];
    if (filters?.status) results = results.filter((i) => i.status === filters.status);
    if (filters?.severity) results = results.filter((i) => i.severity === filters.severity);
    console.log("[MongoDB] getData →", results.length, "records");
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
    const issue = issueStore.find((i) => i.id === id) ?? null;
    console.log("[MongoDB] getDataById →", id, issue ? "found" : "not found");
    return issue;
  } catch (err) {
    console.error("[MongoDB] getDataById failed:", err);
    throw err;
  }
}

/** Create a new issue */
export async function createData(
  payload: Omit<WaterIssue, "id" | "createdAt" | "updatedAt">
): Promise<WaterIssue> {
  try {
    await delay();
    const newIssue: WaterIssue = {
      ...payload,
      id: genId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    issueStore = [newIssue, ...issueStore];
    console.log("[MongoDB] createData → created", newIssue.id);
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
    if (idx === -1) {
      console.warn("[MongoDB] updateData → not found:", id);
      return null;
    }
    issueStore[idx] = {
      ...issueStore[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    console.log("[MongoDB] updateData → updated", id);
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
    console.log("[MongoDB] deleteData →", id, deleted ? "deleted" : "not found");
    return deleted;
  } catch (err) {
    console.error("[MongoDB] deleteData failed:", err);
    throw err;
  }
}

// ─── Users ────────────────────────────────────────────────────────────────────

/** Fetch mock users */
export async function getUsers(): Promise<User[]> {
  try {
    await delay();
    return [...mockUsers];
  } catch (err) {
    console.error("[MongoDB] getUsers failed:", err);
    throw err;
  }
}
