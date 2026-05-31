<template>
  <div class="analytics-page">
    <div class="page-header analytics-page__header">
      <div>
        <p class="analytics-page__eyebrow">Data & inzichten</p>
        <h1>Inzichten</h1>
      </div>

      <button class="btn-primary" type="button">Export</button>
    </div>

    <div class="page-subnav tabs analytics-page__tabs">
      <button :class="['tab', selectedScope === 'all' && 'active']" type="button" @click="setScope('all')">Alle sessies</button>
      <button :class="['tab', selectedScope === 'week' && 'active']" type="button" @click="setScope('week')">Deze week</button>
      <button :class="['tab', selectedScope === 'today' && 'active']" type="button" @click="setScope('today')">Vandaag</button>
    </div>

    <div class="metrics-grid-4 analytics-page__metrics">
      <div class="card analytics-page__metric">
        <div class="analytics-page__metric-label">Sessies</div>
        <div class="analytics-page__metric-value">{{ snapshot.sessions }}</div>
      </div>
      <div class="card analytics-page__metric">
        <div class="analytics-page__metric-label">Voltooid</div>
        <div class="analytics-page__metric-value">{{ snapshot.completed }}%</div>
      </div>
      <div class="card analytics-page__metric">
        <div class="analytics-page__metric-label">Gem. sessieduur</div>
        <div class="analytics-page__metric-value">{{ snapshot.averageDuration }}</div>
      </div>
      <div class="card analytics-page__metric">
        <div class="analytics-page__metric-label">Afhaak %</div>
        <div class="analytics-page__metric-value">{{ snapshot.dropout }}%</div>
      </div>
    </div>

    <section class="card analytics-page__panel">
      <div class="toolbar analytics-page__toolbar">
        <label for="analytics-scenario">Scenario:</label>
        <select id="analytics-scenario" class="select analytics-page__select">
          <option>Online gesprek loopt vast</option>
          <option>Omgaan met pesten</option>
          <option>Sociale media</option>
        </select>
      </div>

      <div class="metrics-grid-4 analytics-page__mini-grid">
        <div class="card analytics-page__mini-card">Sessies deze week<strong>{{ snapshot.thisWeek }}</strong></div>
        <div class="card analytics-page__mini-card">Voltooid<strong>{{ snapshot.completed }}%</strong></div>
        <div class="card analytics-page__mini-card">Gem. sessieduur<strong>{{ snapshot.averageDuration }}</strong></div>
        <div class="card analytics-page__mini-card">Afhaak %<strong>{{ snapshot.dropout }}%</strong></div>
      </div>

      <div class="analytics-page__table-shell table-shell">
        <div class="analytics-page__section-head">
          <h2>Reflectieresultaten</h2>
          <p>Recente reflecties uit de geselecteerde context.</p>
        </div>

        <table>
          <colgroup>
            <col class="analytics-col analytics-col--user" />
            <col class="analytics-col analytics-col--date" />
            <col class="analytics-col analytics-col--age" />
            <col class="analytics-col analytics-col--gender" />
            <col class="analytics-col analytics-col--reflection" />
          </colgroup>
          <thead>
            <tr>
              <th>Gebruiker/id</th>
              <th>Datum</th>
              <th>Leeftijd</th>
              <th>Gender</th>
              <th>Reflectie</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in reflections" :key="r.userId">
              <td>{{ r.userId }}</td>
              <td>{{ r.date }}</td>
              <td>{{ r.age }}</td>
              <td>{{ r.gender }}</td>
              <td>{{ r.reflection }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div class="metrics-grid-3 analytics-page__charts">
      <div class="card analytics-page__chart-card">
        <h3>Completion</h3>
        <ChartPie />
      </div>
      <div class="card analytics-page__chart-card">
        <h3>Drop-off</h3>
        <ChartPie />
      </div>
      <div class="card analytics-page__chart-card">
        <h3>Offline vs online</h3>
        <ChartPie />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChartPie from '../components/ChartPie.vue'
import analyticsService from '../services/analyticsService'

const selectedScope = ref<'all' | 'week' | 'today'>('all')
const snapshot = ref({ sessions: 689, completed: 70, averageDuration: '11 min', dropout: 32, offline: 30, thisWeek: 128 })
const reflections = ref<any[]>([])

async function refresh() {
  snapshot.value = await analyticsService.getSnapshot(selectedScope.value)
  reflections.value = await analyticsService.listReflections()
}

function setScope(scope: 'all' | 'week' | 'today') {
  selectedScope.value = scope
  void refresh()
}

onMounted(() => {
  void refresh()
})
</script>

<style scoped>
.analytics-page {
  display: grid;
  gap: 18px;
}

.analytics-page__header {
  margin-bottom: 0;
}

.analytics-page__eyebrow {
  margin: 0 0 8px;
  color: var(--color-text);
  font-size: 0.9rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.analytics-page__tabs {
  margin-bottom: 0;
}

.analytics-page__metric-label,
.analytics-page__mini-card {
  color: var(--color-text);
}

.analytics-page__metric-value {
  margin-top: 8px;
  color: var(--color-text-strong);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.analytics-page__panel {
  display: grid;
  gap: 18px;
}

.analytics-page__toolbar {
  align-items: center;
}

.analytics-page__select {
  min-width: 240px;
}

.analytics-page__mini-grid {
  gap: 12px;
}

.analytics-page__mini-card {
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  font-weight: 600;
}

.analytics-page__mini-card strong {
  color: var(--color-text-strong);
  font-size: 1.2rem;
}

.analytics-page__section-head h2,
.analytics-page__chart-card h3 {
  margin: 0;
}

.analytics-page__section-head p {
  margin: 6px 0 0;
  color: var(--color-text);
}

.analytics-page__table-shell {
  margin-top: 2px;
}

.analytics-page__table-shell table {
  margin-top: 14px;
  table-layout: fixed;
}

.analytics-page__table-shell th,
.analytics-page__table-shell td {
  padding: 14px 12px;
  vertical-align: top;
}

.analytics-col--user {
  width: 18%;
}

.analytics-col--date {
  width: 16%;
}

.analytics-col--age {
  width: 10%;
}

.analytics-col--gender {
  width: 10%;
}

.analytics-col--reflection {
  width: 46%;
}

.analytics-page__chart-card {
  display: grid;
  gap: 16px;
}
</style>

