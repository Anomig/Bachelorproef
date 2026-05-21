<script setup>
import { computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()
const route = useRoute()
const store = useSessionStore()

const step = computed(() => store.currentStep)
const fields = computed(() => step.value?.fields || [])

const form = reactive({
  impact: '',
  lesson: '',
  nextTime: ''
})

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
    return
  }

  if (store.currentStep?.type !== 'reflection') {
    router.replace('/overview')
  }
})

async function submitReflection() {
  await store.saveReflection({
    impact: form.impact,
    lesson: form.lesson,
    nextTime: form.nextTime
  })

  router.push('/end')
}

function stopSession() {
  router.push({ path: '/stop', query: { returnTo: route.path } })
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

      <div class="reflection-fields">
        <label v-for="field in fields" :key="field.key" class="reflection-field">
          <span class="reflection-label">{{ field.label }}</span>
          <textarea
            v-model="form[field.key]"
            class="reflection-textarea"
            rows="4"
            :placeholder="field.placeholder"
          />
        </label>
      </div>

      <button class="reflection-primary" type="button" @click="submitReflection">
        {{ step?.buttonLabel || 'Volgende' }}
      </button>
    </section>

    <button class="reflection-stop" type="button" @click="stopSession">
      Stoppen?
    </button>
  </main>
</template>