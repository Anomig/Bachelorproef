<template>
  <div class="auth-page">
    <div class="auth-shell">
      <img :src="logoUrl" alt="Sensus" class="auth-logo" />

      <div class="auth-card">
        <p class="auth-kicker">Account aanmaken</p>
        <h1 class="auth-title">Aanmelden</h1>
        <p class="auth-copy">Maak een beheeraccount aan voor deze demo-omgeving.</p>

        <FormField v-model="name" label="Naam" placeholder="Naam" />
        <FormField v-model="email" label="E-mailadres" placeholder="E-mailadres" />
        <FormField v-model="password" label="Wachtwoord" placeholder="Wachtwoord" type="password" />

        <div class="auth-actions">
          <router-link class="link-muted" to="/login">Terug naar inloggen</router-link>
          <AppButton class="auth-btn" label="Account aanmaken" @click="signup" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '../components/AppButton.vue'
import FormField from '../components/FormField.vue'
import logoUrl from '../assets/logoDonker.svg'
import { signUp } from '../services/authService'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

async function signup() {
  try {
    await signUp(email.value, password.value, name.value)
    router.push('/login')
  } catch (e: any) {
    console.error('Signup failed', e)
    alert(e.message || 'Account aanmaken mislukt')
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top left, rgba(185, 29, 138, 0.12), transparent 32%),
    radial-gradient(circle at bottom right, rgba(17, 72, 95, 0.1), transparent 30%),
    var(--color-background, #f7f4f2);
  padding: 32px;
}

.auth-shell {
  width: min(480px, 100%);
  display: grid;
  gap: 18px;
  justify-items: center;
}

.auth-logo {
  width: 92px;
  height: auto;
  display: block;
}

.auth-card {
  width: 100%;
  background: var(--color-surface, #fff);
  border: 1px solid rgba(2, 40, 55, 0.08);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 14px 32px rgba(2, 40, 55, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-kicker {
  margin: 0;
  color: var(--color-primary, #b91d8a);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.82rem;
}

.auth-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--color-text-strong, #1e1e1e);
}

.auth-copy {
  margin: 0;
  color: var(--color-text, #454147);
  line-height: 1.5;
}

.auth-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}

.auth-btn {
  min-width: 160px;
}

.link-muted {
  color: var(--color-primary, #6f0553);
  font-size: 14px;
  font-weight: 600;
}

@media (max-width: 520px) {
  .auth-page {
    padding: 20px;
    align-items: flex-start;
  }

  .auth-logo {
    width: 76px;
  }

  .auth-card {
    padding: 24px;
    border-radius: 18px;
  }

  .auth-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .auth-btn {
    width: 100%;
    min-width: 0;
  }
}
</style>
