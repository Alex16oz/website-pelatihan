import { createClient } from '@supabase/supabase-js'

// Ganti dengan URL dan Anon Key Supabase Anda
const supabaseUrl = 'https://abwglgtuurdagnzrsfgp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFid2dsZ3R1dXJkYWduenJzZmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDIxODksImV4cCI6MjA2ODM3ODE4OX0.s4u71erOOTFSbMnbymMFt4QmZ4M-Dx7LVx5CNP6MPa0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)