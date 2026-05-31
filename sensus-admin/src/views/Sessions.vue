<template>
  <div class="sessions-page">
    <div class="page-header sessions-header">
      <div class="page-header__copy">
        <h1>Sessies</h1>
        <div class="page-subnav tabs">
          <button class="tab active">Alle sessies (43)</button>
          <button class="tab">Actief (0)</button>
          <button class="tab">Voltooid (43)</button>
        </div>
      </div>

      <router-link to="/sessions/new" class="create-link">
        <button class="btn-primary create-button">+ Nieuwe sessie</button>
      </router-link>
    </div>

    <div class="metrics-grid-5 sessions-metrics">
      <article class="card metric-card metric-card--session">
        <div class="metric-label">Sessies deze week</div>
        <div class="metric-value metric-value--accent">43</div>
        <div class="metric-meta">Op basis van live data</div>
      </article>
      <article class="card metric-card metric-card--session">
        <div class="metric-label">Voltooid</div>
        <div class="metric-value metric-value--accent">100%</div>
      </article>
      <article class="card metric-card metric-card--session">
        <div class="metric-label">Gem. sessie duur</div>
        <div class="metric-value metric-value--accent">0 sec</div>
      </article>
      <article class="card metric-card metric-card--session">
        <div class="metric-label">Afhaak %</div>
        <div class="metric-value metric-value--accent">0%</div>
      </article>
      <article class="card metric-card metric-card--session">
        <div class="metric-label">Offline %</div>
        <div class="metric-value metric-value--accent">0%</div>
      </article>
    </div>

    <section class="card sessions-card">
      <h3 class="panel-title">Recente sessies</h3>
      <p class="sessions-subtitle">Filter en zoek door de laatste sessies.</p>

      <div class="toolbar sessions-toolbar">
        <label class="search-field search-field--wide">
          <span class="search-field__icon">⌕</span>
          <input v-model="query" placeholder="Zoeken" class="search-input" />
        </label>
        <select class="select" v-model="filterScenario">
          <option>Alle scenario's</option>
        </select>
        <select class="select" v-model="filterStatus">
          <option>Datum</option>
        </select>
      </div>

      <div class="table-shell sessions-table-shell">
        <table class="sessions-table">
          <thead>
            <tr>
              <th style="width:40px"><input type="checkbox" /></th>
              <th>Naam/id</th>
              <th>Scenario</th>
              <th>Datum</th>
              <th>Start</th>
              <th>Einde</th>
              <th>Status</th>
              <th style="width:42px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="session in sessions" :key="session.id">
              <td><input type="checkbox" /></td>
              <td class="session-id">{{ session.id }}</td>
              <td>{{ session.scenario }}</td>
              <td>{{ session.date }}</td>
              <td>{{ session.start }}</td>
              <td>{{ session.end }}</td>
              <td><span class="status-pill">Voltooid</span></td>
              <td class="ellipsis">⋯</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination pagination--sessions">
        <span>‹ Vorige</span>
        <span>Volgende ›</span>
      </div>
    </section>

    <section class="card scenario-performance-card">
      <div class="scenario-performance-head">
        <div>
          <h3 class="panel-title">Scenario prestaties</h3>
          <p class="sessions-subtitle">De verdeling per scenario op basis van de huidige selectie.</p>
        </div>
        <div class="performance-chip">Afhaak ligt op 0% voor dit scenario</div>
      </div>

      <div class="table-shell performance-table-shell">
        <table class="performance-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Sessies</th>
              <th>Voltooid %</th>
              <th>Gem. duur</th>
              <th>Afhaak %</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in performanceRows" :key="row.title">
              <td class="scenario-title">{{ row.title }}</td>
              <td>{{ row.sessions }}</td>
              <td>100%</td>
              <td>0 sec</td>
              <td>0%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sessions = [
  { id: 'f146d041', scenario: 'Situatie op een feestje', date: '31/05/2026, 16:53', start: '31/05/2026, 16:53', end: '31/05/2026, 16:54' },
  { id: '8cefc044', scenario: 'Online gesprek loopt vast', date: '31/05/2026, 14:43', start: '31/05/2026, 14:43', end: '31/05/2026, 14:44' },
  { id: 'd2290cb9', scenario: 'Het is maar een grap', date: '31/05/2026, 14:39', start: '31/05/2026, 14:39', end: '31/05/2026, 14:40' },
  { id: '7d46fd64', scenario: 'Het is maar een grap', date: '31/05/2026, 08:44', start: '31/05/2026, 08:44', end: '31/05/2026, 08:45' },
  { id: '0cab32d0', scenario: 'Online gesprek loopt vast', date: '30/05/2026, 16:30', start: '30/05/2026, 16:30', end: '30/05/2026, 16:31' },
  { id: '4770d90', scenario: 'Het is maar een grap', date: '30/05/2026, 16:30', start: '30/05/2026, 16:30', end: '30/05/2026, 16:30' },
  { id: '82adfa74', scenario: 'Situatie op een feestje', date: '30/05/2026, 16:29', start: '30/05/2026, 16:29', end: '30/05/2026, 16:29' },
  { id: 'd6349fe4', scenario: 'Online gesprek loopt vast', date: '30/05/2026, 16:28', start: '30/05/2026, 16:28', end: '30/05/2026, 16:29' },
  { id: 'b07c6d40', scenario: 'Het is maar een grap', date: '30/05/2026, 16:28', start: '30/05/2026, 16:28', end: '30/05/2026, 16:28' },
  { id: '71490729', scenario: 'Situatie op een feestje', date: '30/05/2026, 16:27', start: '30/05/2026, 16:27', end: '30/05/2026, 16:27' }
]

