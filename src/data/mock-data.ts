import { Candidate, Job, Interview, DashboardStats } from "@/types/recruiter";

export const mockStats: DashboardStats = {
  openRoles: 12,
  activeCandidates: 184,
  interviewsThisWeek: 23,
  hiredThisMonth: 5,
  avgTimeToHire: 28,
  pipelineConversion: 18.5,
};

export const mockJobs: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "full-time", status: "open", salary: "$140k - $180k", candidates: 34, createdAt: "2026-01-15" },
  { id: "j2", title: "Staff Backend Engineer", department: "Engineering", location: "San Francisco", type: "full-time", status: "open", salary: "$180k - $220k", candidates: 21, createdAt: "2026-01-20" },
  { id: "j3", title: "Product Designer", department: "Design", location: "Remote", type: "full-time", status: "open", salary: "$120k - $160k", candidates: 18, createdAt: "2026-02-01" },
  { id: "j4", title: "DevOps Engineer", department: "Infrastructure", location: "NYC", type: "full-time", status: "open", salary: "$150k - $190k", candidates: 12, createdAt: "2026-02-05" },
  { id: "j5", title: "ML Engineer", department: "AI/ML", location: "Remote", type: "contract", status: "open", salary: "$160k - $200k", candidates: 8, createdAt: "2026-02-10" },
  { id: "j6", title: "iOS Developer", department: "Mobile", location: "Austin", type: "full-time", status: "paused", salary: "$130k - $170k", candidates: 15, createdAt: "2025-12-20" },
];

export const mockCandidates: Candidate[] = [
  { id: "c1", name: "Alex Rivera", email: "alex@email.com", title: "Senior React Developer", company: "Stripe", location: "San Francisco", skills: ["React", "TypeScript", "Node.js", "GraphQL"], stage: "interview", jobId: "j1", rating: 4, appliedAt: "2026-02-01", salary: "$165k" },
  { id: "c2", name: "Sarah Chen", email: "sarah@email.com", title: "Full-Stack Engineer", company: "Vercel", location: "Remote", skills: ["Next.js", "Python", "AWS", "PostgreSQL"], stage: "technical", jobId: "j2", rating: 5, appliedAt: "2026-01-28", salary: "$195k" },
  { id: "c3", name: "Marcus Johnson", email: "marcus@email.com", title: "Frontend Lead", company: "Figma", location: "NYC", skills: ["React", "Vue", "Design Systems", "CSS"], stage: "screening", jobId: "j1", rating: 3, appliedAt: "2026-02-05" },
  { id: "c4", name: "Elena Kowalski", email: "elena@email.com", title: "Product Designer", company: "Linear", location: "Berlin", skills: ["Figma", "Prototyping", "UX Research", "Design Systems"], stage: "offer", jobId: "j3", rating: 5, appliedAt: "2026-01-22", salary: "$155k" },
  { id: "c5", name: "James Park", email: "james@email.com", title: "Backend Engineer", company: "Datadog", location: "Remote", skills: ["Go", "Kubernetes", "Terraform", "PostgreSQL"], stage: "sourced", jobId: "j4", rating: 4, appliedAt: "2026-02-10" },
  { id: "c6", name: "Priya Sharma", email: "priya@email.com", title: "ML Engineer", company: "OpenAI", location: "San Francisco", skills: ["Python", "PyTorch", "MLOps", "LLMs"], stage: "interview", jobId: "j5", rating: 5, appliedAt: "2026-02-08", salary: "$190k" },
  { id: "c7", name: "Tom Müller", email: "tom@email.com", title: "DevOps Lead", company: "GitLab", location: "Remote", skills: ["AWS", "Docker", "CI/CD", "Monitoring"], stage: "sourced", jobId: "j4", rating: 3, appliedAt: "2026-02-12" },
  { id: "c8", name: "Lisa Wang", email: "lisa@email.com", title: "iOS Developer", company: "Airbnb", location: "Austin", skills: ["Swift", "SwiftUI", "Objective-C", "CoreData"], stage: "screening", jobId: "j6", rating: 4, appliedAt: "2026-02-03" },
  { id: "c9", name: "David Kim", email: "david@email.com", title: "Staff Engineer", company: "Meta", location: "Menlo Park", skills: ["React", "Relay", "GraphQL", "Performance"], stage: "technical", jobId: "j1", rating: 5, appliedAt: "2026-01-30", salary: "$210k" },
  { id: "c10", name: "Anna Petrova", email: "anna@email.com", title: "Frontend Developer", company: "Shopify", location: "Remote", skills: ["React", "TypeScript", "Tailwind", "Testing"], stage: "hired", jobId: "j1", rating: 4, appliedAt: "2026-01-10" },
];

export const mockInterviews: Interview[] = [
  { id: "i1", candidateId: "c1", candidateName: "Alex Rivera", jobTitle: "Senior Frontend Engineer", date: "2026-02-18", time: "10:00", duration: 60, type: "video", status: "scheduled", interviewers: ["John Doe", "Jane Smith"] },
  { id: "i2", candidateId: "c2", candidateName: "Sarah Chen", jobTitle: "Staff Backend Engineer", date: "2026-02-18", time: "14:00", duration: 90, type: "technical", status: "scheduled", interviewers: ["Mike Brown"] },
  { id: "i3", candidateId: "c6", candidateName: "Priya Sharma", jobTitle: "ML Engineer", date: "2026-02-19", time: "11:00", duration: 60, type: "video", status: "scheduled", interviewers: ["Jane Smith", "Bob Lee"] },
  { id: "i4", candidateId: "c4", candidateName: "Elena Kowalski", jobTitle: "Product Designer", date: "2026-02-19", time: "15:30", duration: 45, type: "video", status: "scheduled", interviewers: ["Alice Johnson"] },
  { id: "i5", candidateId: "c9", candidateName: "David Kim", jobTitle: "Senior Frontend Engineer", date: "2026-02-20", time: "09:00", duration: 120, type: "technical", status: "scheduled", interviewers: ["John Doe", "Mike Brown"] },
  { id: "i6", candidateId: "c3", candidateName: "Marcus Johnson", jobTitle: "Senior Frontend Engineer", date: "2026-02-17", time: "11:00", duration: 30, type: "phone", status: "completed", interviewers: ["Jane Smith"] },
];

export const recentActivity = [
  { id: "a1", text: "Alex Rivera moved to Interview stage", time: "2h ago", type: "stage" as const },
  { id: "a2", text: "Sarah Chen completed technical assessment (92%)", time: "3h ago", type: "evaluation" as const },
  { id: "a3", text: "Offer sent to Elena Kowalski", time: "5h ago", type: "offer" as const },
  { id: "a4", text: "New application: Tom Müller for DevOps Engineer", time: "6h ago", type: "application" as const },
  { id: "a5", text: "Anna Petrova accepted offer 🎉", time: "1d ago", type: "hired" as const },
  { id: "a6", text: "Interview scheduled with Priya Sharma", time: "1d ago", type: "interview" as const },
];
