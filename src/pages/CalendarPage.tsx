import { AppLayout } from "@/components/layout/AppLayout";
import { mockInterviews } from "@/data/mock-data";
import { Video, Phone, Code, Briefcase, Clock } from "lucide-react";

const typeIcon = { phone: Phone, video: Video, onsite: Briefcase, technical: Code };
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`);

export default function CalendarPage() {
  // Group interviews by date
  const byDate = mockInterviews.reduce((acc, i) => {
    if (!acc[i.date]) acc[i.date] = [];
    acc[i.date].push(i);
    return acc;
  }, {} as Record<string, typeof mockInterviews>);

  const dates = Object.keys(byDate).sort();

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground text-sm mt-1">Upcoming interviews and events</p>
        </div>

        {/* Agenda View */}
        <div className="space-y-6">
          {dates.map((date) => {
            const interviews = byDate[date];
            const d = new Date(date);
            const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
            const dateStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
            const isToday = date === new Date().toISOString().split("T")[0];

            return (
              <div key={date}>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="font-semibold text-sm">
                    {dayName}, {dateStr}
                  </h2>
                  {isToday && (
                    <span className="badge-stage bg-primary/15 text-primary">Today</span>
                  )}
                </div>
                <div className="space-y-2">
                  {interviews.map((interview) => {
                    const Icon = typeIcon[interview.type];
                    return (
                      <div
                        key={interview.id}
                        className="glass-card p-4 flex items-center gap-4 hover:border-primary/30 transition-all"
                      >
                        <div className="text-center shrink-0 w-16">
                          <p className="text-lg font-bold text-primary">{interview.time}</p>
                          <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                            <Clock className="h-2.5 w-2.5" /> {interview.duration}m
                          </p>
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{interview.candidateName}</p>
                          <p className="text-xs text-muted-foreground">{interview.jobTitle}</p>
                          <p className="text-xs text-muted-foreground/70 mt-0.5">
                            with {interview.interviewers.join(", ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="badge-stage bg-secondary text-secondary-foreground capitalize">
                            {interview.type}
                          </span>
                          <span className={`badge-stage ${
                            interview.status === "completed" ? "bg-success/20 text-success" :
                            interview.status === "scheduled" ? "bg-primary/15 text-primary" :
                            "bg-destructive/20 text-destructive"
                          }`}>
                            {interview.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
