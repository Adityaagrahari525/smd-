"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface WaterIssue {
  id: string;
  _id?: string; // MongoDB internal ID
  userId: string;
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
  evidenceUrl?: string; 
  reactions: string[]; 
  comments: { 
    userId: string; 
    userName: string; 
    text: string; 
    createdAt: string; 
  }[]; 
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  _id?: string;
  issueId?: string;
  title: string;
  content: string;
  generatedBy: string;
  createdAt: string;
}

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: "citizen" | "admin";
  createdAt: string;
}

// ─── Database Helpers ────────────────────────────────────────────────────────
const DB_NAME = "smartwater";
const ISSUES_COLLECTION = "issues";
const REPORTS_COLLECTION = "reports";
const USERS_COLLECTION = "users";

function getIsMongoConfigured() {
  const uri = process.env.MONGODB_URI;
  const isPlaceholder = uri?.includes("cluster.mongodb.net") && uri?.includes("admin:password");
  return !!(uri && !isPlaceholder);
}

// Use global storage for mock data to persist across HMR in development
const globalStore = global as typeof globalThis & {
  jalsuraksha_mock_issues?: WaterIssue[];
  jalsuraksha_mock_reports?: Report[];
};

if (!globalStore.jalsuraksha_mock_issues || globalStore.jalsuraksha_mock_issues.length === 0) {
  globalStore.jalsuraksha_mock_issues = [
    {
      id: "JS-9021",
      userId: "mock-user-1",
      title: "Mainline Pipe Burst",
      description: "Large crack in the primary main line at the intersection. Water pressure in the sector is dropping rapidly.",
      location: "Sector 4-C, Palm Grove Avenue",
      status: "In Progress",
      severity: "CRITICAL",
      isApproved: true,
      assignedTeam: "Emergency Unit 4B",
      estimatedTime: "45 mins",
      reactions: ["mock-user-2", "mock-user-3"],
      comments: [
        { userId: "mock-user-2", userName: "Aravind S.", text: "Verified. Water is flooding the street.", createdAt: new Date(Date.now() - 3600000).toISOString() }
      ],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "JS-8842",
      userId: "mock-user-2",
      title: "Water Contamination Alert",
      description: "Tap water appears slightly yellowish since this morning. Noticeable metallic smell in the kitchen and bathroom.",
      location: "Sector 9-G, Hillcrest Bypass",
      status: "Pending",
      severity: "HIGH",
      isApproved: true,
      reactions: ["mock-user-1"],
      comments: [],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "JS-8751",
      userId: "mock-user-3",
      title: "Low Pressure in Ward 12",
      description: "Residents reporting significantly reduced water pressure over the last 48 hours. Hard to run appliances.",
      location: "Industrial Hub, Row 14",
      status: "Resolved",
      severity: "MEDIUM",
      isApproved: true,
      assignedTeam: "Maintenance Alpha",
      reactions: [],
      comments: [],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
       id: "JS-8610",
       userId: "mock-user-1",
       title: "Minor Leakage in Service Line",
       description: "Small leak noticed near the water meter. Not critical but wasting water.",
       location: "Sector 1-A, Central Square",
       status: "Pending",
       severity: "LOW",
       isApproved: false,
       reactions: [],
       comments: [],
       createdAt: new Date().toISOString(),
       updatedAt: new Date().toISOString(),
    }
  ];
}
if (!globalStore.jalsuraksha_mock_reports) {
  globalStore.jalsuraksha_mock_reports = [];
}

async function getCollection(name: string) {
  if (!getIsMongoConfigured()) {
    throw new Error("MongoDB not configured. Using Mock mode.");
  }
  const client = await clientPromise;
  return client.db(DB_NAME).collection(name);
}

// ─── CRUD — Issues ────────────────────────────────────────────────────────────

/** Fetch all issues with optional filtering */
export async function getData(filters?: {
  status?: WaterIssue["status"];
  severity?: WaterIssue["severity"];
  isApproved?: boolean;
  userId?: string;
}): Promise<WaterIssue[]> {
  try {
    if (!getIsMongoConfigured()) {
      let mock = [...(globalStore.jalsuraksha_mock_issues || [])];
      if (filters?.status) mock = mock.filter(i => i.status === filters.status);
      if (filters?.severity) mock = mock.filter(i => i.severity === filters.severity);
      if (typeof filters?.isApproved === "boolean") mock = mock.filter(i => i.isApproved === filters.isApproved);
      if (filters?.userId) mock = mock.filter(i => i.userId === filters.userId);
      return mock;
    }

    const collection = await getCollection(ISSUES_COLLECTION);
    let query: any = {};
    
    if (filters?.status) query.status = filters.status;
    if (filters?.severity) query.severity = filters.severity;
    if (typeof filters?.isApproved === "boolean") query.isApproved = filters.isApproved;
    if (filters?.userId) query.userId = filters.userId;

    const results = await collection.find(query).sort({ createdAt: -1 }).toArray();
    
    return results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })) as unknown as WaterIssue[];
  } catch (err) {
    console.error("[MongoDB] getData failed:", err);
    return [];
  }
}

/** Fetch a single issue by id */
export async function getDataById(id: string): Promise<WaterIssue | null> {
  try {
    if (!getIsMongoConfigured()) {
      return globalStore.jalsuraksha_mock_issues?.find(i => i.id === id) || null;
    }

    const collection = await getCollection(ISSUES_COLLECTION);
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    
    return {
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    } as unknown as WaterIssue;
  } catch (err) {
    console.error("[MongoDB] getDataById failed:", err);
    return null;
  }
}

