import { Candidate, Job, Interview, DocumentFile, CandidateNote } from '@/types/recruiter';
import { supabase } from '@/integrations/supabase/client';

class DatabaseService {
  // Helper function to get current user
  private async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    return user;
  }

  // Candidates CRUD
  async createCandidate(candidate: Omit<Candidate, 'id' | 'updatedAt'>): Promise<Candidate> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await (supabase as any)
      .from('candidates')
      .insert({
        user_id: user.id,
        name: candidate.name,
        email: candidate.email,
        phone: candidate.phone || '',
        title: candidate.title,
        company: candidate.company,
        location: candidate.location,
        linkedin_url: candidate.linkedinUrl || '',
        resume_url: candidate.resumeUrl || '',
        salary_expectation: candidate.salary || '',
        rating: candidate.rating,
        notes: candidate.notes || '',
      })
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseCandidateToCandidate(data);
  }

  async getCandidate(id: string): Promise<Candidate | null> {
    const { data, error } = await (supabase as any)
      .from('candidates')
      .select(`
        *,
        candidate_skills(skill_name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return this.mapDatabaseCandidateToCandidate(data);
  }

  async getCandidates(includeDeleted = false): Promise<Candidate[]> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await (supabase as any)
      .from('candidates')
      .select(`
        *,
        candidate_skills(skill_name),
        applications!inner(job_id, stage)
      `)
      .eq('user_id', user.id);

    if (error) throw error;
    
    return data.map(this.mapDatabaseCandidateToCandidate);
  }

  async updateCandidate(id: string, updates: Partial<Candidate>): Promise<Candidate> {
    const updateData: any = {};
    
    if (updates.name) updateData.name = updates.name;
    if (updates.email) updateData.email = updates.email;
    if (updates.phone) updateData.phone = updates.phone;
    if (updates.title) updateData.title = updates.title;
    if (updates.company) updateData.company = updates.company;
    if (updates.location) updateData.location = updates.location;
    if (updates.linkedinUrl) updateData.linkedin_url = updates.linkedinUrl;
    if (updates.resumeUrl) updateData.resume_url = updates.resumeUrl;
    if (updates.salary) updateData.salary_expectation = updates.salary;
    if (updates.rating !== undefined) updateData.rating = updates.rating;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    const { data, error } = await (supabase as any)
      .from('candidates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseCandidateToCandidate(data);
  }

  async softDeleteCandidate(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('candidates')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Jobs CRUD
  async createJob(job: Omit<Job, 'id' | 'updatedAt'>): Promise<Job> {
    const user = await this.getCurrentUser();
    
    // Parse salary range to get min/max
    const salaryRange = this.parseSalaryRange(job.salary);
    
    const { data, error } = await (supabase as any)
      .from('jobs')
      .insert({
        user_id: user.id,
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        status: job.status,
        salary_min: salaryRange.min,
        salary_max: salaryRange.max,
        description: job.description || '',
      })
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseJobToJob(data);
  }

  async getJob(id: string): Promise<Job | null> {
    const { data, error } = await (supabase as any)
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return this.mapDatabaseJobToJob(data);
  }

  async getJobs(includeDeleted = false): Promise<Job[]> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await (supabase as any)
      .from('jobs')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;
    
    return data.map(this.mapDatabaseJobToJob);
  }

  async updateJob(id: string, updates: Partial<Job>): Promise<Job> {
    const updateData: any = {};
    
    if (updates.title) updateData.title = updates.title;
    if (updates.department) updateData.department = updates.department;
    if (updates.location) updateData.location = updates.location;
    if (updates.type) updateData.type = updates.type;
    if (updates.status) updateData.status = updates.status;
    if (updates.description) updateData.description = updates.description;
    
    if (updates.salary) {
      const salaryRange = this.parseSalaryRange(updates.salary);
      updateData.salary_min = salaryRange.min;
      updateData.salary_max = salaryRange.max;
    }

    const { data, error } = await (supabase as any)
      .from('jobs')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseJobToJob(data);
  }

  async softDeleteJob(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('jobs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Interviews CRUD
  async createInterview(interview: Omit<Interview, 'id' | 'updatedAt'>): Promise<Interview> {
    // Find the application ID first
    const { data: application, error: appError } = await (supabase as any)
      .from('applications')
      .select('id')
      .eq('candidate_id', interview.candidateId)
      .eq('job_id', interview.jobTitle) // This might need adjustment
      .single();

    if (appError || !application) {
      throw new Error('Application not found for this candidate and job');
    }

    const { data, error } = await (supabase as any)
      .from('interviews')
      .insert({
        application_id: application.id,
        date: interview.date,
        time: interview.time,
        duration: interview.duration,
        type: interview.type,
        status: interview.status,
        interviewers: interview.interviewers,
        notes: interview.notes || '',
        location_url: interview.meetingUrl || interview.location || '',
      })
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseInterviewToInterview(data);
  }

  async getInterview(id: string): Promise<Interview | null> {
    const { data, error } = await (supabase as any)
      .from('interviews')
      .select(`
        *,
        applications!inner(
          candidate_id,
          job_id,
          candidates!inner(name, title, company)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;
    
    return this.mapDatabaseInterviewToInterview(data);
  }

  async getInterviews(includeDeleted = false): Promise<Interview[]> {
    const user = await this.getCurrentUser();
    
    const { data, error } = await (supabase as any)
      .from('interviews')
      .select(`
        *,
        applications!inner(
          candidate_id,
          job_id,
          candidates!inner(name, title, company)
        )
      `)
      .eq('applications.jobs.user_id', user.id);

    if (error) throw error;
    
    return data.map(this.mapDatabaseInterviewToInterview);
  }

  async updateInterview(id: string, updates: Partial<Interview>): Promise<Interview> {
    const updateData: any = {};
    
    if (updates.date) updateData.date = updates.date;
    if (updates.time) updateData.time = updates.time;
    if (updates.duration) updateData.duration = updates.duration;
    if (updates.type) updateData.type = updates.type;
    if (updates.status) updateData.status = updates.status;
    if (updates.interviewers) updateData.interviewers = updates.interviewers;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.meetingUrl) updateData.location_url = updates.meetingUrl;
    if (updates.location) updateData.location_url = updates.location;

    const { data, error } = await (supabase as any)
      .from('interviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return this.mapDatabaseInterviewToInterview(data);
  }

  async softDeleteInterview(id: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('interviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Helper methods for mapping between database and app types
  private mapDatabaseCandidateToCandidate(db: any): Candidate {
    return {
      id: db.id,
      name: db.name,
      email: db.email,
      phone: db.phone,
      title: db.title,
      company: db.company,
      location: db.location,
      skills: [], // This would come from candidate_skills table
      stage: 'Sourced', // This would come from applications table
      jobId: '', // This would come from applications table
      rating: db.rating,
      appliedAt: db.created_at,
      notes: db.notes,
      linkedinUrl: db.linkedin_url,
      resumeUrl: db.resume_url,
      salary: db.salary_expectation,
      updatedAt: db.updated_at,
    };
  }

  private mapDatabaseJobToJob(db: any): Job {
    const salary = db.salary_min && db.salary_max 
      ? `$${db.salary_min}k - $${db.salary_max}k`
      : 'Salary not specified';

    return {
      id: db.id,
      title: db.title,
      department: db.department,
      location: db.location,
      type: db.type as Job['type'],
      status: db.status as Job['status'],
      salary,
      candidates: 0, // This would need a separate query
      createdAt: db.created_at,
      description: db.description,
      updatedAt: db.updated_at,
    };
  }

  private mapDatabaseInterviewToInterview(db: any): Interview {
    return {
      id: db.id,
      candidateId: db.applications?.candidate_id || '',
      candidateName: db.applications?.candidates?.name || '',
      jobTitle: '', // This would need to be fetched from job_id
      date: db.date,
      time: db.time,
      duration: db.duration,
      type: db.type as Interview['type'],
      status: db.status as Interview['status'],
      interviewers: db.interviewers || [],
      notes: db.notes,
      location: db.location_url,
      meetingUrl: db.location_url,
      updatedAt: db.updated_at,
    };
  }

  private parseSalaryRange(salary: string): { min: number; max: number } {
    // Parse salary range like "$80k - $120k"
    const match = salary.match(/\$(\d+)k.*\$(\d+)k/);
    if (match) {
      return {
        min: parseInt(match[1]),
        max: parseInt(match[2]),
      };
    }
    
    // Try to parse single salary like "$100k"
    const singleMatch = salary.match(/\$(\d+)k/);
    if (singleMatch) {
      const value = parseInt(singleMatch[1]);
      return {
        min: value,
        max: value,
      };
    }
    
    return { min: 0, max: 0 };
  }

  // Documents and Notes - These would need additional tables in the database
  async createDocument(document: Omit<DocumentFile, 'id'>): Promise<DocumentFile> {
    // For now, store in localStorage as fallback
    const newDocument: DocumentFile = {
      ...document,
      id: crypto.randomUUID(),
    };
    
    const existing = localStorage.getItem('documents');
    const documents = existing ? JSON.parse(existing) : [];
    documents.push(newDocument);
    localStorage.setItem('documents', JSON.stringify(documents));
    
    return newDocument;
  }

  async getDocumentsByCandidate(candidateId: string): Promise<DocumentFile[]> {
    const existing = localStorage.getItem('documents');
    const documents = existing ? JSON.parse(existing) : [];
    return documents.filter((doc: DocumentFile) => doc.fileName.includes(candidateId));
  }

  async deleteDocument(id: string): Promise<void> {
    const existing = localStorage.getItem('documents');
    const documents = existing ? JSON.parse(existing) : [];
    const filtered = documents.filter((doc: DocumentFile) => doc.id !== id);
    localStorage.setItem('documents', JSON.stringify(filtered));
  }

  async createNote(note: Omit<CandidateNote, 'id' | 'createdAt' | 'updatedAt'>): Promise<CandidateNote> {
    const newNote: CandidateNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const existing = localStorage.getItem('notes');
    const notes = existing ? JSON.parse(existing) : [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    return newNote;
  }

  async getNotesByCandidate(candidateId: string): Promise<CandidateNote[]> {
    const existing = localStorage.getItem('notes');
    const notes = existing ? JSON.parse(existing) : [];
    return notes
      .filter((note: CandidateNote) => note.candidateId === candidateId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateNote(id: string, content: string): Promise<CandidateNote> {
    const existing = localStorage.getItem('notes');
    const notes = existing ? JSON.parse(existing) : [];
    const noteIndex = notes.findIndex((note: CandidateNote) => note.id === id);
    
    if (noteIndex === -1) throw new Error('Note not found');
    
    notes[noteIndex] = {
      ...notes[noteIndex],
      content,
      updatedAt: new Date().toISOString(),
    };
    
    localStorage.setItem('notes', JSON.stringify(notes));
    return notes[noteIndex];
  }

  async deleteNote(id: string): Promise<void> {
    const existing = localStorage.getItem('notes');
    const notes = existing ? JSON.parse(existing) : [];
    const filtered = notes.filter((note: CandidateNote) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(filtered));
  }
}

export const db = new DatabaseService();
