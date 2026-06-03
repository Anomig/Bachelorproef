// Kleine state-machine: navigeert door scenario-stappen op basis van keuzes of `next`.
export function createScenarioEngine(scenario) {
  console.log('ENGINE INPUT:', scenario)

  if (!scenario || !scenario.start || !scenario.steps) {
    console.error('Invalid scenario passed to engine', scenario)
    return null
  }
  let currentStepId = scenario.start

  function getStep() {
    return scenario.steps[currentStepId]
  }

  function next(choiceKey) {
    const step = getStep()

    const selected = step.options.find(o => o.key === choiceKey)

    if (!selected) {
      console.error('Invalid choice')
      return
    }

    currentStepId = selected.next
    return getStep()
  }

  function goNext() {
    const step = getStep()

    if (!step) {
      console.error('Step is undefined')
      return null
    }

    if (!step.next) {
      console.error('No next step for:', step)
      return null
    }

    currentStepId = step.next

    return getStep()
  }

  return {
    getStep,
    next,
    goNext
  }
}