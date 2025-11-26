import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://csnwhimbfcqnymjugsom.supabase.co' // your URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbndoaW1iZmNxbnltanVnc29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDc1NzksImV4cCI6MjA3OTcyMzU3OX0.exwo5xPHyjm7K913k9lMP75w-BZabXlDAWLNWHkE2y0' // your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
