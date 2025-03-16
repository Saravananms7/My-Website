import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for your database tables
export type Project = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  github_url: string;
  demo_url?: string;
  apk_url?: string;
  apk_version?: string;
  platform: 'web' | 'android' | 'ios' | 'desktop';
  technologies: string[];
  created_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  published_at: string;
  slug: string;
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}; 