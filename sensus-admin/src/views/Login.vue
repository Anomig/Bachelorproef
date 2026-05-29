<template>
  <div class="hero">
    <div class="hero-left">
      <div class="hero-img">Illustratie/Logo</div>
    </div>
    <div class="hero-form card">
      <h2>Inloggen</h2>
      <FormField label="E-mailadres" placeholder="E-mailadres" />
      <FormField label="Wachtwoord" placeholder="Wachtwoord" type="password" />
      <div style="margin-top:16px;text-align:right">
        <router-link to="/signup">Aanmelden</router-link>
        <AppButton style="margin-left:12px" label="Inloggen" @click="login" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../components/AppButton.vue'
import FormField from '../components/FormField.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

function login(){
  // mock login — store a simple flag and redirect
  localStorage.setItem('sensus_user','admin')
  router.push('/')
}
</script>
