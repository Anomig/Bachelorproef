<script setup>
// Scenario-scherm: toont de huidige stap en verwerkt keuzes binnen de scenario-engine.
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'
import ChoiceButton from '../components/ChoiceButton.vue'

const router = useRouter()
const store = useSessionStore()

const step = computed(() => store.currentStep)
const scenarioTitle = computed(() => store.selectedScenario?.title || 'Scenario')

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (!store.participantInfoCompleted) {
    router.replace('/info')
    return
  }

  if (!store.selectedScenarioId) {
    router.replace('/overview')
    return
  }

  if (!store.currentStep) {
    const ok = store.startSelectedScenario()
    if (!ok) {
      router.replace('/overview')
    }
  }
})

function goToReflectionIfNeeded(nextStep) {
  if (nextStep?.type === 'end') {
    router.push('/reflection')
  }
}

function continueFlow() {
  const nextStep = store.goNext()
  goToReflectionIfNeeded(nextStep)
}

function choose(option) {
  const nextStep = store.next(option.key)
  goToReflectionIfNeeded(nextStep)
}
</script>

<template>
  <main class="page-shell page-shell--scenario">
    <section v-if="step" class="page-card">
      <h1 class="page-kicker page-kicker--scenario">{{ scenarioTitle }}</h1>
      <p class="page-intro page-intro--scenario">
        {{ step.text }}
      </p>

      <div v-if="step.type === 'text'">
        <AppButton @click="continueFlow">
          Verder
        </AppButton>
      </div>

      <div v-else-if="step.type === 'choice'" class="scenario-choices">
        <ChoiceButton
          v-for="opt in step.options"
          :key="opt.key"
          :label="opt.label"
          @click="choose(opt)"
        />
      </div>
    </section>

    <section v-else class="page-card">
      <p>Geen actieve stap gevonden.</p>
      <AppButton @click="router.push('/overview')">
        Terug naar overzicht
      </AppButton>
    </section>
  </main>
</template>