<script setup>
// Startscherm: introduceert de app en stuurt door naar de code-invoer.
import { useRouter } from 'vue-router'
import AppButton from '../components/AppButton.vue'

const router = useRouter()

function goToCode() {
  router.push('/join')
}
</script>

<template>
  <main class="page-shell page-shell--start">
    <section class="start-screen">
      <img class="start-screen__logo" src="/images/Logo-groot-black.png" alt="Sensus">

      <header class="start-screen__copy">
        <h1>Oefen met grenzen en consent</h1>
        <p>
          Ontdek realistische situaties en leer hoe jij op een veilige, respectvolle manier kan reageren.
        </p>
      </header>

      <AppButton class="start-screen__button" variant="secondary" @click="goToCode">
        Start
      </AppButton>
    </section>
  </main>
</template>