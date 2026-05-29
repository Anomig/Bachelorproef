<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h1>Instellingen</h1>
      <button class="btn-primary">Opslaan</button>
    </div>

    <div class="card" style="margin-top:16px;max-width:720px">
      <label>Profielfoto</label>
      <div style="margin:8px 0 16px"><img src="/src/assets/hero.png" alt="avatar" style="width:80px;border-radius:50%"/></div>

      <label>Naam</label>
      <input placeholder="Naam" />

      <label style="margin-top:12px">E-mailadres</label>
      <input placeholder="naam@voorbeeld.nl" />

      <label style="margin-top:12px">Wachtwoord</label>
      <input placeholder="Wachtwoord" />

      <div style="margin-top:12px;text-align:right">
        <button class="btn-primary">Opslaan</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
label{display:block;margin-bottom:6px;color:var(--color-text)}
input{width:100%;padding:10px;border-radius:12px;border:1px solid var(--color-border);background:var(--color-surface-soft)}
</style>
