<template>
  <div class="scenarios-page">
    <div class="page-header scenarios-header">
      <div class="page-header__copy">
        <h1>Scenario's</h1>
        <div class="page-subnav tabs">
          <button class="tab active">Alle scenario's</button>
          <button class="tab">Actief ({{ activeCount }})</button>
          <button class="tab">Concepten ({{ draftCount }})</button>
        </div>
      </div>

      <router-link to="/scenarios/new" class="create-link">
        <button class="btn-primary create-button">+ Nieuw scenario</button>
      </router-link>
    </div>

    <section class="card scenarios-card">
      <div class="toolbar filters scenarios-toolbar">
        <label class="search-field">
          <span class="search-field__icon">⌕</span>
          <input v-model="query" placeholder="Zoeken" class="search-input" />
        </label>
        <select v-model="theme" class="select">
          <option>Alle thema's</option>
        </select>
        <select v-model="status" class="select">
          <option>Alle statussen</option>
          <option>published</option>
          <option>draft</option>
        </select>
      </div>

      <div class="table-shell scenarios-table-shell">
        <table class="list-table">
          <thead>
            <tr>
              <th style="width:44px"><input type="checkbox" /></th>
              <th>Naam</th>
              <th>Thema</th>
              <th>Datum</th>
              <th>Sessies</th>
              <th>Status</th>
              <th style="width:56px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="scenario in filtered" :key="scenario.id">
              <td><input type="checkbox" /></td>
              <td class="scenario-name">{{ scenario.title }}</td>
              <td>{{ scenario.theme }}</td>
              <td>{{ scenario.date }}</td>
              <td>{{ scenario.sessions }}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" :checked="scenario.status === 'published'" />
                  <span class="slider"></span>
                </label>
              </td>
              <td class="ellipsis">⋮</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span>‹ Vorige</span>
        <span>Volgende ›</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import scenariosService from '../services/scenariosService'

const query = ref('')
const theme = ref('Alle thema\'s')
const status = ref('Alle statussen')

const scenariosList = ref<any[]>([])

onMounted(async () => {
  scenariosList.value = await scenariosService.listScenarios()
})

const filtered = computed(()=>{
  const q = query.value.trim().toLowerCase()
  return scenariosList.value.filter((scenario) => {
    const matchesQ = !q || scenario.title.toLowerCase().includes(q)
    const matchesStatus = status.value === 'Alle statussen' || scenario.status === status.value
    return matchesQ && matchesStatus
  })
})

const activeCount = computed(() => scenariosList.value.filter((scenario) => scenario.status === 'published').length)
const draftCount = computed(() => scenariosList.value.filter((scenario) => scenario.status === 'draft').length)
</script>

<style scoped>
.scenarios-page {
  display: grid;
  gap: 14px;
}

.scenarios-header {
  align-items: flex-start;
}

.create-button {
  min-width: 208px;
  min-height: 44px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(90deg, var(--purple-600), var(--purple-500));
  color: white;
  font-weight: 700;
}

.tab {
  color: var(--color-text);
}

.tab.active {
  color: var(--color-text-strong);
}

.scenarios-card {
  padding: 12px 12px 10px;
}

.scenarios-toolbar {
  gap: 10px;
  margin-bottom: 12px;
}

.search-field {
  flex: 1 1 520px;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: white;
}

.search-field__icon {
  color: var(--color-text);
}

.search-input {
  border: none;
  background: transparent;
  min-height: unset;
  padding: 0;
}

.select {
  min-height: 44px;
  min-width: 128px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background: white;
}

.scenarios-table-shell {
  border-radius: 16px;
}

.list-table {
  width: 100%;
  border-collapse: collapse;
}

.list-table thead th {
  padding: 12px 10px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text-strong);
  border-bottom: 1px solid rgba(2, 40, 55, 0.08);
}

.list-table tbody td {
  padding: 16px 10px;
  color: var(--color-text);
  border-bottom: 1px solid rgba(2, 40, 55, 0.08);
}

.scenario-name {
  color: var(--color-text-strong);
  font-weight: 600;
}

.ellipsis {
  text-align: center;
  color: var(--color-text-strong);
  font-size: 1.25rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: #d8d8d8;
  border-radius: 999px;
  transition: 0.2s ease;
}

.slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  left: 3px;
  top: 3px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  transition: 0.2s ease;
}

.switch input:checked + .slider {
  background: #0f4f66;
}

.switch input:checked + .slider::before {
  transform: translateX(20px);
}

.pagination {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding: 12px 10px 4px;
  color: var(--color-text);
  font-weight: 600;
}
</style>
