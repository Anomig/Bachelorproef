// Supabase service-laag: schrijft en leest reflecties in de tabel `reflections`.
import { supabase } from '../lib/supabase'

// Save a reflection tied to a scenario and session
export async function saveReflection({ sessionId, scenarioId, reflection }) {
  if (!sessionId || !scenarioId) throw new Error('Missing sessionId or scenarioId')

  const payload = {
    session_id: sessionId,
    scenario_id: scenarioId,
    impact: reflection.impact || '',
    lesson: reflection.lesson || '',
    next_time: reflection.nextTime || ''
  }

  const { data, error } = await supabase.from('reflections').insert(payload).select()

  if (error) {
    console.error('saveReflection error', error)
    throw error
  }

  return data?.[0] || null
}

export async function fetchReflectionsForSession(sessionId) {
  if (!sessionId) return []
  const { data, error } = await supabase.from('reflections').select('*').eq('session_id', sessionId)
  if (error) {
    console.error('fetchReflectionsForSession error', error)
    return []
  }
  return data
}
