export type Stage = "sourced" | "screening" | "interview" | "technical" | "offer" | "hired" | "rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  stage: Stage;
  jobId: string;
  rating: number;
  appliedAt: string;
  notes?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  salary?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "freelance";
  status: "open" | "closed" | "paused" | "draft";
  salary: string;
  candidates: number;
  createdAt: string;
  description?: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar?: string;
  jobTitle: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: "phone" | "video" | "onsite" | "technical";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  interviewers: string[];
  notes?: string;
}

export interface DashboardStats {
  openRoles: number;
  activeCandidates: number;
  interviewsThisWeek: number;
  hiredThisMonth: number;
  avgTimeToHire: number;
  pipelineConversion: number;
}

export const STAGE_CONFIG: Record<Stage, { label: string; color: string }> = {
  sourced: { label: "Sourced", color: "bg-info/20 text-info" },
  screening: { label: "Screening", color: "bg-warning/20 text-warning" },
  interview: { label: "Interview", color: "bg-primary/20 text-primary" },
  technical: { label: "Technical", color: "bg-accent-foreground/20 text-accent-foreground" },
  offer: { label: "Offer", color: "bg-success/20 text-success" },
  hired: { label: "Hired", color: "bg-success/20 text-success" },
  rejected: { label: "Rejected", color: "bg-destructive/20 text-destructive" },
};

export const PIPELINE_STAGES: Stage[] = ["sourced", "screening", "interview", "technical", "offer", "hired"];
