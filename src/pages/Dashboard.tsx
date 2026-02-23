import {
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  Target,
  ArrowUpRight,
  Video,
  Phone,
  Code,
} from "lucide-react";
import { mockStats, mockInterviews, recentActivity, mockJobs } from "@/data/mock-data";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";

const statCards = [
  { label: "Vacantes abiertas", value: mockStats.openRoles, icon: Briefcase, change: "+2" },
  { label: "Candidatos activos", value: mockStats.activeCandidates, icon: Users, change: "+14" },
  { label: "Entrevistas esta semana", value: mockStats.interviewsThisWeek, icon: Calendar, change: "+5" },
  { label: "Contratados este mes", value: mockStats.hiredThisMonth, icon: TrendingUp, change: "+2" },
  { label: "Tiempo promedio de contratación", value: `${mockStats.avgTimeToHire}d`, icon: Clock, change: "-3d" },
  { label: "Conversión de pipeline", value: `${mockStats.pipelineConversion}%`, icon: Target, change: "+1.2%" },
];

const interviewTypeIcon = { phone: Phone, video: Video, onsite: Briefcase, technical: Code };

export default function Dashboard() {
  const todayInterviews = mockInterviews.filter((i) => i.status === "scheduled").slice(0, 4);

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Panel de Control</h1>
          <p className="text-muted-foreground text-sm mt-1">Bienvenido. Aquí está tu visión de reclutamiento.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <s.icon className="h-4 w-4 text-primary hover:text-primary/80 transition-colors" />
                <span className="text-xs text-success font-medium">{s.change}</span>
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Upcoming Interviews */}
          <div className="lg:col-span-3 glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm">Próximas Entrevistas</h2>
              <Link to="/calendar" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                Ver todas <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {todayInterviews.map((interview) => {
                const Icon = interviewTypeIcon[interview.type];
                return (
                  <div
                    key={interview.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{interview.candidateName}</p>
                      <p className="text-xs text-muted-foreground truncate">{interview.jobTitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">{interview.time}</p>
                      <p className="text-xs text-muted-foreground">{interview.date}</p>
                    </div>
                    <span className="badge-stage bg-primary/15 text-primary">{interview.duration}m</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 glass-card p-5">
            <h2 className="font-semibold text-sm mb-4">Actividad reciente</h2>
            <div className="space-y-3">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="text-sm leading-snug">{a.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Roles */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm">Vacantes Abiertas</h2>
            <Link to="/jobs" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
              Ver todas <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockJobs.filter((j) => j.status === "open").map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
              >
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{job.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {job.department} · {job.location}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">{job.candidates} candidates</span>
                  <span className="text-xs font-medium text-primary">{job.salary}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
