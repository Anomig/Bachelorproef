import { createClient } from '@supabase/supabase-js'

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL)
console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.info('[Supabase] env check', {
  hasUrl: Boolean(supabaseUrl),
  hasAnonKey: Boolean(supabaseAnonKey),
  anonKeyLength: supabaseAnonKey?.length ?? 0,
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[Supabase] missing required env vars', {
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
  })
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)