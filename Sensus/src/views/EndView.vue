<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const store = useSessionStore()

const title = computed(() => store.selectedScenario?.title || 'Scenario')

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
  }
})

function backToOverview() {
  store.backToOverview()
  router.push('/overview')
}

function leaveSession() {
  store.leaveSession()
  router.push('/join')
}
</script>

<template>
  <main class="page-shell page-shell--end">
    <section class="page-card">
      <p class="page-kicker">Einde</p>
      <h1>Goed gedaan</h1>

      <p class="page-intro">
        Je hebt <strong>{{ title }}</strong> afgerond.
      </p>

      <h2>Jouw reflectie</h2>
      <ul class="answers-list">
        <li v-if="store.reflection.impact">
          <strong>Impact:</strong> {{ store.reflection.impact }}
        </li>
        <li v-if="store.reflection.lesson">
          <strong>Les:</strong> {{ store.reflection.lesson }}
        </li>
        <li v-if="store.reflection.nextTime">
          <strong>Volgende keer:</strong> {{ store.reflection.nextTime }}
        </li>
        <li v-if="!store.reflection.impact && !store.reflection.lesson && !store.reflection.nextTime">
          <em>Geen antwoorden ingevuld</em>
        </li>
      </ul>

      <div class="actions-row">
        <AppButton @click="backToOverview">
          Terug naar overzicht
        </AppButton>
        <AppButton variant="secondary" @click="leaveSession">
          Nieuwe code ingeven
        </AppButton>
      </div>
    </section>
  </main>
</template>