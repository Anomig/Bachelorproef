import { hasSupabaseConfig } from './supabaseClient'

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

const mockSnapshots: Record<string, AnalyticsSnapshot> = {
  all: { sessions: 689, completed: 70, averageDuration: '11 min', dropout: 32, offline: 30, thisWeek: 128 },
  week: { sessions: 128, completed: 95.7, averageDuration: '4 min', dropout: -50, offline: 13, thisWeek: 23 },
  today: { sessions: 23, completed: 95.7, averageDuration: '4 min', dropout: -50, offline: 13, thisWeek: 23 }
}

const mockReflections: ReflectionRecord[] = [
  { userId: 'r85n5Te8gG', date: '17 dec 2025', age: 17, gender: 'V', reflection: 'Ik vind het soms lastig om signalen van een ander te herkennen.' },
  { userId: 'Ye8Pr5f92Ne', date: '17 dec 2025', age: 17, gender: 'M', reflection: 'Ik ben heel open, en merk dat mensen daardoor soms foute aannemen hebben.' },
  { userId: 'je8e4b9He4F', date: '18 dec 2025', age: 15, gender: 'V', reflection: 'Als meisje is het makkelijker om met iemand te sturen. De meeste jongens vinden alles wel oké.' }
]

export default {
  async getSnapshot(scope: 'all' | 'week' | 'today' = 'all') {
    // Future Supabase connection point: aggregate from your sessions + reflection tables.
    if (hasSupabaseConfig()) {
      return mockSnapshots[scope]
    }
    return mockSnapshots[scope]
  },

  async listReflections() {
    // Future Supabase connection point: read reflection records from Supabase.
    return mockReflections
  }
}
