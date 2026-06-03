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

console.log('URL LENGTH', supabaseUrl.length)
console.log('KEY LENGTH', supabaseAnonKey.length)

console.log('URL CHARS', JSON.stringify(supabaseUrl))
console.log('KEY START', supabaseAnonKey.slice(0, 20))
console.log('KEY END', supabaseAnonKey.slice(-20))

export const supabase = createClient(
  supabaseUrl.trim(),
  supabaseAnonKey.trim()
)