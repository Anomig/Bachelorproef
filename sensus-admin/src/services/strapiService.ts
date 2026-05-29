const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || ''

async function request(path:string, options:RequestInit={}){
  if(!STRAPI_URL) throw new Error('VITE_STRAPI_URL not set')
  const url = STRAPI_URL.replace(/\/$/, '') + path
  const headers: Record<string,string> = { ...(options.headers as Record<string,string> || {}) }
  const token = import.meta.env.VITE_STRAPI_TOKEN
  if(token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(url, { ...options, headers })
  if(!res.ok) throw new Error(`Strapi request failed: ${res.status}`)
  return res.json()
}

export default {
  async listScenarios(){
    try{
      const data = await request('/api/scenarios?populate=*')
      return data.data.map((d:any)=>({ id: d.id, ...d.attributes }))
    }catch(e){
      console.warn('Strapi listScenarios error', e)
      return null
    }
  },
  async getScenario(id:number|string){
    try{
      const data = await request(`/api/scenarios/${id}?populate=*`)
      return { id: data.data.id, ...data.data.attributes }
    }catch(e){
      console.warn('Strapi getScenario error', e)
      return null
    }
  },
  async createScenario(payload:any){
    try{
      const body = { data: payload }
      const data = await request('/api/scenarios', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      return { id: data.data.id, ...data.data.attributes }
    }catch(e){
      console.warn('Strapi createScenario error', e)
      return null
    }
  },
  async updateScenario(id:number|string, payload:any){
    try{
      const body = { data: payload }
      const data = await request(`/api/scenarios/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) })
      return { id: data.data.id, ...data.data.attributes }
    }catch(e){
      console.warn('Strapi updateScenario error', e)
      return null
    }
  }
}
