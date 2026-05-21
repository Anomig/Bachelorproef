<script setup>
// Code-scherm: valideert de sessiecode en gaat automatisch door naar de volgende stap.
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import CodeInput from '../components/CodeInput.vue'

const router = useRouter()
const store = useSessionStore()

const code = ref('')
const isJoining = ref(false)

watch(code, (value) => {
  if (isJoining.value) return
  if (String(value || '').length === 4) {
    join()
  }
})

function join() {
  if (isJoining.value) return

  isJoining.value = true
  const ok = store.joinWithCode(code.value)
  if (ok) {
    router.push('/info')
    return
  }

  isJoining.value = false
}
</script>

<template>
  <main class="page-shell page-shell--join-code">
    <section class="join-code-screen">
      <img class="join-code-screen__logo" src="/images/Logo-groot-black.png" alt="Sensus">
      <h1 class="join-code-screen__title">Voer de code in om te starten.</h1>

      <CodeInput v-model="code" @keyup.enter="join" />

      <p v-if="store.joinError" class="join-code-screen__error">
        {{ store.joinError }}
      </p>
    </section>
  </main>
</template>