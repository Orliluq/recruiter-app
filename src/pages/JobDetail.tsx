import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockJobs, mockCandidates } from "@/data/mock-data";
import { STAGE_CONFIG } from "@/types/recruiter";
import { ArrowLeft, MapPin, Users, DollarSign, Clock, Star } from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);
  const candidates = mockCandidates.filter((c) => c.jobId === id);

  if (!job) {
    return (
      <AppLayout>
        <div className="text-center py-20 text-muted-foreground">Vacante no encontrada</div>
      </AppLayout>
    );
  }

  const statusColor: Record<string, string> = {
    abierta: "bg-success/20 text-success",
    pausada: "bg-warning/20 text-warning",
    cerrada: "bg-muted text-muted-foreground",
    eliminado: "bg-secondary text-secondary-foreground",
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <Link to="/jobs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Volver a vacantes
        </Link>

        <div className="glass-card p-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-semibold">{job.title}</h1>
              <p className="text-sm text-muted-foreground mt-1">{job.department} · {job.type}</p>
            </div>
            <span className={`badge-stage ${statusColor[job.status]}`}>{job.status}</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {candidates.length} candidatos</span>
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Creada {job.createdAt}</span>
          </div>
        </div>

        {/* Candidates for this job */}
        <div className="glass-card p-5">
          <h2 className="font-semibold text-sm mb-4">Candidatos ({candidates.length})</h2>
          {candidates.length > 0 ? (
            <div className="space-y-2">
              {candidates.map((c) => {
                const stage = STAGE_CONFIG[c.stage];
                return (
                  <Link
                    key={c.id}
                    to={`/candidates/${c.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.title} @ {c.company}</p>
                    </div>
                    <div className="gap-0.5 hidden sm:flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < c.rating ? "text-warning fill-warning" : "text-muted-foreground/20"}`} />
                      ))}
                    </div>
                    <span className={`badge-stage ${stage.color}`}>{stage.label}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay candidatos aún</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
