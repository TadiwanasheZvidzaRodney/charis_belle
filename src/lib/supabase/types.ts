/**
 * Database types for Supabase.
 *
 * For now this is a hand-written stub matching the schema in README.md.
 * Later you can replace it with auto-generated types by running:
 *
 *   npx supabase gen types typescript --project-id <your-id> --schema public > src/lib/supabase/types.ts
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          birth_date: string | null
          phone: string | null
          email: string | null
          preferences: Json
          role: 'user' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          birth_date?: string | null
          phone?: string | null
          email?: string | null
          preferences?: Json
          role?: 'user' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          birth_date?: string | null
          phone?: string | null
          email?: string | null
          preferences?: Json
          role?: 'user' | 'admin'
          created_at?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          id: string
          name: string
          type: 'birthday' | 'reminder'
          subject: string
          body_html: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'birthday' | 'reminder'
          subject: string
          body_html: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'birthday' | 'reminder'
          subject?: string
          body_html?: string
          is_active?: boolean
          created_at?: string
        }
        Relationships: []
      }
      message_logs: {
        Row: {
          id: string
          user_id: string | null
          campaign_id: string | null
          sent_at: string
          status: 'sent' | 'failed'
        }
        Insert: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          sent_at?: string
          status: 'sent' | 'failed'
        }
        Update: {
          id?: string
          user_id?: string | null
          campaign_id?: string | null
          sent_at?: string
          status?: 'sent' | 'failed'
        }
        Relationships: [
          {
            foreignKeyName: 'message_logs_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'message_logs_campaign_id_fkey'
            columns: ['campaign_id']
            isOneToOne: false
            referencedRelation: 'campaigns'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