/** Create a new issue */
export async function createData(
  payload: Omit<WaterIssue, "id" | "createdAt" | "updatedAt" | "isApproved" | "reactions" | "comments">
): Promise<WaterIssue> {
  try {
    const now = new Date().toISOString();
    const newDocObj: any = {
      ...payload,
      isApproved: false,
      reactions: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
    };

    if (!getIsMongoConfigured()) {
      const mockDoc: WaterIssue = {
        ...newDocObj,
        id: "mock-" + Math.random().toString(36).substring(2, 9),
      };
      globalStore.jalsuraksha_mock_issues?.push(mockDoc);
      return mockDoc;
    }

    const collection = await getCollection(ISSUES_COLLECTION);
    const result = await collection.insertOne(newDocObj);
    
    return {
      ...newDocObj,
      id: result.insertedId.toString()
    } as unknown as WaterIssue;
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
    const updatedAt = new Date().toISOString();

    if (!getIsMongoConfigured()) {
      const idx = globalStore.jalsuraksha_mock_issues?.findIndex(i => i.id === id);
      if (idx === undefined || idx === -1) return null;
      
      const updated = {
        ...globalStore.jalsuraksha_mock_issues![idx],
        ...patch,
        updatedAt
      };
      globalStore.jalsuraksha_mock_issues![idx] = updated;
      return updated;
    }

    const collection = await getCollection(ISSUES_COLLECTION);
    
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...patch, updatedAt } },
      { returnDocument: "after" }
    );
    
    if (!result) return null;
    
    return {
      ...result,
      id: result._id.toString(),
      _id: undefined
    } as unknown as WaterIssue;
  } catch (err) {
    console.error("[MongoDB] updateData failed:", err);
    throw err;
  }
}

/** Delete an issue by id */
export async function deleteData(id: string): Promise<boolean> {
  try {
    if (!getIsMongoConfigured()) {
      const prevLen = globalStore.jalsuraksha_mock_issues?.length || 0;
      globalStore.jalsuraksha_mock_issues = globalStore.jalsuraksha_mock_issues?.filter(i => i.id !== id);
      return (globalStore.jalsuraksha_mock_issues?.length || 0) < prevLen;
    }

    const collection = await getCollection(ISSUES_COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (err) {
    console.error("[MongoDB] deleteData failed:", err);
    return false;
  }
}

// ─── CRUD — Reports ───────────────────────────────────────────────────────────

export async function getReports(): Promise<Report[]> {
  try {
    if (!getIsMongoConfigured()) {
      return globalStore.jalsuraksha_mock_reports || [];
    }

    const collection = await getCollection(REPORTS_COLLECTION);
    const results = await collection.find({}).sort({ createdAt: -1 }).toArray();
    
    return results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })) as unknown as Report[];
  } catch (err) {
    console.error("[MongoDB] getReports failed:", err);
    return [];
  }
}

export async function createReport(payload: Omit<Report, "id" | "createdAt">): Promise<Report> {
  try {
    const now = new Date().toISOString();
    const newDocObj: any = {
      ...payload,
      createdAt: now,
    };

    if (!getIsMongoConfigured()) {
      const mockDoc: Report = {
        ...newDocObj,
        id: "report-" + Math.random().toString(36).substring(2, 9),
      };
      globalStore.jalsuraksha_mock_reports?.push(mockDoc);
      return mockDoc;
    }

    const collection = await getCollection(REPORTS_COLLECTION);
    const result = await collection.insertOne(newDocObj);
    
    return {
      ...newDocObj,
      id: result.insertedId.toString()
    } as unknown as Report;
  } catch (err) {
    console.error("[MongoDB] createReport failed:", err);
    throw err;
  }
}

export async function deleteReport(id: string): Promise<boolean> {
  try {
    const collection = await getCollection(REPORTS_COLLECTION);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (err) {
    console.error("[MongoDB] deleteReport failed:", err);
    return false;
  }
}

// ─── Social Actions ──────────────────────────────────────────────────────────

export async function addReaction(id: string, userId: string): Promise<boolean> {
  try {
    const collection = await getCollection(ISSUES_COLLECTION);
    const issue = await collection.findOne({ _id: new ObjectId(id) });
    if (!issue) return false;
    
    const reactions = issue.reactions || [];
    let updatedReactions;
    
    if (reactions.includes(userId)) {
      updatedReactions = reactions.filter((u: string) => u !== userId);
    } else {
      updatedReactions = [...reactions, userId];
    }
    
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { reactions: updatedReactions, updatedAt: new Date().toISOString() } }
    );
    return true;
  } catch (err) {
    console.error("[MongoDB] addReaction failed:", err);
    return false;
  }
}

export async function addComment(id: string, comment: { userId: string, userName: string, text: string }): Promise<boolean> {
  try {
    const collection = await getCollection(ISSUES_COLLECTION);
    const newComment = {
      ...comment,
      createdAt: new Date().toISOString()
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $push: { comments: newComment as any },
        $set: { updatedAt: new Date().toISOString() }
      }
    );
    return result.modifiedCount === 1;
  } catch (err) {
    console.error("[MongoDB] addComment failed:", err);
    return false;
  }
}


// ─── Users ────────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  try {
    const collection = await getCollection(USERS_COLLECTION);
    const results = await collection.find({}).toArray();
    
    return results.map(doc => ({
      ...doc,
      id: doc._id.toString(),
      _id: undefined
    })) as unknown as User[];
  } catch (err) {
    console.error("[MongoDB] getUsers failed:", err);
    return [];
  }
}
