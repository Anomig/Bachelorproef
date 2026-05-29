// Lightweight wrapper to initialize Supabase client only when env vars are present
import type { SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabaseClient(){
  if(client) return client
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  if(!url || !key) return null
  try{
    // dynamic import so project doesn't fail if package not installed yet
    // (installer step will add @supabase/supabase-js when ready)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createClient } = require('@supabase/supabase-js') as any
    client = createClient(url, key)
    return client
  }catch(e){
    console.warn('Supabase client not available:', e)
    return null
  }
}