const performanceRows = [
  { title: 'Situatie op een feestje', sessions: 17 },
  { title: 'Online gesprek loopt vast', sessions: 13 },
  { title: 'Het is maar een grap', sessions: 13 }
]

const query = ref('')
const filterScenario = ref('Alle scenario\'s')
const filterStatus = ref('Datum')
</script>

<style scoped>
.sessions-page {
  display: grid;
  gap: 16px;
}

.sessions-header {
  align-items: flex-start;
  margin-bottom: 4px;
}

.sessions-header h1 {
  font-size: 1.8rem;
}

.sessions-metrics {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-top: -2px;
}

.metric-card--session {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px 12px;
  min-height: 88px;
}

.metric-value--accent {
  color: #b01082;
  font-size: clamp(1.35rem, 1.55vw, 1.85rem);
  line-height: 1.1;
  margin-top: auto;
  margin-bottom: auto;
}

.metric-meta {
  margin-top: 4px;
  color: #41a45d;
  font-size: 0.78rem;
}

.create-button {
  min-width: 168px;
  min-height: 44px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(90deg, var(--purple-600), var(--purple-500));
  color: white;
  font-weight: 700;
}

.sessions-card,
.scenario-performance-card {
  padding: 10px 12px 8px;
}

.sessions-subtitle {
  color: var(--color-text);
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 0.92rem;
}

.sessions-toolbar {
  margin-top: 8px;
  margin-bottom: 6px;
}

.search-field--wide {
  flex: 1 1 540px;
  background: white;
}

.select {
  min-height: 42px;
  min-width: 130px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: white;
}

.sessions-table {
  width: 100%;
  border-collapse: collapse;
}

.sessions-table thead th,
.performance-table thead th {
  padding: 8px 10px;
  text-align: left;
  font-weight: 600;
  color: var(--color-text);
  border-bottom: 1px solid rgba(2, 40, 55, 0.08);
}

.sessions-table tbody td,
.performance-table tbody td {
  padding: 9px 10px;
  border-bottom: 1px solid rgba(2, 40, 55, 0.08);
  color: var(--color-text);
}

.session-id,
.scenario-title {
  color: var(--color-text-strong);
  font-weight: 600;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(62, 195, 98, 0.14);
  color: #3abf61;
  font-size: 0.84rem;
  font-weight: 700;
}

.ellipsis {
  text-align: center;
  color: var(--color-text-strong);
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  padding-top: 8px;
  color: var(--color-text);
  font-weight: 600;
}

.scenario-performance-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.performance-chip {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(67, 130, 255, 0.12);
  color: #3f7df7;
  font-size: 0.84rem;
  font-weight: 700;
}

.performance-table-shell {
  overflow: hidden;
}

@media (max-width: 1100px) {
  .sessions-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .sessions-metrics {
    grid-template-columns: 1fr;
  }

  .scenario-performance-head {
    flex-direction: column;
  }
}
</style>
