import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockCandidates, mockInterviews } from "@/data/mock-data";
import { STAGE_CONFIG } from "@/types/recruiter";
import { ArrowLeft, Mail, MapPin, Briefcase, Star, Calendar, DollarSign, ExternalLink } from "lucide-react";

export default function CandidateProfile() {
  const { id } = useParams();
  const candidate = mockCandidates.find((c) => c.id === id);
  const interviews = mockInterviews.filter((i) => i.candidateId === id);

  if (!candidate) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-muted-foreground">Candidate not found</div>
      </AppLayout>
    );
  }

  const stage = STAGE_CONFIG[candidate.stage];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <Link to="/candidates" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to candidates
        </Link>

        {/* Header */}
        <div className="glass-card p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center text-xl font-bold text-primary">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h1 className="text-xl font-semibold">{candidate.name}</h1>
                <p className="text-sm text-muted-foreground">{candidate.title} @ {candidate.company}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {candidate.location}</span>
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {candidate.email}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge-stage ${stage.color}`}>{stage.label}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < candidate.rating ? "text-warning fill-warning" : "text-muted-foreground/20"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Skills */}
            <div className="glass-card p-5">
              <h2 className="font-semibold text-sm mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">{skill}</span>
                ))}
              </div>
            </div>

            {/* Interviews */}
            <div className="glass-card p-5">
              <h2 className="font-semibold text-sm mb-3">Interviews</h2>
              {interviews.length > 0 ? (
                <div className="space-y-3">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                      <Calendar className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium capitalize">{interview.type} Interview</p>
                        <p className="text-xs text-muted-foreground">
                          {interview.date} at {interview.time} · {interview.duration}min · {interview.interviewers.join(", ")}
                        </p>
                      </div>
                      <span className={`badge-stage ${
                        interview.status === "completed" ? "bg-success/20 text-success" :
                        interview.status === "scheduled" ? "bg-primary/15 text-primary" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No interviews scheduled</p>
              )}
            </div>
          </div>

          {/* Sidebar info */}
          <div className="space-y-4">
            {candidate.salary && (
              <div className="glass-card p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <DollarSign className="h-3 w-3" /> Expected Salary
                </div>
                <p className="text-sm font-medium">{candidate.salary}</p>
              </div>
            )}
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Briefcase className="h-3 w-3" /> Applied For
              </div>
              <Link to={`/jobs/${candidate.jobId}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View Job <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
            <div className="glass-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Applied</div>
              <p className="text-sm font-medium">{candidate.appliedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
