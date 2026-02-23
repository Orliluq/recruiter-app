export type Stage = "Sourced" | "Screening" | "Interview" | "Technical" | "Offer" | "Hired" | "Rejected";

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
  documents?: DocumentFile[];
  isDeleted?: boolean;
  deletedAt?: string;
  updatedAt: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'resume' | 'cover' | 'portfolio' | 'other';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export interface CandidateNote {
  id: string;
  candidateId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contractor" | "freelance";
  status: "open" | "closed" | "paused" | "deleted";
  salary: string;
  candidates: number;
  createdAt: string;
  description?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  updatedAt: string;
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
  type: 'phone' | 'video' | 'onsite' | 'technical';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  interviewers: string[];
  notes?: string;
  location?: string;
  meetingUrl?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  updatedAt: string;
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
  "Sourced": { label: "Inicios", color: "bg-info/20 text-info" },
  "Screening": { label: "Revisión", color: "bg-warning/20 text-warning" },
  "Interview": { label: "Entrevista", color: "bg-primary/20 text-primary" },
  "Technical": { label: "Técnica", color: "bg-accent-foreground/20 text-accent-foreground" },
  "Offer": { label: "Oferta", color: "bg-success/20 text-success" },
  "Hired": { label: "Contratado", color: "bg-success/20 text-success" },
  "Rejected": { label: "Rechazado", color: "bg-destructive/20 text-destructive" },
};

export const PIPELINE_STAGES: Stage[] = ["Sourced", "Screening", "Interview", "Technical", "Offer", "Hired"];
