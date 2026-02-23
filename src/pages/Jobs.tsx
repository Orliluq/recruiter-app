import { useState, useEffect } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import { Users, MapPin, Clock, Plus, Edit2, Trash2 } from "lucide-react";
import { Job } from "@/types/recruiter";
import { db } from "@/services/database";
import { mockJobs } from "@/data/mock-data";
import { JobForm } from "@/components/JobForm";

const statusColor: Record<string, string> = {
  open: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
  closed: "bg-muted text-muted-foreground",
  deleted: "bg-secondary text-secondary-foreground",
};

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      // Temporarily use mock data until Supabase is configured
      setJobs(mockJobs);
      // Uncomment this line when Supabase is properly configured
      // const jobsData = await db.getJobs();
      // setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // Fallback to mock data
      setJobs(mockJobs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveJob = (savedJob: Job) => {
    loadJobs();
    setShowForm(false);
    setEditingJob(undefined);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleDeleteJob = async (job: Job) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar la vacante "${job.title}"?`)) {
      return;
    }

    try {
      await db.softDeleteJob(job.id);
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Error al eliminar la vacante');
    }
  };

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
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Vacantes</h1>
            <p className="text-muted-foreground text-sm mt-1">{jobs.length} vacantes disponibles</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <Plus className="h-4 w-4" />
            Nueva Vacante
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="glass-card p-5 hover:border-primary/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <Link 
                  to={`/jobs/${job.id}`}
                  className="font-semibold text-sm group-hover:text-primary transition-colors flex-1"
                >
                  {job.title}
                </Link>
                <div className="flex items-center gap-1 ml-2">
                  <button
                    onClick={() => handleEditJob(job)}
                    className="p-1 text-muted-foreground hover:text-yellow-500 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-4">{job.department} · {job.type}</p>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-red-700 hover:text-red-500 transition-colors" /> {job.location}</div>
                <div className="flex items-center gap-1.5"><Users className="h-3 w-3 text-blue-700 hover:text-blue-500 transition-colors" /> {job.candidates} candidatos</div>
                <div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-purple-700 hover:text-purple-500 transition-colors" /> Creada {job.createdAt}</div>
              </div>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="text-sm font-medium text-primary">{job.salary}</span>
                <span className={`badge-stage ${statusColor[job.status]} ml-2`}>{job.status}</span>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <JobForm
            job={editingJob}
            onClose={() => {
              setShowForm(false);
              setEditingJob(undefined);
            }}
            onSave={handleSaveJob}
          />
        )}
      </div>
    </AppLayout>
  );
}
