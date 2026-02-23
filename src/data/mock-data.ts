import { Candidate, Job, Interview, DashboardStats, DocumentFile } from "@/types/recruiter";

export const mockStats: DashboardStats = {
  openRoles: 12,
  activeCandidates: 184,
  interviewsThisWeek: 23,
  hiredThisMonth: 5,
  avgTimeToHire: 28,
  pipelineConversion: 18.5,
};

export const mockJobs: Job[] = [
  { id: "j1", title: "Senior Frontend Engineer", department: "Engineering", location: "Remoto", type: "full-time", status: "open", salary: "$140k - $180k", candidates: 34, createdAt: "2026-01-15", updatedAt: "2026-01-15" },
  { id: "j2", title: "Staff Backend Engineer", department: "Engineering", location: "San Francisco", type: "full-time", status: "open", salary: "$180k - $220k", candidates: 21, createdAt: "2026-01-20", updatedAt: "2026-01-20" },
  { id: "j3", title: "Product Designer", department: "Design", location: "Remoto", type: "full-time", status: "open", salary: "$120k - $160k", candidates: 18, createdAt: "2026-02-01", updatedAt: "2026-02-01" },
  { id: "j4", title: "DevOps Engineer", department: "Infrastructure", location: "NYC", type: "full-time", status: "open", salary: "$150k - $190k", candidates: 12, createdAt: "2026-02-05", updatedAt: "2026-02-05" },
  { id: "j5", title: "ML Engineer", department: "AI/ML", location: "Remoto", type: "contractor", status: "open", salary: "$160k - $200k", candidates: 8, createdAt: "2026-02-10", updatedAt: "2026-02-10" },
  { id: "j6", title: "iOS Developer", department: "Mobile", location: "Austin", type: "full-time", status: "paused", salary: "$130k - $170k", candidates: 15, createdAt: "2025-12-20", updatedAt: "2025-12-20" },
];

export const mockCandidates: Candidate[] = [
  { id: "c1", name: "Alex Rivera", email: "alex@email.com", phone: "+1 (555) 123-4567", avatar: "https://linkedin.com/in/alexriver", title: "Senior React Developer", company: "Stripe", location: "San Francisco", skills: ["React", "TypeScript", "Node.js", "GraphQL"], stage: "Interview", jobId: "j1", rating: 4, appliedAt: "2026-02-01", salary: "$165k", updatedAt: "2026-02-01", linkedinUrl: "https://linkedin.com/in/alexriver" },
  { id: "c2", name: "Sarah Chen", email: "sarah@email.com", phone: "+1 (555) 987-6543", avatar: "https://linkedin.com/in/sarahchen", title: "Full-Stack Engineer", company: "Vercel", location: "Remoto", skills: ["Next.js", "Python", "AWS", "PostgreSQL"], stage: "Interview", jobId: "j2", rating: 5, appliedAt: "2026-01-28", salary: "$195k", updatedAt: "2026-01-28", linkedinUrl: "https://linkedin.com/in/sarahchen" },
  { id: "c3", name: "Marcus Johnson", email: "marcus@email.com", phone: "+1 (555) 234-5678", avatar: "https://linkedin.com/in/marcusjohnson", title: "Frontend Lead", company: "Figma", location: "NYC", skills: ["React", "Vue", "Design Systems", "CSS"], stage: "Screening", jobId: "j1", rating: 3, appliedAt: "2026-02-05", salary: "$145k", updatedAt: "2026-02-05", linkedinUrl: "https://linkedin.com/in/marcusjohnson" },
  { id: "c4", name: "Elena Kowalski", email: "elena@email.com", phone: "+49 30 12345678", avatar: "https://linkedin.com/in/elenakowalski", title: "Product Designer", company: "Linear", location: "Berlin", skills: ["Figma", "Prototyping", "UX Research", "Design Systems"], stage: "Offer", jobId: "j3", rating: 5, appliedAt: "2026-01-22", salary: "$155k", updatedAt: "2026-01-22", linkedinUrl: "https://linkedin.com/in/elenakowalski" },
  { id: "c5", name: "James Park", email: "james@email.com", phone: "+1 (555) 890-1234", avatar: "https://linkedin.com/in/jamespark", title: "Backend Engineer", company: "Datadog", location: "Remoto", skills: ["Go", "Kubernetes", "Terraform", "PostgreSQL"], stage: "Sourced", jobId: "j4", rating: 4, appliedAt: "2026-02-10", salary: "$180k", updatedAt: "2026-02-10", linkedinUrl: "https://linkedin.com/in/jamespark" },
  { id: "c6", name: "Priya Sharma", email: "priya@email.com", phone: "+1 (555) 234-5678", avatar: "https://linkedin.com/in/priyasharma", title: "ML Engineer", company: "OpenAI", location: "San Francisco", skills: ["Python", "PyTorch", "MLOps", "LLMs"], stage: "Interview", jobId: "j5", rating: 5, appliedAt: "2026-02-08", salary: "$190k", updatedAt: "2026-02-08", linkedinUrl: "https://linkedin.com/in/priyasharma" },
  { id: "c7", name: "Tom Müller", email: "tom@email.com", phone: "+49 30 12345678", avatar: "https://linkedin.com/in/tommuller", title: "DevOps Lead", company: "GitLab", location: "Remoto", skills: ["AWS", "Docker", "CI/CD", "Monitoring"], stage: "Sourced", jobId: "j4", rating: 3, appliedAt: "2026-02-12", salary: "$160k", updatedAt: "2026-02-12", linkedinUrl: "https://linkedin.com/tommuller" },
  { id: "c8", name: "Lisa Wang", email: "lisa@email.com", phone: "+1 (555) 345-6789", avatar: "https://linkedin.com/lisawang", title: "iOS Developer", company: "Airbnb", location: "Austin", skills: ["Swift", "SwiftUI", "Objective-C", "CoreData"], stage: "Screening", jobId: "j6", rating: 4, appliedAt: "2026-02-03", salary: "$130k", updatedAt: "2026-02-03", linkedinUrl: "https://linkedin.com/lisawang" },
  { id: "c9", name: "David Kim", email: "david@email.com", phone: "+1 (555) 678-9012", avatar: "https://linkedin.com/davidkim", title: "Staff Engineer", company: "Meta", location: "Menlo Park", skills: ["React", "Relay", "GraphQL", "Performance"], stage: "Technical", jobId: "j1", rating: 5, appliedAt: "2026-01-30", salary: "$210k", updatedAt: "2026-01-30", linkedinUrl: "https://linkedin.com/davidkim" },
  { id: "c10", name: "Anna Petrova", email: "anna@email.com", phone: "+1 (555) 234-5678", avatar: "https://linkedin.com/annapetrova", title: "Frontend Developer", company: "Shopify", location: "Remoto", skills: ["React", "TypeScript", "Tailwind", "Testing"], stage: "Hired", jobId: "j1", rating: 4, appliedAt: "2026-01-10", salary: "$140k", updatedAt: "2026-01-10", linkedinUrl: "https://linkedin.com/annapetrova" },
];

