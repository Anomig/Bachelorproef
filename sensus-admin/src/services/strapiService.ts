const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || ''

type ScenarioPayload = {
  title?: string
  theme?: string
  description?: string
  introTitle?: string
  duration?: string
  introBody?: string
  buttonText?: string
  note?: string
  questionCount?: number
  flow?: Record<string, unknown>
  templateId?: string
}

type StrapiScenarioRecord = {
  id: string | number
  title?: string
  theme?: string
  description?: string
  engine_json?: Record<string, any> | null
  is_active?: boolean
  createdAt?: string
  publishedAt?: string | null
}

function formatDate(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function buildEngineJson(payload: ScenarioPayload) {
  return {
    start: 'intro',
    steps: payload.flow || {},
    meta: {
      introTitle: payload.introTitle || '',
      duration: payload.duration || '',
      introBody: payload.introBody || '',
      buttonText: payload.buttonText || '',
      note: payload.note || '',
      questionCount: payload.questionCount || 0,
      templateId: payload.templateId || ''
    }
  }
}

function toScenarioRecord(item: StrapiScenarioRecord) {
  return {
    id: String(item.id ?? ''),
    title: item.title || '',
    shortDescription: item.description || '',
    theme: item.theme || '',
    description: item.description || '',
    date: formatDate(item.createdAt),
    sessions: 0,
    status: item.publishedAt ? 'published' : 'draft',
    is_active: Boolean(item.is_active),
    scenario: item.engine_json || null,
    engine_json: item.engine_json || null
  }
}

async function request(path:string, options:RequestInit={}){
  if(!STRAPI_URL) throw new Error('VITE_STRAPI_URL not set')
  const url = STRAPI_URL.replace(/\/$/, '') + path
  const headers: Record<string,string> = { ...(options.headers as Record<string,string> || {}) }
  const res = await fetch(url, { ...options, headers })
  if(!res.ok) throw new Error(`Strapi request failed: ${res.status}`)
  return res.json()
}

export default {
  async listScenarios(){
  try{
    const data = await request('/api/scenarios?populate=*')

    return data.data.map((d: any) =>
      toScenarioRecord({
        id: d.id,
        ...d
      })
    )

  }catch(e){
    console.warn('Strapi listScenarios error', e)
    return null
  }
},
  async getScenario(id:number|string){
    try{
      const data = await request(`/api/scenarios?filters[documentId][$eq]=${id}&populate=*`)
      return toScenarioRecord({
        id: data.data.id,
        ...data.data
      })
    }catch(e){
      console.warn('Strapi getScenario error', e)
      return null
    }
  },
  async createScenario(payload: ScenarioPayload){
    try{
      const body = {
        data: {
          title: payload.title,
          theme: payload.theme,
          description: payload.description,
          engine_json: buildEngineJson(payload),
          is_active: true
        }
      }
      const data = await request('/api/scenarios', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      return toScenarioRecord({
        id: data.data.id,
        ...(data.data.attributes || {})
      })
    }catch(e){
      console.warn('Strapi createScenario error', e)
      return null
    }
  },
  async updateScenario(id:number|string, payload: ScenarioPayload, publish?: boolean){
    try{
      const body: Record<string, unknown> = {
        data: {
          ...(payload.title ? { title: payload.title } : {}),
          ...(payload.theme ? { theme: payload.theme } : {}),
          ...(payload.description ? { description: payload.description } : {}),
          ...(payload.flow ? { engine_json: buildEngineJson(payload) } : {}),
          ...(typeof publish === 'boolean' ? { publishedAt: publish ? new Date().toISOString() : null } : {})
        }
      }
      const data = await request(`/api/scenarios/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      return toScenarioRecord({
        id: data.data.id,
        ...(data.data.attributes || {})
      })
    }catch(e){
      console.warn('Strapi updateScenario error', e)
      return null
    }
  }
}
