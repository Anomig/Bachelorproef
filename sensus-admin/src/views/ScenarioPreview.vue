<template>
  <div class="scenario-preview">
    <div class="page-header scenario-preview__header">
      <div>
        <p class="scenario-preview__eyebrow">Scenario preview</p>
        <h1>Preview: {{ scenario.title }}</h1>
      </div>

      <div class="scenario-preview__actions">
        <router-link :to="`/scenarios/${id}`" class="scenario-preview__link">Terug naar detail</router-link>
        <button class="btn-primary" type="button">Open walkthrough</button>
      </div>
    </div>

    <div class="scenario-preview__grid">
      <section class="card scenario-preview__stage">
        <div class="scenario-preview__phone">
          <div class="scenario-preview__phone-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="scenario-preview__phone-body">
            <p class="scenario-preview__label">Intro</p>
            <h2>{{ scenario.title }}</h2>
            <p class="scenario-preview__description">{{ scenario.description }}</p>
            <div class="scenario-preview__cta-row">
              <button class="btn-primary" type="button">Start scenario</button>
              <button class="scenario-preview__ghost" type="button">Bewaar later</button>
            </div>
          </div>
        </div>
      </section>

      <aside class="card scenario-preview__side">
        <div class="scenario-preview__section-head">
          <h2>Overzicht</h2>
          <p>Een snelle check van de inhoud en flow.</p>
        </div>

        <ul class="scenario-preview__facts">
          <li><span>Titel</span><strong>{{ scenario.title }}</strong></li>
          <li><span>ID</span><strong>{{ scenario.id }}</strong></li>
          <li><span>Status</span><strong>Preview klaar</strong></li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import scenarios from '../mock/mockScenarios.ts'

const route = useRoute()
const id = route.params.id
const scenario = ref({ id: '', title: 'Laden...', description: '' })

onMounted(() => {
  const found = scenarios.find((s: any) => String(s.id) === String(id))
  if (found) {
    scenario.value = found
  }
})
</script>

<style scoped>
.scenario-preview {
  display: grid;
  gap: 18px;
}

.scenario-preview__header {
  margin-bottom: 0;
}

.scenario-preview__eyebrow {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.scenario-preview__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.scenario-preview__link,
.scenario-preview__ghost {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-strong);
  font: inherit;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.scenario-preview__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.85fr);
  gap: 16px;
}

.scenario-preview__stage {
  display: grid;
  place-items: center;
  min-height: 520px;
}

.scenario-preview__phone {
  width: min(420px, 100%);
  padding: 16px;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(6, 70, 96, 0.07), rgba(165, 10, 126, 0.06));
  border: 1px solid rgba(2, 40, 55, 0.08);
  box-shadow: 0 18px 36px rgba(2, 40, 55, 0.12);
}

.scenario-preview__phone-top {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 18px;
}

.scenario-preview__phone-top span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(2, 40, 55, 0.22);
}

.scenario-preview__phone-body {
  display: grid;
  gap: 12px;
  padding: 22px;
  border-radius: 22px;
  background: var(--color-surface);
}

.scenario-preview__label {
  margin: 0;
  color: var(--purple-700);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.scenario-preview__phone-body h2 {
  margin: 0;
}

.scenario-preview__description {
  margin: 0;
  color: var(--color-text);
  line-height: 1.65;
}

.scenario-preview__cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.scenario-preview__side {
  display: grid;
  gap: 18px;
}

.scenario-preview__section-head h2 {
  margin: 0;
  font-size: 1.1rem;
}

.scenario-preview__section-head p {
  margin: 6px 0 0;
  color: var(--color-text);
}

.scenario-preview__facts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.scenario-preview__facts li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.scenario-preview__facts span {
  color: var(--color-text);
}

.scenario-preview__facts strong {
  color: var(--color-text-strong);
}

@media (max-width: 960px) {
  .scenario-preview__grid {
    grid-template-columns: 1fr;
  }

  .scenario-preview__stage {
    min-height: auto;
  }
}
</style>
