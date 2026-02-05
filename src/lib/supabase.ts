
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://quqplycygzbxcpjpujvf.supabase.co'
const supabaseAnonKey = 'sb_publishable_1Fsz5dLVLY0U2-mZECNcBQ_kiPUc0oy'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
