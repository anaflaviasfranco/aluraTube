import { createClient } from '@supabase/supabase-js'
const PROJECT_URL = 'https://rttuydvzlqulobtuxzdh.supabase.co'
const PROJECT_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dHV5ZHZ6bHF1bG9idHV4emRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0Nzg5MTEsImV4cCI6MTk4NDA1NDkxMX0.Q9yA9DnZUi6_Nqiz1c6GABv_WcVsXn5tyTitbksOEfc'

const supabase = createClient(PROJECT_URL, PROJECT_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase
        .from('video')
        .select('*')
    },
  }
}