export const mockInterviews: Interview[] = [
  { id: "i1", candidateId: "c1", candidateName: "Alex Rivera", jobTitle: "Senior Frontend Engineer", date: "2026-02-18", time: "10:00", duration: 60, type: "video", status: "scheduled", interviewers: ["John Doe", "Jane Smith"], notes: "Entrevista inicial para evaluar habilidades técnicas", location: "", meetingUrl: "https://zoom.us/j/123456789", updatedAt: "2026-02-18" },
  { id: "i2", candidateId: "c2", candidateName: "Sarah Chen", jobTitle: "Staff Backend Engineer", date: "2026-02-18", time: "14:00", duration: 90, type: "technical", status: "scheduled", interviewers: ["Mike Brown"], notes: "Evaluación técnica de backend y arquitectura", location: "", meetingUrl: "https://zoom.us/j/987654321", updatedAt: "2026-02-18" },
  { id: "i3", candidateId: "c6", candidateName: "Priya Sharma", jobTitle: "ML Engineer", date: "2026-02-19", time: "11:00", duration: 60, type: "video", status: "scheduled", interviewers: ["Jane Smith", "Bob Lee"], notes: "Entrevista sobre experiencia con modelos de lenguaje", location: "", meetingUrl: "https://zoom.us/j/456789123", updatedAt: "2026-02-19" },
  { id: "i4", candidateId: "c4", candidateName: "Elena Kowalski", jobTitle: "Product Designer", date: "2026-02-19", time: "15:30", duration: 45, type: "video", status: "scheduled", interviewers: ["Alice Johnson"], notes: "Revisión de portfolio y evaluación de diseño", location: "", meetingUrl: "https://zoom.us/j/789123456", updatedAt: "2026-02-19" },
  { id: "i5", candidateId: "c9", candidateName: "David Kim", jobTitle: "Senior Frontend Engineer", date: "2026-02-20", time: "09:00", duration: 120, type: "technical", status: "scheduled", interviewers: ["John Doe", "Mike Brown"], notes: "Evaluación técnica profunda de React y arquitectura", location: "", meetingUrl: "https://zoom.us/j/321654987", updatedAt: "2026-02-20" },
  { id: "i6", candidateId: "c3", candidateName: "Marcus Johnson", jobTitle: "Senior Frontend Engineer", date: "2026-02-17", time: "11:00", duration: 30, type: "phone", status: "completed", interviewers: ["Jane Smith"], notes: "Entrevista telefónica de pre-selección", location: "", meetingUrl: "", updatedAt: "2026-02-17" },
];

