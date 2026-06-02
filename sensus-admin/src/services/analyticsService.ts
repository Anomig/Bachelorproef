import { hasSupabaseConfig, getSupabase } from './supabaseClient'

type AnalyticsSnapshot = {
  sessions: number
  completed: number
  averageDuration: string
  dropout: number
  offline: number
  thisWeek: number
}

type ReflectionRecord = {
  userId: string
  date: string
  age: number
  gender: string
  reflection: string
}

type SupabaseReflectionRow = {
  id: string
  session_id: string | null
  scenario_id: string | null
  impact: string | null
  lesson: string | null
  next_time: string | null
  created_at: string | null
  age: number | null
  gender: string | null
}

export default {
  async getSnapshot(scope: 'all' | 'week' | 'today' = 'all') {
    if (!hasSupabaseConfig()) {
      return {
        sessions: 0,
        completed: 0,
        averageDuration: '—',
        dropout: 0,
        offline: 0,
        thisWeek: 0
      }
    }

    try {
      const supabase = getSupabase()
      const { data: sessions, error: sessionError } = await supabase
        .from('sessions')
        .select('id,status,duration_seconds,completed_at')

      if (sessionError) {
        console.warn('Analytics session fetch failed', sessionError)
        return {
          sessions: 0,
          completed: 0,
          averageDuration: '—',
          dropout: 0,
          offline: 0,
          thisWeek: 0
        }
      }

      const rows = sessions || []
      const completed = rows.filter(row => row.status === 'done').length
      const totalDuration = rows.reduce((sum, row) => sum + Number(row.duration_seconds || 0), 0)
      const averageDurationSeconds = rows.length ? totalDuration / rows.length : 0

      return {
        sessions: rows.length,
        completed,
        averageDuration: averageDurationSeconds ? `${Math.round(averageDurationSeconds / 60)} min` : '—',
        dropout: rows.filter(row => row.status === 'stopped').length,
        offline: 0,
        thisWeek: rows.length
      }
    } catch (e) {
      console.warn('Analytics snapshot failed', e)
      return {
        sessions: 0,
        completed: 0,
        averageDuration: '—',
        dropout: 0,
        offline: 0,
        thisWeek: 0
      }
    }
  },

  async listReflections() {
    if (!hasSupabaseConfig()) return []

    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('reflections')
        .select('id,session_id,scenario_id,impact,lesson,next_time,created_at,age,gender')
        .order('created_at', { ascending: false })
        .limit(200)

      if (error) {
        console.warn('Reflection fetch failed', error)
        return []
      }

      return (data || []).map((row: SupabaseReflectionRow) => ({
        userId: row.session_id || row.id,
        date: row.created_at ? new Date(row.created_at).toLocaleDateString('nl-NL') : '',
        age: Number(row.age || 0),
        gender: row.gender || '',
        reflection: [row.impact, row.lesson, row.next_time].filter(Boolean).join(' | '),
        sessionId: row.session_id || '',
        scenarioId: row.scenario_id || '',
        impact: row.impact || '',
        lesson: row.lesson || '',
        nextTime: row.next_time || ''
      }))
    } catch (e) {
      console.warn('Reflection list failed', e)
      return []
    }
  }
}
