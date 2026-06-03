import { withLoader } from '../composables/useAppLoader'

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL

function buildStrapiUrl(path) {
  if (!STRAPI_BASE_URL) {
    throw new Error('VITE_STRAPI_URL is not configured')
  }

  return `${STRAPI_BASE_URL.replace(/\/$/, '')}${path}`
}

// Eager-load local scenario JSON files as a fallback when Strapi is unreachable.
const _localScenarioModules = import.meta.glob('../scenarios/*.json', { eager: true })

function loadLocalScenarios() {
  return Object.values(_localScenarioModules).map((m) => {
    const d = m?.default ?? m

    return {
      id: d.id ?? d.slug ?? null,
      title: d.title ?? '',
      slug: d.id ?? d.slug ?? '',
      description: d.description ?? '',
      theme: d.theme ?? '',
      duration: d.duration ?? null,
      age_min: d.age_min ?? null,
      age_max: d.age_max ?? null,
      is_active: d.is_active ?? null,
      engine_json: d.engine_json ?? { intro: d.intro ?? null, steps: d.steps ?? null }
    }
  })
}

function mapScenario(item) {
  const data = item ?? {}

  return {
    id: item?.id,
    title: data.title ?? '',
    slug: data.documentId,
    description: data.description ?? '',
    theme: data.theme ?? '',
    duration: data.duration ?? null,
    age_min: data.age_min ?? null,
    age_max: data.age_max ?? null,
    is_active: data.is_active ?? null,
    engine_json: data.engine_json ?? null,
  }
}

export async function getScenarios() {
  return withLoader(async () => {
    try {
      const res = await fetch(buildStrapiUrl('/api/scenarios?populate=*'))
      if (!res.ok) {
        console.error('Failed to fetch scenarios from Strapi:', res.status, res.statusText)
        // Try local fallback
        const local = loadLocalScenarios().map(mapScenario)
        console.info('Using local scenarios fallback, count=', local.length)
        return local
      }

      const json = await res.json()
      const items = json?.data ?? []

      const mapped = items.map(mapScenario)

      return mapped
    } catch (err) {
      console.error('Error fetching scenarios from Strapi:', err)
      const local = loadLocalScenarios().map(mapScenario)
      console.info('Using local scenarios fallback due to error, count=', local.length)
      return local
    }
  })
}

export async function getScenarioBySlug(documentId) {
  return withLoader(async () => {
    try {
      if (!documentId) return null

      const encoded = encodeURIComponent(documentId)

      const url = buildStrapiUrl(
        `/api/scenarios?filters[documentId][$eq]=${encoded}&populate=*`
      )

      const res = await fetch(url)

      if (!res.ok) {
        console.error('Failed to fetch scenario by documentId:', res.status, res.statusText)

        const local = loadLocalScenarios()
        const foundLocal = local.find((l) => l.documentId === documentId || String(l.id) === String(documentId))

        if (foundLocal) {
          console.info('Using local scenario fallback for documentId=', documentId)
          return mapScenario(foundLocal)
        }

        return null
      }

      const json = await res.json()
      const item = json?.data?.[0]

      if (!item) {
        const local = loadLocalScenarios()
        const foundLocal = local.find((l) => l.documentId === documentId || String(l.id) === String(documentId))

        if (foundLocal) {
          console.info('Using local scenario fallback (no Strapi result) for documentId=', documentId)
          return mapScenario(foundLocal)
        }

        return null
      }

      return mapScenario(item)

    } catch (err) {
      console.error('Error fetching scenario by documentId:', err)

      const local = loadLocalScenarios()
      const foundLocal = local.find((l) => l.documentId === documentId || String(l.id) === String(documentId))

      if (foundLocal) {
        console.info('Using local scenario fallback due to error for documentId=', documentId)
        return mapScenario(foundLocal)
      }

      return null
    }
  })
}