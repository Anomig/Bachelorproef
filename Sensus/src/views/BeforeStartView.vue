<script setup>
// Intro-scherm: waarschuwt de gebruiker en vraagt bevestiging om door te gaan.
import { useRoute, useRouter } from 'vue-router'
import AppButton from '../components/AppButton.vue'

const router = useRouter()
const route = useRoute()

function goBack() {
  router.push('/info')
}

function continueToOverview() {
  router.push('/overview')
}

function stopSession() {
  router.push({ path: '/stop', query: { returnTo: route.path } })
}
</script>

<template>
  <main class="page-shell page-shell--before-start">

    <section class="before-start-screen">
      <div class="before-start-screen__icon" aria-hidden="true">
        <img
          src="/images/fi-rr-shield-exclamation.png"
          alt=""
          class="before-start-screen__icon-image"
        >
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