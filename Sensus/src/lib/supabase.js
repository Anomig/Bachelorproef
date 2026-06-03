import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.info('[Supabase ENV]', {
  urlExists: !!supabaseUrl,
  keyExists: !!supabaseAnonKey,
  urlType: typeof supabaseUrl,
  keyType: typeof supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
})

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing env vars', {
    url: supabaseUrl,
    key: supabaseAnonKey
  })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)