import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

export type SupabaseEnvConfig = {
  url: string
  anonKey: string
}

export function initSupabase(): SupabaseClient | null {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    console.warn('Supabase env not provided')
    return null
  }
  supabase = createClient(url, anonKey)
  return supabase
}

export function getSupabase(): SupabaseClient {
  if (!supabase) {
    const client = initSupabase()
    if (!client) throw new Error('Supabase not initialized')
  }
  return supabase!
}

export function hasSupabaseConfig(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
}
