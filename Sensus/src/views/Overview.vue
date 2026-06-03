<script setup>
// Overzichtsscherm: laadt beschikbare scenario's en laat de gebruiker er eentje starten.
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import ScenarioCard from '../components/ScenarioCard.vue'

const router = useRouter()
const store = useSessionStore()
const loadingScenarioId = ref(null)

onMounted(() => {
  console.log('STORE CHECK', store)
  console.log('JOINED:', store.joined)
  console.log('SCENARIO LIST:', store.availableScenarios)
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (!store.participantInfoCompleted) {
    router.replace('/info')
    return
  }

  if (!store.availableScenarios.length) {
    store.loadAvailableScenarios()
  }
})

async function openScenario(id) {
  store.selectScenario(id)

  const ok = await store.startSelectedScenario()
  console.log('STARTED:', ok)

  router.push('/scenario')
}

</script>

<template>
  <main class="page-shell page-shell--overview">
    <button class="overview-back" type="button" @click="router.push('/before-start')">
      <span aria-hidden="true">‹</span>
      Terug
    </button>

    <section class="overview-header">
      <h1>Scenario's</h1>
      <p>Kies een situatie die je wil verkennen</p>
    </section>

    <section class="scenario-grid overview-grid">
      <ScenarioCard
        v-for="scenario in store.availableScenarios"
        :key="scenario.id"
        :title="scenario.title"
        :description="scenario.shortDescription"
        :theme="scenario.theme"
        :loading="loadingScenarioId === scenario.id"
        @start="openScenario(scenario.id)"
      />
    </section>
  </main>
</template>