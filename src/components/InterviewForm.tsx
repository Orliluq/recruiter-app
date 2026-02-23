import React, { useState, useEffect } from 'react';
import { Video, Phone, Code, Briefcase, Clock, Plus, Edit2, Trash2, Users, MapPin, X, Save } from "lucide-react";
import { Interview } from '@/types/recruiter';
import { db } from '@/services/database';

interface InterviewFormProps {
  interview?: Interview;
  onClose: () => void;
  onSave: (interview: Interview) => void;
}

export const InterviewForm: React.FC<InterviewFormProps> = ({ interview, onClose, onSave }) => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    candidateId: '',
    candidateName: '',
    jobTitle: '',
    date: '',
    time: '',
    duration: 60,
    type: 'video' as Interview['type'],
    status: 'scheduled' as Interview['status'],
    interviewers: [''],
    location: '',
    meetingUrl: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
    if (interview) {
      setFormData({
        candidateId: interview.candidateId,
        candidateName: interview.candidateName,
        jobTitle: interview.jobTitle,
        date: interview.date,
        time: interview.time,
        duration: interview.duration,
        type: interview.type,
        status: interview.status,
        interviewers: interview.interviewers.length > 0 ? interview.interviewers : [''],
        location: interview.location || '',
        meetingUrl: interview.meetingUrl || '',
        notes: interview.notes || '',
      });
    }
  }, [interview]);

  const loadData = async () => {
    try {
      const [candidatesData, jobsData] = await Promise.all([
        db.getCandidates(),
        db.getJobs(),
      ]);
      setCandidates(candidatesData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.candidateId || !formData.jobTitle || !formData.date || !formData.time) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    setIsLoading(true);
    try {
      const interviewData = {
        ...formData,
        interviewers: formData.interviewers.filter(i => i.trim()),
      };

      let savedInterview: Interview;

      if (interview) {
        // Update existing interview
        savedInterview = await db.updateInterview(interview.id, interviewData);
      } else {
        // Create new interview
        savedInterview = await db.createInterview(interviewData);
      }

      onSave(savedInterview);
      onClose();
    } catch (error) {
      console.error('Error saving interview:', error);
      alert('Error al guardar la entrevista');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCandidateChange = (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      setFormData(prev => ({
        ...prev,
        candidateId,
        candidateName: candidate.name,
      }));
    }
  };

  const addInterviewer = () => {
    setFormData(prev => ({
      ...prev,
      interviewers: [...prev.interviewers, ''],
    }));
  };

  const updateInterviewer = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.map((interviewer, i) => 
        i === index ? value : interviewer
      ),
    }));
  };

  const removeInterviewer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.filter((_, i) => i !== index),
    }));
  };

  const getTypeIcon = (type: Interview['type']) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'onsite': return MapPin;
      case 'technical': return Users;
      default: return Video;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col border border-border/50 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {interview ? 'Editar Entrevista' : 'Nueva Entrevista'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {interview ? 'Actualiza la información de la entrevista existente' : 'Programa una nueva entrevista con el candidato'}
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
            {/* Interview Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Detalles de la Entrevista
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Candidato *
                    </label>
                    <select
                      name="candidateId"
                      value={formData.candidateId}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    >
                      <option value="">Seleccionar candidato</option>
                      {candidates.map((candidate) => (
                        <option key={candidate.id} value={candidate.id}>
                          {candidate.name} - {candidate.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Vacante
                    </label>
                    <select
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                    >
                      <option value="">Seleccionar vacante</option>
                      {jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title} - {job.department}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hora *
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Duración (minutos) *
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="15"
                      max="180"
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Interview Type and Status */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Tipo y Estado
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo de Entrevista *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
                      required
                    >
                      <option value="video">Video</option>
                      <option value="phone">Llamada</option>
                      <option value="onsite">Presencial</option>
                      <option value="technical">Técnica</option>
                    </select>
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
                      <option value="scheduled">Programado</option>
                      <option value="completed">Completado</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="no-show">Por Revisar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interviewers */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Entrevistadores
                </h3>
                <div className="space-y-3">
                  {formData.interviewers.map((interviewer, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="text"
                        value={interviewer}
                        onChange={(e) => updateInterviewer(index, e.target.value)}
                        className="flex-1 p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                        placeholder="Nombre del entrevistador"
                      />
                      <button
                        type="button"
                        onClick={() => removeInterviewer(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInterviewer}
                    className="w-full p-3 border border-dashed border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-primary"
                  >
                    <Plus className="h-4 w-4 inline-block mr-2" />
                    Agregar Entrevistador
                  </button>
                </div>
              </div>

              {/* Location/URL */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Ubicación y Contacto
                </h3>
                {(formData.type === 'video' || formData.type === 'phone') && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      URL de Reunión
                    </label>
                    <input
                      type="url"
                      name="meetingUrl"
                      value={formData.meetingUrl}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="https://zoom.us/j/123456789"
                    />
                  </div>
                )}

                {formData.type === 'onsite' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-3 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                      placeholder="Dirección de la entrevista"
                    />
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border/50">
                  Notas
                </h3>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  placeholder="Notas sobre la entrevista, puntos a evaluar, etc..."
                />
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
                {interview ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {interview ? 'Actualizar Entrevista' : 'Crear Entrevista'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
