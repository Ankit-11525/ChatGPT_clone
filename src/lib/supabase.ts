// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'
import { Database } from '../models/supabase'
const supabaseUrl = "https://vokwjqsvfqwmuuzutbpw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZva3dqcXN2ZnF3bXV1enV0YnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0MzUwNjcsImV4cCI6MjAzMjAxMTA2N30.hZZLiCiTCOSnFhcCe-01AIKWN-lhhGC2v0dHORyhp-g"
console.log(supabaseKey);
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
