const API = "https://your-strapi-url/api"

export async function fetchScenarios(){

  const res = await fetch(`${API}/scenarios?populate=*`)

  const data = await res.json()

  return data.data

}

export async function fetchScenario(id){

  const res = await fetch(`${API}/scenarios/${id}?populate=deep`)

  const data = await res.json()

  return data.data

}