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

async function getCollection(name: string) {
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
    const collection = await getCollection(ISSUES_COLLECTION);
    const now = new Date().toISOString();
    
    const newDoc = {
      ...payload,
      isApproved: false,
      reactions: [],
      comments: [],
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await collection.insertOne(newDoc);
    
    return {
      ...newDoc,
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
    const collection = await getCollection(ISSUES_COLLECTION);
    const updatedAt = new Date().toISOString();
    
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
    const collection = await getCollection(REPORTS_COLLECTION);
    const now = new Date().toISOString();
    
    const newDoc = {
      ...payload,
      createdAt: now,
    };
    
    const result = await collection.insertOne(newDoc);
    
    return {
      ...newDoc,
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
