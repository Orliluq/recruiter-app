import { useState, useEffect } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Video, Phone, Code, Briefcase, Clock, Plus, Edit2, Trash2 } from "lucide-react";
import { Interview } from "@/types/recruiter";
import { db } from "@/services/database";
import { InterviewForm } from "@/components/InterviewForm";
import { mockInterviews } from "@/data/mock-data";

const typeIcon = { phone: Phone, video: Video, onsite: Briefcase, technical: Code };
const days = ["Lun", "Mar", "Mie", "Jue", "Vie"];
const hours = Array.from({ length: 10 }, (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`);

export default function CalendarPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      // Temporarily use mock data until Supabase is configured
      setInterviews(mockInterviews);
      // Uncomment this line when Supabase is properly configured
      // const interviewsData = await db.getInterviews();
      // setInterviews(interviewsData);
    } catch (error) {
      console.error('Error loading interviews:', error);
      // Fallback to mock data
      setInterviews(mockInterviews);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveInterview = (savedInterview: Interview) => {
    loadInterviews();
    setShowForm(false);
    setEditingInterview(undefined);
  };

  const handleEditInterview = (interview: Interview) => {
    setEditingInterview(interview);
    setShowForm(true);
  };

  const handleDeleteInterview = async (interview: Interview) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la entrevista con "${interview.candidateName}"?`)) {
      return;
    }

    try {
      await db.softDeleteInterview(interview.id);
      loadInterviews();
    } catch (error) {
      console.error('Error deleting interview:', error);
      alert('Error al eliminar la entrevista');
    }
  };

  // Group interviews by date
  const byDate = interviews.reduce((acc, i) => {
    if (!acc[i.date]) acc[i.date] = [];
    acc[i.date].push(i);
    return acc;
  }, {} as Record<string, Interview[]>);

  const dates = Object.keys(byDate).sort();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Cargando...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendario</h1>
            <p className="text-muted-foreground text-sm mt-1">Entrevistas y eventos próximos</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-4 w-4" />
            Nueva Entrevista
          </button>
        </div>

        {/* Agenda View */}
        <div className="space-y-6">
          {dates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <p className="text-lg font-medium mb-2">No hay entrevistas programadas</p>
                <p className="text-sm">Haz clic en "Nueva Entrevista" para agregar una</p>
              </div>
            </div>
          ) : (
            dates.map((date) => {
              const interviews = byDate[date];
              const d = new Date(date);
              const dayName = d.toLocaleDateString("es-ES", { weekday: "long" });
              const dateStr = d.toLocaleDateString("es-ES", { month: "long", day: "numeric", year: "numeric" });
              const isToday = date === new Date().toISOString().split("T")[0];

              return (
                <div key={date} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-lg font-bold">
                      {dayName}, {dateStr}
                    </h2>
                    {isToday && (
                      <span className="badge-stage bg-primary/15 text-primary">Hoy</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {interviews.map((interview) => {
                      const Icon = typeIcon[interview.type];
                      return (
                        <div
                          key={interview.id}
                          className="glass-card p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:border-primary/30 transition-all"
                        >
                          <div className="text-center shrink-0 w-14 sm:w-16">
                            <p className="text-base sm:text-lg font-bold text-primary">{interview.time}</p>
                            <p className="text-[9px] sm:text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                              <Clock className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-purple-700 hover:text-purple-500" /> {interview.duration}m
                            </p>
                          </div>
                          <div className="h-8 sm:h-10 w-px bg-border hidden sm:block" />
                          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{interview.candidateName}</p>
                            <p className="text-xs text-muted-foreground truncate">{interview.jobTitle}</p>
                            <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
                              con {interview.interviewers.join(", ")}
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
                            <button
                              onClick={() => handleEditInterview(interview)}
                              className="p-1 text-muted-foreground hover:text-yellow-500 transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleDeleteInterview(interview)}
                              className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {showForm && (
          <InterviewForm
            interview={editingInterview}
            onClose={() => {
              setShowForm(false);
              setEditingInterview(undefined);
            }}
            onSave={handleSaveInterview}
          />
        )}
      </div>
    </AppLayout>
  );
}
