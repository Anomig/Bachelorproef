<template>
  <main>

    <h2>Scenario's</h2>

    <div class="grid">

      <ScenarioCard
        v-for="scenario in scenarios"
        :key="scenario.id"
        :scenario="scenario"
      />

    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue'
import ScenarioCard from '../components/ScenarioCard.vue'

const scenarios = ref([
  {
    id:1,
    title:"Feestje",
    description:"Je bent op een feestje..."
  },
  {
    id:2,
    title:"Op school",
    description:"Tijdens de pauze..."
  }
])
</script>

<style scoped>

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(200px,1fr));
  gap:16px;
}

</style>