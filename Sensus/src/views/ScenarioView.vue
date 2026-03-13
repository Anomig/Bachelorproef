<template>

<main v-if="node">

<h2>{{ node.text }}</h2>

<div class="choices">

<ChoiceButton
  v-for="choice in node.choices"
  :key="choice.id"
  :choice="choice"
  @select="makeChoice"
/>

</div>

</main>

</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchScenario } from '../services/strapi'
import { createScenarioEngine } from '../engine/scenarioEngine'

import ChoiceButton from '../components/ChoiceButton.vue'

const route = useRoute()

const node = ref(null)
let engine = null

onMounted(async () => {

  const scenario = await fetchScenario(route.params.id)

  engine = createScenarioEngine(scenario.nodes)

  node.value = engine.getNode()

})

function makeChoice(choiceId){

  node.value = engine.choose(choiceId)

}

</script>