export function createScenarioEngine(nodes){

  let currentNode = nodes[0]

  function getNode(){

    return currentNode

  }

  function choose(choiceId){

    const next = currentNode.choices.find(
      c => c.id === choiceId
    )

    currentNode = nodes.find(
      n => n.id === next.nextNode
    )

    return currentNode

  }

  return {

    getNode,
    choose

  }

}