<template>
  <main class="start">
    <h1>Sensus</h1>

    <p>
      Een interactieve ervaring die jongeren helpt
      nadenken over consent en grensoverschrijdend gedrag.
    </p>

    <button @click="start">Start</button>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function start() {
  router.push('/onboarding')
}
</script>

<style scoped>
.start{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:100vh;
  text-align:center;
}
</style>