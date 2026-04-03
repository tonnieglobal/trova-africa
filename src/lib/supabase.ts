import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if credentials are missing (for development/demo purposes)
const isConfigured = supabaseUrl && supabaseAnonKey && 
                     !supabaseUrl.includes('placeholder') && 
                     !supabaseAnonKey.includes('placeholder');

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => isConfigured;

// Type definitions for database tables
export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  created_at?: string;
}

export interface NewsletterSubscription {
  id?: number;
  email: string;
  created_at?: string;
}
