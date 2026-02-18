import { AppLayout } from "@/components/layout/AppLayout";
import { mockJobs } from "@/data/mock-data";
import { Link } from "react-router-dom";
import { Users, MapPin, Clock } from "lucide-react";

const statusColor: Record<string, string> = {
  open: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
  closed: "bg-muted text-muted-foreground",
  draft: "bg-secondary text-secondary-foreground",
};

export default function Jobs() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground text-sm mt-1">{mockJobs.length} roles</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockJobs.map((job) => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="glass-card p-5 hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{job.title}</h3>
                <span className={`badge-stage ${statusColor[job.status]}`}>{job.status}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{job.department} · {job.type}</p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {job.location}</div>
                <div className="flex items-center gap-1.5"><Users className="h-3 w-3" /> {job.candidates} candidates</div>
                <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Created {job.createdAt}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="text-sm font-medium text-primary">{job.salary}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
