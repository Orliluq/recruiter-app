import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Job } from '@/types/recruiter';
import { db } from '@/services/database';

interface JobFormProps {
  job?: Job;
  onClose: () => void;
  onSave: (job: Job) => void;
}

export const JobForm: React.FC<JobFormProps> = ({ job, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time' as Job['type'],
    status: 'open' as Job['status'],
    salary: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        status: job.status,
        salary: job.salary,
        description: job.description || '',
      });
    }
  }, [job]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.department || !formData.location || !formData.salary) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);
    try {
      let savedJob: Job;

      if (job) {
        // Update existing job
        savedJob = await db.updateJob(job.id, formData);
      } else {
        // Create new job
        savedJob = await db.createJob({
          ...formData,
          candidates: 0,
          createdAt: new Date().toISOString(),
        });
      }

      onSave(savedJob);
      onClose();
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error al guardar la vacante');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-border/50 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {job ? 'Editar Vacante' : 'Nueva Vacante'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {job ? 'Actualiza la información de la vacante existente' : 'Crea una nueva vacante para tu equipo'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Información Básica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Título de la Vacante *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Ej: Senior Frontend Developer"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Departamento *
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Ej: Engineering"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Ubicación *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Ej: Remoto, NYC, San Francisco"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo de Empleo *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    >
                      <option value="full-time">Tiempo Completo</option>
                      <option value="part-time">Medio Tiempo</option>
                      <option value="contractor">Contratista</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Detalles del Empleo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Salario *
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Ej: $80k - $120k"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Estado *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    >
                      <option value="open">Abierto</option>
                      <option value="paused">Pausado</option>
                      <option value="closed">Cerrado</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Descripción
                </h3>
                <div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-4 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                    placeholder="Describe la vacante, responsabilidades, requisitos, beneficios, etc..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Actions - Fixed at bottom */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-card/50 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                Guardando...
              </>
            ) : (
              <>
                {job ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {job ? 'Actualizar Vacante' : 'Crear Vacante'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
