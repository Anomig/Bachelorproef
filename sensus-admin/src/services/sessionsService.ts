import { hasSupabaseConfig, getSupabase } from './supabaseClient'

type SessionRecord = {
  id: string
  userId: string
  name: string
  scenario: string
  date: string
  start: string
  end: string
  status: 'done' | 'stopped' | 'active'
  duration_seconds?: number | null
}

type SupabaseSessionRow = {
  id: string
  user_id: string | null
  scenario: string | null
  name: string | null
  date: string | null
  start: string | null
  end: string | null
  status: 'done' | 'stopped' | 'active' | null
  duration_seconds?: number | null
  completed_at?: string | null
}

export default {
  async listSessions() {
    if (!hasSupabaseConfig()) return []

    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('sessions')
        .select('id,user_id,name,scenario,date,start,end,status,duration_seconds,completed_at')
        .order('date', { ascending: false })
        .limit(200)

      if (error) {
        console.warn('Supabase fetch error', error)
        return []
      }

      return (data || []).map((r: SupabaseSessionRow) => ({
        id: r.id,
        userId: r.user_id || '',
        name: r.name || r.id,
        scenario: r.scenario || 'Onbekend scenario',
        date: r.date || r.completed_at || '',
        start: r.start || '',
        end: r.end || '',
        status: r.status || 'done',
        duration_seconds: r.duration_seconds || null
      }))
    } catch (e) {
      console.warn('Sessions fetch failed', e)
      return []
    }
  },

  async getMetrics() {
    if (!hasSupabaseConfig()) {
      return {
        total: 0,
        completed: 0,
        averageDuration: '—',
        dropout: 0,
        offline: 0,
        thisWeek: 0
      }
    }
    try {
      const supabase = getSupabase()
      const { data, error, count } = await supabase
        .from('sessions')
        .select('id,user_id,status,duration_seconds,completed_at', { count: 'exact' })

      if (error) {
        console.warn('Metrics fetch failed', error)
        return {
          total: 0,
          completed: 0,
          averageDuration: '—',
          dropout: 0,
          offline: 0,
          thisWeek: 0
        }
      }

      const rows = (data || []) as Array<{ status?: string | null; duration_seconds?: number | null }>
      const completed = rows.filter(row => row.status === 'done').length
      const totalDuration = rows.reduce((sum, row) => sum + Number(row.duration_seconds || 0), 0)
      const averageDurationSeconds = rows.length ? totalDuration / rows.length : 0
      const averageDuration = averageDurationSeconds ? `${Math.round(averageDurationSeconds / 60)} min` : '—'

      return {
        total: Number(count) || rows.length,
        completed,
        averageDuration,
        dropout: rows.filter(row => row.status === 'stopped').length,
        offline: 0,
        thisWeek: rows.length
      }
    } catch (e) {
      console.warn('Metrics fetch failed', e)
      return {
        total: 0,
        completed: 0,
        averageDuration: '—',
        dropout: 0,
        offline: 0,
        thisWeek: 0
      }
    }
  }
}