export const mockDocuments: DocumentFile[] = [
  {
    id: "doc1",
    name: "CV_Alex_Rivera_2026.pdf",
    type: "resume",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "CV_alex_rivera_2026-02-18.pdf",
    fileSize: 245760,
    uploadedAt: "2026-02-18T10:00:00Z"
  },
  {
    id: "doc2", 
    name: "Cover_Letter_Sarah_Chen.pdf",
    type: "cover",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "Cover_sarah_chen_2026-02-15.pdf",
    fileSize: 163840,
    uploadedAt: "2026-02-15T14:30:00Z"
  },
  {
    id: "doc3",
    name: "Portfolio_Elena_Kowalski.pdf",
    type: "portfolio", 
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "Portfolio_elena_kowalski_2026-02-10.pdf",
    fileSize: 5242880,
    uploadedAt: "2026-02-10T09:15:00Z"
  },
  {
    id: "doc4",
    name: "CV_David_Kim_Tech.docx",
    type: "resume",
    fileUrl: "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,UEsDBBQABgA...",
    fileName: "CV_david_kim_tech_2026-02-05.docx",
    fileSize: 327680,
    uploadedAt: "2026-02-05T16:45:00Z"
  },
  {
    id: "doc5",
    name: "CV_Marcus_Johnson_Frontend.pdf",
    type: "resume",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "CV_marcus_johnson_frontend_2026-02-03.pdf",
    fileSize: 286720,
    uploadedAt: "2026-02-03T11:20:00Z"
  },
  {
    id: "doc6",
    name: "Carta_Presentacion_Lisa_Wang.pdf",
    type: "cover",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "Carta_presentacion_lisa_wang_2026-02-01.pdf",
    fileSize: 143360,
    uploadedAt: "2026-02-01T09:45:00Z"
  },
  {
    id: "doc7",
    name: "Portfolio_Priya_Sharma_ML.pdf",
    type: "portfolio",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "Portfolio_priya_sharma_ml_2026-01-28.pdf",
    fileSize: 4194304,
    uploadedAt: "2026-01-28T16:30:00Z"
  },
  {
    id: "doc8",
    "name": "CV_Tom_Muller_DevOps.pdf",
    type: "resume",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "CV_tom_muller_devops_2026-01-25.pdf",
    fileSize: 311296,
    uploadedAt: "2026-01-25T14:15:00Z"
  },
  {
    id: "doc9",
    name: "CV_James_Park_iOS.pdf",
    type: "resume",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "CV_james_park_ios_2026-01-20.pdf",
    fileSize: 262144,
    uploadedAt: "2026-01-20T10:30:00Z"
  },
  {
    id: "doc10",
    name: "CV_Anna_Petrova_Frontend.pdf",
    type: "resume",
    fileUrl: "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nID4+...",
    fileName: "CV_anna_petrova_frontend_2026-01-10.pdf",
    fileSize: 294912,
    uploadedAt: "2026-01-10T15:00:00Z"
  }
];

// Assign documents to candidates
export const candidateDocuments: Record<string, string[]> = {
  "c1": ["doc1"], // Alex Rivera - CV
  "c2": ["doc2", "doc7"], // Sarah Chen - Cover + Portfolio ML
  "c3": ["doc5", "doc6"], // Marcus Johnson - CV + Cover
  "c4": ["doc3"], // Elena Kowalski - Portfolio
  "c5": ["doc8"], // Tom Müller - CV DevOps
  "c6": ["doc7"], // Priya Sharma - Portfolio ML
  "c7": ["doc9"], // James Park - CV iOS
  "c8": ["doc6"], // Lisa Wang - Cover
  "c9": ["doc4", "doc10"], // David Kim - CV + CV Frontend
  "c10": ["doc10"] // Anna Petrova - CV
};

export const recentActivity = [
  { id: "a1", text: "Alex Rivera pasó a la etapa de entrevistas", time: "2h ago", type: "etapa" as const },
  { id: "a2", text: "Sarah Chen completó la evaluación técnica (92%)", time: "3h ago", type: "evaluación" as const },
  { id: "a3", text: "Oferta enviada a Elena Kowalski", time: "5h ago", type: "oferta" as const },
  { id: "a4", text: "Nueva aplicación: Tom Müller para DevOps Engineer", time: "6h ago", type: "aplicación" as const },
  { id: "a5", text: "Anna Petrova aceptó la oferta 🎉", time: "1d ago", type: "contratado" as const },
  { id: "a6", text: "Entrevista programada con Priya Sharma", time: "1d ago", type: "entrevista" as const },
];
