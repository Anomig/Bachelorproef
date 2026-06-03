import { supabase } from '../lib/supabase'

export async function createEvent({
  sessionId,
  scenarioId,
  eventType,
  stepId = null,
  choiceKey = null,
  metadata = {}
}) {
  const { data, error } = await supabase
    .from('session_events')
    .insert({
      session_id: sessionId,
      scenario_id: scenarioId,
      event_type: eventType,
      step_id: stepId,
      choice_key: choiceKey,
      metadata
    })

  if (error) {
    console.error('analytics event error', error)
  }

  return data
}