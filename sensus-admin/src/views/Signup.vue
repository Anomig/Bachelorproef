<template>
  <div class="hero">
    <div class="hero-left">
      <div class="hero-img">Illustratie/Logo</div>
    </div>
    <div class="hero-form card">
      <h2>Aanmelden</h2>
      <FormField label="Naam" placeholder="Naam" />
      <FormField label="E-mailadres" placeholder="E-mailadres" />
      <div style="margin-top:12px;text-align:right">
        <AppButton label="Aanmelden" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '../components/AppButton.vue'
import FormField from '../components/FormField.vue'
</script>
