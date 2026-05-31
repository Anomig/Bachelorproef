<template>
  <div class="settings-page">
    <div class="page-header settings-header">
      <div class="page-header__copy">
        <h1>Instellingen</h1>
        <p class="page-intro">Pas je gegevens aan</p>
      </div>

      <button class="btn-primary settings-top-button" type="button">Opslaan</button>
    </div>

    <section class="card settings-card">
      <div class="settings-form">
        <div class="settings-avatar-block">
          <div class="settings-avatar">
            <span>PD</span>
          </div>
          <button class="settings-avatar-edit" type="button" aria-label="Profielfoto bewerken">✎</button>
        </div>

        <div class="settings-fields">
          <div class="settings-field">
            <label>Naam</label>
            <input v-model="firstName" placeholder="Naam" />
          </div>

          <div class="settings-field">
            <label>Achternaam</label>
            <input v-model="lastName" placeholder="Achternaam" />
          </div>

          <div class="settings-field">
            <label>Jobfunctie</label>
            <input v-model="role" placeholder="admin" />
          </div>

          <div class="settings-field">
            <label>E-mailadres</label>
            <input v-model="email" placeholder="naam@voorbeeld.nl" />
          </div>

          <div class="settings-field settings-field--password">
            <label>Wachtwoord</label>
            <div class="password-field">
              <input v-model="password" type="password" placeholder="Wachtwoord" />
              <button class="password-toggle" type="button" aria-label="Wachtwoord tonen">◔</button>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-actions">
        <button class="btn-primary settings-save-button" type="button">Opslaan</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const firstName = ref('Admin')
const lastName = ref('Profile')
const role = ref('admin')
const email = ref('admin@gmail.com')
const password = ref('')
</script>

<style scoped>
.settings-page {
  display: grid;
  gap: 16px;
}

.settings-header {
  align-items: center;
}

.page-intro {
  color: var(--color-text);
  margin-top: 4px;
}

.settings-top-button,
.settings-save-button {
  min-height: 44px;
  min-width: 120px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(90deg, var(--purple-600), var(--purple-500));
  color: white;
  font-weight: 700;
}

.settings-card {
  max-width: 760px;
  min-height: 540px;
  padding: 18px 20px 16px;
}

.settings-form {
  display: grid;
  grid-template-columns: 172px minmax(0, 1fr);
  gap: 18px;
}

.settings-avatar-block {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  position: relative;
  padding-top: 12px;
}

.settings-avatar {
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--purple-700), var(--blue-600));
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(2, 40, 55, 0.18);
}

.settings-avatar-edit {
  position: absolute;
  left: 68px;
  top: 82px;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid rgba(2, 40, 55, 0.12);
  background: white;
  color: var(--color-text-strong);
  box-shadow: 0 6px 16px rgba(2, 40, 55, 0.08);
}

.settings-fields {
  display: grid;
  gap: 14px;
  align-content: start;
}

.settings-field {
  display: grid;
  gap: 6px;
}

.settings-field label {
  color: var(--color-text, #454147);
}

.settings-field input {
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(2, 40, 55, 0.08);
  background: white;
}

.password-field {
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid rgba(2, 40, 55, 0.08);
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.password-field input {
  border: none;
  border-radius: 0;
  flex: 1;
}

.password-toggle {
  width: 42px;
  height: 42px;
  border: none;
  background: white;
  color: var(--color-text-strong);
  border-left: 1px solid rgba(2, 40, 55, 0.08);
}

.settings-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

@media (max-width: 760px) {
  .settings-form {
    grid-template-columns: 1fr;
  }

  .settings-avatar-block {
    padding-top: 0;
    justify-content: flex-start;
  }
}
</style>
