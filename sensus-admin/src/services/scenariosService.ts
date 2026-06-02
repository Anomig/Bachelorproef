import mockService from './mockService'
import strapi from './strapiService'

async function listScenarios(){
  // try Strapi first, fallback to mock
  const fromStrapi = await strapi.listScenarios().catch(()=>null)
  if(fromStrapi && fromStrapi.length) return fromStrapi
  return mockService.listScenarios()
}

async function findScenario(id:any){
  const fromStrapi = await strapi.getScenario(id).catch(()=>null)
  if(fromStrapi) return fromStrapi
  return mockService.findScenario(id)
}

async function createScenario(payload:any){
  const created = await strapi.createScenario(payload).catch(()=>null)
  if(created) return created
  return mockService.createScenario(payload)
}

async function updateScenario(id:any,payload:any, publish?: boolean){
  const updated = await strapi.updateScenario(id, payload, publish).catch(()=>null)
  if(updated) return updated
  return mockService.updateScenario(id, payload)
}

export default { listScenarios, findScenario, createScenario, updateScenario }
