<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'
import CodeInput from '../components/CodeInput.vue'

const router = useRouter()
const store = useSessionStore()

const code = ref('')

function join() {
  const ok = store.joinWithCode(code.value)
  if (ok) {
    router.push('/overview')
  }
}
</script>

<template>
  <main class="page-shell page-shell--join">
    <section class="page-card page-card--narrow">
      <img src="@/assets/images/Logo-groot-black.png" alt="logo-zwart">
      <p class="page-intro">
        Voer de code in om te starten.
      </p>

      <label class="form-label" for="code">Code</label>
      <CodeInput v-model="code" @keyup.enter="join" />

      <div class="actions-row">
        <AppButton @click="join">
          Verder
        </AppButton>
      </div>

      <p v-if="store.joinError" class="form-error">
        {{ store.joinError }}
      </p>

      <p class="form-hint">
        Demo-code: <strong>1234</strong>
      </p>
    </section>
  </main>
</template>