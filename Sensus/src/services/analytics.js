// Tijdelijke analytics helper: logt keuze-events lokaal (kan later naar echte tracking).
export function trackChoice({

  scenarioId,
  nodeId,
  choiceId,
  timeSpent,
  age,
  gender

}){

  console.log("analytics", {

    scenarioId,
    nodeId,
    choiceId,
    timeSpent,
    age,
    gender

  })

}