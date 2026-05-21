<script setup>
// Eindscherm: bedankt de gebruiker en geeft een korte afronding van het scenario.
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'

const router = useRouter()
const store = useSessionStore()

onMounted(() => {
  if (!store.joined) {
    router.replace('/join')
  }
})

function backToOverview() {
  store.backToOverview()
  router.push('/overview')
}
</script>

<template>
  <main class="page-shell page-shell--end">
    <section class="end-screen">
      <header class="end-header">
        <h1 class="end-title">Je hebt het scenario afgerond!</h1>
        <p class="end-body">
          Goed gedaan! Je hebt dit scenario doorlopen en stilgestaan bij hoe je je voelt.
        </p>
        <p class="end-body">
          Heb je nog vragen? Aarzel niet om de moderator aan te spreken.
        </p>
      </header>

      <section class="end-reflection">
        <h2 class="end-section-title">Denk eraan</h2>
        <ul class="end-list">
          <li>Je mag even afstand nemen indien nodig.</li>
          <li>Twijfel is een signaal van stoppen.</li>
        </ul>
      </section>
    </section>

    <div class="end-actions">
      <button class="end-cta" type="button" @click="backToOverview">
        Afronden
      </button>
    </div>
  </main>
</template>