<script setup>
// Reflectiescherm: vraagt om een korte reflectie na de scenario-flow.
import { computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()
const store = useSessionStore()

const step = computed(() => store.currentStep)
const form = reactive({ answer: '' })

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (store.currentStep?.type !== 'reflection') {
    router.replace('/overview')
    return
  }
})

async function submitReflection() {
  await store.saveReflection({
    lesson: form.answer
  })

  router.push('/end')
}

function stopSession() {
  store.leaveSession()
  router.push('/start')
}
</script>

<template>
  <main class="page-shell page-shell--reflection">
    <section class="reflection-screen">
      <header class="reflection-header">
        <h1 class="reflection-title">{{ step?.title || 'Reflectie' }}</h1>
        <p class="reflection-subtitle">{{ step?.subtitle || '' }}</p>
        <p v-if="step?.body" class="reflection-body">{{ step.body }}</p>
      </header>

      <label class="reflection-question" for="reflection-answer">
        {{ step?.prompt || 'Welke signalen ga je volgende keer sneller oppikken?' }}
      </label>

      <textarea
        id="reflection-answer"
        v-model="form.answer"
        class="reflection-textarea"
        rows="5"
        :placeholder="step?.placeholder || 'Vul hier je antwoord in.'"
      />

      <button class="reflection-primary" type="button" @click="submitReflection">
        {{ step?.buttonLabel || 'Volgende' }}
      </button>
    </section>

    <button class="reflection-stop" type="button" @click="stopSession">
      Stoppen?
    </button>
  </main>
</template>