import scenarios from '../mock/mockScenarios'
import users from '../mock/mockUsers'

let nextScenarioId = Math.max(...scenarios.map(s=>s.id)) + 1
let nextUserId = Math.max(...users.map(u=>u.id)) + 1

export default {
  listScenarios(){
    return scenarios
  },
  findScenario(id:number){
    return scenarios.find(s=>String(s.id)===String(id))
  },
  createScenario(payload:any){
    const s = { id: nextScenarioId++, ...payload }
    scenarios.unshift(s)
    return s
  },
  updateScenario(id:number, payload:any){
    const idx = scenarios.findIndex(s=>String(s.id)===String(id))
    if(idx !== -1){
      scenarios[idx] = { ...scenarios[idx], ...payload }
      return scenarios[idx]
    }
    return null
  },
  togglePublish(id:number){
    const s = scenarios.find(s=>String(s.id)===String(id))
    if(!s) return null
    s.status = s.status === 'published' ? 'draft' : 'published'
    return s
  },
  listUsers(){
    return users
  },
  createUser(payload:any){
    const u = { id: nextUserId++, ...payload }
    users.push(u)
    return u
  },
  updateUser(id:number, payload:any){
    const idx = users.findIndex(u=>String(u.id)===String(id))
    if(idx !== -1){
      users[idx] = { ...users[idx], ...payload }
      return users[idx]
    }
    return null
  }
}
