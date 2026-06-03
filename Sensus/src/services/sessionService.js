import { supabase } from '../lib/supabase'

export async function createSession({ sessionId, scenarioId }) {
  const { data, error } = await supabase
    .from('sessions')
    .insert({
      id: sessionId,
      scenario: scenarioId,
      status: 'active',
      start: new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('createSession error', error)
    throw error
  }

  return data?.[0] || null
}

export async function updateSession(sessionId, updates) {
  const { data, error } = await supabase
    .from('sessions')
    .update(updates)
    .eq('id', sessionId)
    .select()

  if (error) {
    console.error('updateSession error', error)
    throw error
  }

  return data?.[0] || null
}

export async function endSession(sessionId) {
  return updateSession(sessionId, {
    status: 'completed',
    end: new Date().toISOString()
  })
}

export async function createEvent(payload) {
  const { data, error } = await supabase
    .from('session_events')
    .insert({
      session_id: payload.sessionId,
      scenario_id: payload.scenarioId || null,
      event_type: payload.eventType,
      payload: payload.payload || {},
      created_at: payload.createdAt || new Date().toISOString()
    })
    .select()

  if (error) {
    console.error('createEvent error', error)
    throw error
  }

  return data?.[0]
}