<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const store = useSessionStore()

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

  if (!store.lastEndStep) {
    router.replace('/overview')
  }
})

async function submitReflection() {
  await store.saveReflection({
    impact: form.impact,
    lesson: form.lesson,
    nextTime: form.nextTime
  })

  store.backToOverview()
  router.push('/overview')
}
</script>

<template>
  <main class="page-shell page-shell--reflection">
    <section class="page-card">
      <p class="page-kicker">Reflectie</p>
      <h1>Neem even tijd om na te denken</h1>

      <div class="summary-box">
        <p><strong>Uitkomst:</strong> {{ store.lastEndStep?.text }}</p>
      </div>

      <label class="form-label" for="impact">Hoe kwam dit op je over?</label>
      <textarea
        id="impact"
        v-model="form.impact"
        class="form-textarea"
        rows="3"
      />

      <label class="form-label" for="lesson">Wat neem je hiervan mee?</label>
      <textarea
        id="lesson"
        v-model="form.lesson"
        class="form-textarea"
        rows="3"
      />

      <label class="form-label" for="next-time">Wat zou je volgende keer doen?</label>
      <textarea
        id="next-time"
        v-model="form.nextTime"
        class="form-textarea"
        rows="3"
      />

      <div class="actions-row">
        <AppButton @click="submitReflection">
          Bevestigen
        </AppButton>
      </div>
    </section>
  </main>
</template>