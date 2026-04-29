<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import ScenarioCard from '../components/ScenarioCard.vue'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const store = useSessionStore()
const loadingScenarioId = ref(null)

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (!store.availableScenarios.length) {
    store.loadAvailableScenarios()
  }
})

function openScenario(id) {
  loadingScenarioId.value = id

  const selected = store.selectScenario(id)
  if (!selected) {
    loadingScenarioId.value = null
    return
  }

  const started = store.startSelectedScenario()
  if (!started) {
    loadingScenarioId.value = null
    return
  }

  router.push('/scenario')
}

function leaveSession() {
  store.leaveSession()
  router.push('/join')
}
</script>

<template>
  <main class="page-shell page-shell--overview page-shell--top">
    <section class="page-header">
      <div class="page-header__copy">
        <h1>Kies een scenario</h1>
        <p>Kies een situatie die je wil verkennen</p>
        <p class="page-intro">
          Code: <strong>{{ store.enteredCode }}</strong>
        </p>
      </div>

      <AppButton variant="secondary" @click="leaveSession">
        Andere code ingeven
      </AppButton>
    </section>

    <section class="scenario-grid">
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