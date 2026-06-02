import { getSupabase, hasSupabaseConfig } from './supabaseClient'

export type ProfileRecord = {
  id: string
  user_id: string
  display_name: string
  role: string
  created_at: string
}

async function fetchProfiles() {
  if (!hasSupabaseConfig()) return []

  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('profiles')
      .select('id,user_id,display_name,role,created_at')
      .order('created_at', { ascending: false })
      .limit(200)

    if (error) {
      console.warn('Profiles fetch failed', error)
      return []
    }

    return (data || []) as ProfileRecord[]
  } catch (error) {
    console.warn('Profiles fetch failed', error)
    return []
  }
}

export default {
  async listProfiles() {
    return fetchProfiles()
  },

  async getProfile(id: string | number) {
    const profiles = await fetchProfiles()
    return profiles.find(profile => String(profile.id) === String(id) || String(profile.user_id) === String(id)) || null
  }
}