import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockCandidates } from "@/data/mock-data";
import { PIPELINE_STAGES, STAGE_CONFIG, type Stage, type Candidate } from "@/types/recruiter";
import { GripVertical, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <Link
      to={`/candidates/${candidate.id}`}
      className="glass-card p-3 block hover:border-primary/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {candidate.name}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {candidate.title}
          </p>
          <p className="text-xs text-muted-foreground/70 truncate">{candidate.company}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < candidate.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
              <MapPin className="h-2.5 w-2.5" />
              {candidate.location}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {candidate.skills.slice(0, 2).map((skill) => (
              <span key={skill} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                {skill}
              </span>
            ))}
            {candidate.skills.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/50 text-muted-foreground">
                +{candidate.skills.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Pipeline() {
  const [candidates] = useState<Candidate[]>(mockCandidates);

  const grouped = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage] = candidates.filter((c) => c.stage === stage);
    return acc;
  }, {} as Record<Stage, Candidate[]>);

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {candidates.length} candidates across {PIPELINE_STAGES.length} stages
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {PIPELINE_STAGES.map((stage) => {
            const config = STAGE_CONFIG[stage];
            const items = grouped[stage];
            return (
              <div key={stage} className="kanban-column p-3 min-w-[280px] w-[280px] shrink-0">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className={`badge-stage ${config.color}`}>{config.label}</span>
                    <span className="text-xs text-muted-foreground">{items.length}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {items.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground/50">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
