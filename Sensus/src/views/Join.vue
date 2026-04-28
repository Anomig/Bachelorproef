<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '../stores/sessionStore'
import AppButton from '../components/AppButton.vue'

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
      <p class="page-kicker">Start</p>
      <h1>Neem deel met code</h1>
      <p class="page-intro">
        Vul je sessiecode in om de scenario's te bekijken.
      </p>

      <label class="form-label" for="code">Code</label>
      <input
        id="code"
        v-model="code"
        class="form-input"
        type="text"
        placeholder="Bijv. SEN123"
        autocomplete="off"
        @keyup.enter="join"
      />

      <div class="actions-row">
        <AppButton @click="join">
          Verder
        </AppButton>
      </div>

      <p v-if="store.joinError" class="form-error">
        {{ store.joinError }}
      </p>

      <p class="form-hint">
        Demo-code: <strong>SEN123</strong>
      </p>
    </section>
  </main>
</template>