export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          avatar_url: string | null
          company: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          avatar_url: string | null
          company: string
          phone: string
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          user_id: string
          name: string
          avatar_url: string | null
          company: string
          phone: string
          created_at: string
          updated_at: string
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          title: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'freelance'
          status: 'open' | 'closed' | 'paused' | 'draft'
          salary_min: number | null
          salary_max: number | null
          description: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          title: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'freelance'
          status: 'open' | 'closed' | 'paused' | 'draft'
          salary_min: number | null
          salary_max: number | null
          description: string
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          user_id: string
          title: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'freelance'
          status: 'open' | 'closed' | 'paused' | 'draft'
          salary_min: number | null
          salary_max: number | null
          description: string
          created_at: string
          updated_at: string
        }
      }
      candidates: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          title: string
          company: string
          location: string
          linkedin_url: string
          resume_url: string
          salary_expectation: string
          rating: number
          notes: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          title: string
          company: string
          location: string
          linkedin_url: string
          resume_url: string
          salary_expectation: string
          rating: number
          notes: string
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          user_id: string
          name: string
          email: string
          phone: string
          title: string
          company: string
          location: string
          linkedin_url: string
          resume_url: string
          salary_expectation: string
          rating: number
          notes: string
          created_at: string
          updated_at: string
        }
      }
      candidate_skills: {
        Row: {
          id: string
          candidate_id: string
          skill_name: string
        }
        Insert: {
          id: string
          candidate_id: string
          skill_name: string
        }
        Update: {
          id: string
          candidate_id: string
          skill_name: string
        }
      }
      applications: {
        Row: {
          id: string
          candidate_id: string
          job_id: string
          stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          applied_at: string
          updated_at: string
        }
        Insert: {
          id: string
          candidate_id: string
          job_id: string
          stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          applied_at: string
          updated_at: string
        }
        Update: {
          id: string
          candidate_id: string
          job_id: string
          stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          applied_at: string
          updated_at: string
        }
      }
      interviews: {
        Row: {
          id: string
          application_id: string
          date: string
          time: string
          duration: number
          type: 'phone' | 'video' | 'onsite' | 'technical'
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          interviewers: string[]
          notes: string
          location_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          application_id: string
          date: string
          time: string
          duration: number
          type: 'phone' | 'video' | 'onsite' | 'technical'
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          interviewers: string[]
          notes: string
          location_url: string
          created_at: string
          updated_at: string
        }
        Update: {
          id: string
          application_id: string
          date: string
          time: string
          duration: number
          type: 'phone' | 'video' | 'onsite' | 'technical'
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          interviewers: string[]
          notes: string
          location_url: string
          created_at: string
          updated_at: string
        }
      }
      talent_pools: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string
          created_at: string
        }
        Insert: {
          id: string
          user_id: string
          name: string
          description: string
          created_at: string
        }
        Update: {
          id: string
          user_id: string
          name: string
          description: string
          created_at: string
        }
      }
      talent_pool_members: {
        Row: {
          id: string
          pool_id: string
          candidate_id: string
          added_at: string
        }
        Insert: {
          id: string
          pool_id: string
          candidate_id: string
          added_at: string
        }
        Update: {
          id: string
          pool_id: string
          candidate_id: string
          added_at: string
        }
      }
      stages_history: {
        Row: {
          id: string
          application_id: string
          from_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected' | null
          to_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          changed_at: string
          changed_by: string | null
        }
        Insert: {
          id: string
          application_id: string
          from_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected' | null
          to_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          changed_at: string
          changed_by: string | null
        }
        Update: {
          id: string
          application_id: string
          from_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected' | null
          to_stage: 'sourced' | 'screening' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected'
          changed_at: string
          changed_by: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
