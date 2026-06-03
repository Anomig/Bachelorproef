import strapiService from './strapiService'

export async function loadScenario(id) {
  const scenario = await strapiService.getScenario(id)

  if (!scenario || !scenario.engine_json) {
    throw new Error('Scenario not found or invalid')
  }

  return scenario.engine_json
}