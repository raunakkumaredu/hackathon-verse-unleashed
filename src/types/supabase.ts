
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
      hackathons: {
        Row: {
          id: string
          title: string
          description: string
          company: string
          logo: string
          start_date: string
          end_date: string
          status: "Upcoming" | "Active" | "Completed"
          participants: number
          registration_open: boolean
          prize_pool: string
          tags: string[]
          difficulty: "Beginner" | "Intermediate" | "Advanced"
          organizer_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          company: string
          logo: string
          start_date: string
          end_date: string
          status: "Upcoming" | "Active" | "Completed"
          participants?: number
          registration_open?: boolean
          prize_pool: string
          tags: string[]
          difficulty: "Beginner" | "Intermediate" | "Advanced"
          organizer_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          company?: string
          logo?: string
          start_date?: string
          end_date?: string
          status?: "Upcoming" | "Active" | "Completed"
          participants?: number
          registration_open?: boolean
          prize_pool?: string
          tags?: string[]
          difficulty?: "Beginner" | "Intermediate" | "Advanced"
          organizer_id?: string
          created_at?: string
        }
      }
      hackathon_participants: {
        Row: {
          id: string
          hackathon_id: string
          user_id: string
          joined_at: string
          status: "Registered" | "Interested" | "Completed"
        }
        Insert: {
          id?: string
          hackathon_id: string
          user_id: string
          joined_at?: string
          status?: "Registered" | "Interested" | "Completed"
        }
        Update: {
          id?: string
          hackathon_id?: string
          user_id?: string
          joined_at?: string
          status?: "Registered" | "Interested" | "Completed"
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
  }
}
