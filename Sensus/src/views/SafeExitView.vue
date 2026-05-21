<script setup>
// Safe-exit scherm: geeft de gebruiker een pauze en laat toe om terug te keren of te stoppen.
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const route = useRoute()
const store = useSessionStore()

const returnTo = computed(() => {
  const value = route.query.returnTo
  return typeof value === 'string' && value ? value : '/overview'
})

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
  }
})

function continueFlow() {
  router.push(returnTo.value)
}

function stopSession() {
  store.backToOverview()
  router.push('/overview')
}
</script>

<template>
  <main class="page-shell page-shell--safe-exit">
    <section class="safe-exit-screen">
      <div class="safe-exit-icon" aria-hidden="true">
        <img src="/images/fi-rr-pauze.png" alt="" class="safe-exit-icon__image">
      </div>

      <header class="safe-exit-header">
        <h1 class="safe-exit-title">Even pauze?</h1>
        <p class="safe-exit-body">
          Je hoeft niet verder te gaan als het niet goed voelt. Neem een moment voor jezelf.
          Je kan altijd later opnieuw starten.
        </p>
        <p class="safe-exit-note">Er wordt niets opgeslagen.</p>
      </header>
    </section>

    <div class="safe-exit-actions">
      <AppButton variant="secondary" @click="continueFlow">
        Ga verder
      </AppButton>

      <button class="safe-exit-stop" type="button" @click="stopSession">
        Stoppen?
      </button>
    </div>
  </main>
</template>