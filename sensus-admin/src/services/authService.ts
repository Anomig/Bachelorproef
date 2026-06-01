import { getSupabase, initSupabase, hasSupabaseConfig } from './supabaseClient'

export async function ensureSupabase() {
  if (!hasSupabaseConfig()) return null
  try {
    return getSupabase()
  } catch (e) {
    return initSupabase()
  }
}

export async function signIn(email: string, password: string) {
  const sb = await ensureSupabase()
  if (!sb) throw new Error('Supabase not configured')
  const { data, error } = await sb.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signUp(email: string, password: string, name?: string) {
  const sb = await ensureSupabase()
  if (!sb) throw new Error('Supabase not configured')
  const { data, error } = await sb.auth.signUp({
    email,
    password,
    options: {
      data: name ? { name } : undefined
    }
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const sb = await ensureSupabase()
  if (!sb) return null
  return sb.auth.signOut()
}

export async function getUser() {
  const sb = await ensureSupabase()
  if (!sb) return null
  const { data } = await sb.auth.getUser()
  return data.user
}

export async function getSession() {
  const sb = await ensureSupabase()
  if (!sb) return null
  const { data } = await sb.auth.getSession()
  return data.session
}
