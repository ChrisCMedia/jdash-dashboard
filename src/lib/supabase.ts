
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://quqplycygzbxcpjpujvf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1cXBseWN5Z3pieGNwanB1anZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMTYzMTUsImV4cCI6MjA4NTg5MjMxNX0.gzlYbNoMkayTkNkOjNTt8RN91MzsJLP-ukK2dMoVi7E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
