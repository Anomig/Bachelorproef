<script setup>
// Intro-scherm: waarschuwt de gebruiker en vraagt bevestiging om door te gaan.
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const store = useSessionStore()

function goBack() {
  router.push('/info')
}

function continueToOverview() {
  router.push('/overview')
}

function stopSession() {
  store.leaveSession()
  router.push('/start')
}
</script>

<template>
  <main class="page-shell page-shell--before-start">
    <button class="before-start__back" type="button" @click="goBack">
      <span aria-hidden="true">‹</span>
      Terug
    </button>

    <section class="before-start-screen">
      <div class="before-start-screen__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation">
          <path d="M12 2.5l6 2.6v4.8c0 5.2-2.9 8.7-6 11.1-3.1-2.4-6-5.9-6-11.1V5.1L12 2.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
          <path d="M12 7v6.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <circle cx="12" cy="16.7" r="0.9" fill="currentColor"/>
        </svg>
      </div>

      <div class="before-start-screen__copy">
        <h1>Voor je begint</h1>
        <p>
          Deze tool toont situaties die gaan over grenzen, communicatie en online gedrag. Sommige momenten kunnen gevoelig aanvoelen. Gebruik dit op je eigen tempo. Je kan altijd stoppen. Helemaal anoniem. Niets wordt opgeslagen.
        </p>
      </div>

      <div class="before-start-screen__action">
        <h2>Ben je klaar om verder te gaan?</h2>

        <AppButton class="before-start-screen__primary" variant="secondary" @click="continueToOverview">
          Ga verder
        </AppButton>

        <button class="before-start-screen__secondary" type="button" @click="stopSession">
          Stoppen?
        </button>
      </div>
    </section>
  </main>
</template>