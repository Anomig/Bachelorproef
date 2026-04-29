const RAW_BASE = import.meta?.env?.VITE_STRAPI_URL || ''
const BASE = RAW_BASE.replace(/\/$/, '')
const HAS_STRAPI = Boolean(BASE) && !BASE.includes('your-strapi-url')

async function safeJson(res) {
  try {
    return await res.json()
  } catch (e) {
    return null
  }
}

export async function fetchScenarios() {
  if (!HAS_STRAPI) {
    return []
  }

  const API = `${BASE}/api`
  try {
    const res = await fetch(`${API}/scenarios?populate=*`)
    const data = await safeJson(res)
    if (!data || !data.data) return []

    return data.data.map(item => ({
      id: String(item.id),
      title: item.attributes.title,
      shortDescription: item.attributes.description || '',
      theme: item.attributes.theme || '',
      scenario: item.attributes.engine_json || null
    }))
  } catch (err) {
    console.error('fetchScenarios error', err)
    return []
  }
}

export async function fetchScenario(id) {
  if (!HAS_STRAPI) {
    return null
  }

  const API = `${BASE}/api`
  try {
    const res = await fetch(`${API}/scenarios/${id}?populate=deep`)
    const data = await safeJson(res)
    if (!data || !data.data) return null
    const item = data.data
    return {
      id: String(item.id),
      title: item.attributes.title,
      shortDescription: item.attributes.description || '',
      theme: item.attributes.theme || '',
      scenario: item.attributes.engine_json || null
    }
  } catch (err) {
    console.error('fetchScenario error', err)
    return null
  }
}