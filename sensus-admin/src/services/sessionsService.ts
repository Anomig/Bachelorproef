import { hasSupabaseConfig, getSupabase } from './supabaseClient'

type SessionRecord = {
  id: string
  name: string
  scenario: string
  date: string
  start: string
  end: string
  status: 'done' | 'stopped' | 'active'
}

const mockSessions: SessionRecord[] = [
  { id: '1abh', name: '1abh', scenario: 'Online gedrag', date: '17 dec 2025', start: '14:03', end: '14:14', status: 'done' },
  { id: 'lp2', name: 'lp2', scenario: 'Online gedrag', date: '17 dec 2025', start: '14:07', end: '14:23', status: 'done' },
  { id: 'mpj6', name: 'mpj6', scenario: 'Online gedrag', date: '17 dec 2025', start: '14:07', end: '14:10', status: 'stopped' },
  { id: 'shuo7', name: 'shuo7', scenario: 'Online gedrag', date: '17 dec 2025', start: '14:10', end: '14:19', status: 'stopped' },
  { id: '1nj', name: '1nj', scenario: 'Online gedrag', date: '17 dec 2025', start: '14:11', end: '14:25', status: 'done' }
]

function mockMetrics() {
  return {
    total: 689,
    completed: 70,
    averageDuration: '11 min',
    dropout: 32,
    offline: 30,
    thisWeek: 128
  }
}

export default {
  async listSessions() {
    if (!hasSupabaseConfig()) return mockSessions

    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('sessions')
        .select('id,name,scenario,date,start,end,status')
        .order('date', { ascending: false })
        .limit(200)

      if (error) {
        console.warn('Supabase fetch error', error)
        return mockSessions
      }
      return (data || []).map((r: any) => ({
        id: r.id,
        name: r.name,
        scenario: r.scenario,
        date: r.date,
        start: r.start,
        end: r.end,
        status: r.status
      }))
    } catch (e) {
      console.warn('Sessions fetch failed', e)
      return mockSessions
    }
  },

  async getMetrics() {
    if (!hasSupabaseConfig()) return mockMetrics()
    try {
      const supabase = getSupabase()
      const { count } = await supabase.from('sessions').select('*', { count: 'exact', head: false }) as any
      return { total: Number(count) || 0, completed: 0, averageDuration: '—', dropout: 0, offline: 0, thisWeek: 0 }
    } catch (e) {
      console.warn('Metrics fetch failed', e)
      return mockMetrics()
    }
  }
}
