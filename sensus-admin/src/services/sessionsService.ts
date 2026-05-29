import { hasSupabaseConfig } from './supabaseClient'

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
    // Future Supabase connection point: fetch from your sessions table here.
    if (hasSupabaseConfig()) {
      // prepared for later; return mocks until schema + package are finalized
      // example shape is kept stable for future mapping
      return mockSessions
    }
    return mockSessions
  },

  async getMetrics() {
    // Future Supabase connection point: aggregate from sessions table.
    return mockMetrics()
  }
}
