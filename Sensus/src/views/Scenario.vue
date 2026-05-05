<script setup>
// Scenario-scherm: toont een chatachtige flow met intro, keuzes en vervolgschermen.
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import ChoiceButton from '../components/ChoiceButton.vue'

const router = useRouter()
const store = useSessionStore()

const step = computed(() => store.currentStep)
const scenarioTitle = computed(() => step.value?.title || store.selectedScenario?.title || 'Scenario')
const scenarioSubtitle = computed(() => step.value?.subtitle || '')
const scenarioBody = computed(() => step.value?.body || '')
const scenarioPrompt = computed(() => step.value?.prompt || '')
const chatMessages = computed(() => step.value?.messages || [])

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
    return
  }

  if (store.currentStep?.type === 'reflection') {
    router.replace('/reflection')
  }
})

function goToReflectionIfNeeded(nextStep) {
  if (nextStep?.type === 'reflection') {
    router.push('/reflection')
  }
}

function continueFlow() {
  const nextStep = store.goNext()
  goToReflectionIfNeeded(nextStep)
}

function startScenario() {
  continueFlow()
}

function choose(option) {
  const nextStep = store.next(option.key)
  goToReflectionIfNeeded(nextStep)
}

function stopSession() {
  store.leaveSession()
  router.push('/start')
}
</script>

<template>
  <main class="page-shell page-shell--scenario">
    <button class="scenario-back" type="button" @click="router.push('/overview')">
      <span aria-hidden="true">‹</span>
      Terug
    </button>

    <section v-if="step" class="scenario-screen">
      <header class="scenario-header">
        <h1 :class="step.type === 'reflection' ? 'scenario-title scenario-title--reflection' : 'scenario-title'">
          {{ scenarioTitle }}
        </h1>
        <p class="scenario-subtitle">{{ scenarioSubtitle }}</p>
        <p v-if="scenarioBody" class="scenario-body">{{ scenarioBody }}</p>
      </header>

      <section v-if="chatMessages.length" class="scenario-chat">
        <p v-for="message in chatMessages" :key="`${message.time || ''}-${message.text}`" class="scenario-chat__time" :class="message.time ? 'scenario-chat__time--visible' : 'scenario-chat__time--hidden'">
          {{ message.time || 'Vandaag 18:36' }}
        </p>
        <div class="scenario-chat__panel">
          <div v-for="message in chatMessages" :key="message.text" class="scenario-chat__row" :class="message.side === 'right' ? 'scenario-chat__row--right' : 'scenario-chat__row--left'">
            <div class="scenario-chat__bubble" :class="message.side === 'right' ? 'scenario-chat__bubble--right' : 'scenario-chat__bubble--left'">
              {{ message.text }}
            </div>
          </div>
        </div>
      </section>

      <p v-if="scenarioPrompt" class="scenario-question">{{ scenarioPrompt }}</p>

      <div v-if="step.type === 'intro'" class="scenario-actions">
        <button class="scenario-primary" type="button" @click="startScenario">
          {{ step.buttonLabel || 'Start scenario' }}
        </button>
      </div>

      <div v-else-if="step.type === 'choice'" class="scenario-choices">
        <ChoiceButton
          v-for="opt in step.options"
          :key="opt.key"
          :label="opt.label"
          @click="choose(opt)"
        />
        <p v-if="step.note" class="scenario-note">{{ step.note }}</p>
      </div>

      <div v-else-if="step.type === 'continue'" class="scenario-actions">
        <button class="scenario-continue" type="button" @click="continueFlow">
          {{ step.buttonLabel || 'Volgende' }}
        </button>
      </div>
    </section>

    <button class="scenario-stop" type="button" @click="stopSession">
      Stoppen?
    </button>
  </main>
</template>