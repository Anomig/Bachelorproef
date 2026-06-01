<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <img :src="logoUrl" alt="Sensus" class="brand-image" />
      </div>

      <h2 class="login-title">Inloggen</h2>

      <FormField label="E-mailadres" placeholder="jouw@voorbeeld.nl" v-model="email" />
      <FormField label="Wachtwoord" placeholder="Wachtwoord" type="password" v-model="password" />

      <div class="login-actions">
        <router-link class="link-muted" to="/signup">Nog geen account?</router-link>
        <AppButton class="login-btn" label="Inloggen" @click="login" />
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
import { signIn } from '../services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')

async function login() {
  try {
    await signIn(email.value, password.value)
    router.push('/')
  } catch (e:any) {
    console.error('Login failed', e)
    alert(e.message || 'Login failed')
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background, #f7f4f2);
  padding: 32px;
}

.login-card {
  width: min(460px, 100%);
  background: var(--color-surface, #fff);
  border: 1px solid rgba(2, 40, 55, 0.08);
  border-radius: 18px;
  justify-content: center;
  padding: 32px;
  box-shadow: 0 10px 28px rgba(2, 40, 55, 0.08);
.brand-image{ width:88px; height:auto; display:block }
  gap: 16px;
}

.login-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 2px;
}

.brand-image {
  width: 56px;
  height: auto;
  display: block;
}

.brand-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
  color: var(--color-text-strong, #1e1e1e);
}

.login-title {
  margin: 8px 0 2px 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.login-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 8px;
}

.login-btn {
  min-width: 150px;
}

.link-muted {
  color: var(--color-primary, #6f0553);
  font-size: 14px;
}

@media (max-width: 520px) {
  .login-page {
    padding: 20px;
    align-items: flex-start;
  }

  .login-card {
    padding: 24px;
    border-radius: 16px;
  }

  .login-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .login-btn {
    width: 100%;
    min-width: 0;
    margin-left: 0;
  }
}
</style>
