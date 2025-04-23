
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';
import { toast } from 'sonner';

// Get the environment variables or use empty strings as fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the required environment variables are available
if (!supabaseUrl) {
  console.warn('Missing VITE_SUPABASE_URL environment variable - using demo mode');
}

if (!supabaseKey) {
  console.warn('Missing VITE_SUPABASE_ANON_KEY environment variable - using demo mode');
}

// Create a flag to track if we're in demo mode
export const isDemoMode = !supabaseUrl || !supabaseKey;

// Create the Supabase client with default values if environment variables are not available
export const supabase = createClient<Database>(
  supabaseUrl || 'https://example.supabase.co', 
  supabaseKey || 'demo-key'
);

// Helper function to check if a Supabase error is due to connection issues
export const isConnectionError = (error: any): boolean => {
  return error?.message?.includes('Failed to fetch') || 
         error?.message?.includes('NetworkError') ||
         error?.message?.includes('Network request failed');
};
