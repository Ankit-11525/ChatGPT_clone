// lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'
import { Database } from '../models/supabase'

console.log(supabaseKey);
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
