// src/types/user.ts
export type UserStatus = "active" | "suspended" | "flagged";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActivity: string; // ISO date string
  status: UserStatus;
  riskLevel: "low" | "medium" | "high";
  flaggedActivities: number;
}