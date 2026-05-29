// Keep only env access here so the admin app can be prepared without the Supabase package installed yet.
// When you're ready to connect, install `@supabase/supabase-js` and swap this helper to a real client.

export type SupabaseEnvConfig = {
  url: string
  anonKey: string
}

export function getSupabaseEnv(): SupabaseEnvConfig | null {
  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (!url || !anonKey) return null
  return { url, anonKey }
}

export function hasSupabaseConfig(): boolean {
  return Boolean(getSupabaseEnv())
}
