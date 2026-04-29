// Strapi service-laag: haalt scenario's op via REST en mapt responses naar frontend-vorm.
const RAW_BASE = import.meta?.env?.VITE_STRAPI_URL || ''
const BASE = RAW_BASE.replace(/\/$/, '')
const HAS_STRAPI = Boolean(BASE)

async function safeJson(res) {
  try {
    return await res.json()
  } catch (e) {
    return null
  }
}

function mapScenarioItem(item) {
  const fields = item?.attributes || item || {}

  return {
    id: String(item?.id ?? item?.documentId ?? ''),
    title: fields.title || '',
    shortDescription: fields.description || '',
    theme: fields.theme || '',
    scenario: fields.engine_json || null
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

    return data.data.map(mapScenarioItem)
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
    return mapScenarioItem(data.data)
  } catch (err) {
    console.error('fetchScenario error', err)
    return null
  }
}