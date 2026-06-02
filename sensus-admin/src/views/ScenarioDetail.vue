<template>
  <div class="scenario-detail">
    <div class="page-header scenario-detail__header">
      <div>
        <p class="scenario-detail__eyebrow">Scenario details</p>
        <h1>{{ scenario.title }}</h1>
        <div class="scenario-detail__meta">
          <span :class="['status-chip', scenario.status === 'published' ? 'status-chip--published' : 'status-chip--draft']">
            {{ scenario.status }}
          </span>
          <span class="scenario-detail__id">ID {{ scenario.id }}</span>
        </div>
      </div>

      <div class="scenario-detail__actions">
        <router-link :to="`/scenarios/${id}/edit`" class="btn-secondary scenario-detail__action">Bewerken</router-link>
        <router-link :to="`/scenarios/${id}/preview`" class="btn-primary scenario-detail__action">Voorbeeld</router-link>
        <button class="scenario-detail__toggle" type="button" @click="togglePublish">
          {{ scenario.status === 'published' ? 'Terugzetten naar concept' : 'Publiceren' }}
        </button>
      </div>
    </div>

    <div class="scenario-detail__grid">
      <section class="card scenario-detail__main">
        <div class="scenario-detail__section-head">
          <h2>Beschrijving</h2>
          <p>De inhoud zoals die in het scenario gebruikt wordt.</p>
        </div>
        <p class="scenario-detail__description">{{ scenario.description }}</p>
      </section>

      <aside class="card scenario-detail__side">
        <div class="scenario-detail__section-head">
          <h2>Snelle info</h2>
          <p>Een compact overzicht van de huidige status.</p>
        </div>
        <dl class="scenario-detail__facts">
          <div>
            <dt>Status</dt>
            <dd>{{ scenario.status }}</dd>
          </div>
          <div>
            <dt>Scenario</dt>
            <dd>{{ scenario.title }}</dd>
          </div>
          <div>
            <dt>Actie</dt>
            <dd>{{ scenario.status === 'published' ? 'Publiek zichtbaar' : 'Alleen intern' }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import scenariosService from '../services/scenariosService'

const route = useRoute()
const id = route.params.id

const scenario = ref<any>({
  id: '',
  title: 'Niet gevonden',
  description: 'Dit scenario is nog niet beschikbaar.',
  status: 'unknown'
})

async function loadScenario() {
  const found = await scenariosService.findScenario(id as any)
  if (found) {
    scenario.value = { ...found }
  }
}

onMounted(loadScenario)

async function togglePublish() {
  const nextPublishState = scenario.value.status !== 'published'
  await scenariosService.updateScenario(id as any, {
    title: scenario.value.title,
    description: scenario.value.description,
    theme: scenario.value.theme || ''
  }, nextPublishState)
  await loadScenario()
}
</script>

<style scoped>
.scenario-detail {
  display: grid;
  gap: 18px;
}

.scenario-detail__header {
  margin-bottom: 0;
}

.scenario-detail__eyebrow {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.scenario-detail h1 {
  margin: 0;
}

.scenario-detail__meta,
.scenario-detail__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.status-chip,
.scenario-detail__id {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-chip--published {
  background: rgba(72, 161, 109, 0.12);
  color: #28734a;
}

.status-chip--draft {
  background: rgba(165, 10, 126, 0.1);
  color: var(--purple-700);
}

.scenario-detail__id {
  background: rgba(2, 40, 55, 0.06);
  color: var(--color-text-strong);
}

.scenario-detail__action,
.scenario-detail__toggle {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  border: none;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.scenario-detail__toggle {
  background: var(--color-surface);
  color: var(--color-text-strong);
  border: 1px solid var(--color-border);
}

.scenario-detail__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.85fr);
  gap: 16px;
}

.scenario-detail__main,
.scenario-detail__side {
  display: grid;
  gap: 16px;
}

.scenario-detail__section-head h2 {
  margin: 0;
  font-size: 1.1rem;
}

.scenario-detail__section-head p {
  margin: 6px 0 0;
  color: var(--color-text);
}

.scenario-detail__description {
  margin: 0;
  color: var(--color-text-strong);
  line-height: 1.65;
}

.scenario-detail__facts {
  display: grid;
  gap: 14px;
  margin: 0;
}

.scenario-detail__facts div {
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface-soft);
}

.scenario-detail__facts dt {
  margin-bottom: 6px;
  color: var(--color-text);
  font-size: 0.875rem;
}

.scenario-detail__facts dd {
  margin: 0;
  color: var(--color-text-strong);
  font-weight: 600;
}

@media (max-width: 960px) {
  .scenario-detail__grid {
    grid-template-columns: 1fr;
  }
}
</style>
