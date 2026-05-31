<template>
  <div class="scenario-editor">
    <div class="page-header scenario-editor__header">
      <div>
        <p class="scenario-editor__eyebrow">Scenario editor</p>
        <h1>Scenario beheren</h1>
      </div>

      <div class="scenario-editor__actions">
        <button class="btn-secondary" type="button" @click="save">Opslaan</button>
        <button class="scenario-editor__ghost" type="button">Publiceren</button>
        <router-link :to="`/scenarios/${id}`" class="scenario-editor__link">Annuleer</router-link>
      </div>
    </div>

    <div class="scenario-editor__grid">
      <section class="card scenario-editor__panel">
        <div class="scenario-editor__section-head">
          <h2>Scenario flow</h2>
          <p>Werk hier de inhoud en toon van het scenario bij.</p>
        </div>

        <div class="scenario-editor__form">
          <FormField label="Titel" v-model="scenario.title" placeholder="Titel van het scenario" />
          <FormField label="Tekst" v-model="scenario.description" type="textarea" placeholder="Scenario beschrijving" />
        </div>
      </section>

      <aside class="card scenario-editor__preview">
        <div class="scenario-editor__section-head">
          <h2>Live preview</h2>
          <p>Zo ziet de introductie eruit voor gebruikers.</p>
        </div>

        <div class="scenario-editor__preview-card">
          <span class="scenario-editor__preview-pill">Preview</span>
          <h3>{{ scenario.title }}</h3>
          <p>{{ scenario.description }}</p>
          <div class="scenario-editor__preview-actions">
            <button class="btn-primary" type="button">Start scenario</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import scenariosService from '../services/scenariosService'

import FormField from '../components/FormField.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const scenario = ref({ id: '', title: 'Laden...', description: '' })

onMounted(async () => {
  const found = await scenariosService.findScenario(id as any)
  if (found) {
    scenario.value = { ...found }
  }
})

async function save() {
  await scenariosService.updateScenario(id as any, {
    title: scenario.value.title,
    description: scenario.value.description
  })
  router.push(`/scenarios/${id}`)
}
</script>

<style scoped>
.scenario-editor {
  display: grid;
  gap: 18px;
}

.scenario-editor__header {
  margin-bottom: 0;
}

.scenario-editor__eyebrow {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.scenario-editor__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.scenario-editor__ghost,
.scenario-editor__link {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-strong);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.scenario-editor__link {
  text-decoration: none;
}

.scenario-editor__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.9fr);
  gap: 16px;
}

.scenario-editor__panel,
.scenario-editor__preview {
  display: grid;
  gap: 18px;
}

.scenario-editor__section-head h2 {
  margin: 0;
  font-size: 1.1rem;
}

.scenario-editor__section-head p {
  margin: 6px 0 0;
  color: var(--color-text);
}

.scenario-editor__form {
  display: grid;
  gap: 16px;
}

.scenario-editor__preview-card {
  display: grid;
  gap: 12px;
  padding: 20px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(165, 10, 126, 0.06), rgba(6, 70, 96, 0.04));
  border: 1px solid rgba(2, 40, 55, 0.08);
}

.scenario-editor__preview-pill {
  justify-self: start;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(165, 10, 126, 0.12);
  color: var(--purple-700);
  font-size: 0.8rem;
  font-weight: 700;
}

.scenario-editor__preview-card h3 {
  margin: 0;
  color: var(--color-text-strong);
}

.scenario-editor__preview-card p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.6;
}

.scenario-editor__preview-actions {
  margin-top: 8px;
}

@media (max-width: 960px) {
  .scenario-editor__grid {
    grid-template-columns: 1fr;
  }
}
</style>
