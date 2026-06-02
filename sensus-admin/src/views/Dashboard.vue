<template>
  <div class="dashboard-page">
    <div class="metrics-grid-4 dashboard-hero-grid">
      <article class="card metric-card metric-card--wide">
        <div class="metric-label">Sessies deze week</div>
        <div class="metric-value">{{ metrics.thisWeek }}</div>
      </article>
      <article class="card metric-card metric-card--wide">
        <div class="metric-label">Actieve scenario's</div>
        <div class="metric-value">{{ activeScenarioCount }}</div>
      </article>
      <article class="card metric-card metric-card--wide">
        <div class="metric-label">Gem. sessieduur</div>
        <div class="metric-value">{{ metrics.averageDuration }}</div>
      </article>
      <article class="card metric-card metric-card--wide">
        <div class="metric-label">Afgeronde sessies</div>
        <div class="metric-value">{{ metrics.completed }}%</div>
      </article>
    </div>

    <div class="metrics-grid-2 dashboard-secondary-grid">
      <article class="card metric-card metric-card--small">
        <div class="metric-label">Offline %</div>
        <div class="metric-value">{{ metrics.offline }}%</div>
      </article>
      <article class="card metric-card metric-card--small">
        <div class="metric-label">Voltooide sessies</div>
        <div class="metric-value">{{ metrics.completed }}%</div>
      </article>
    </div>

    <div class="dashboard-grid dashboard-content-grid">
      <section class="card dashboard-panel dashboard-panel--sessions">
        <h3 class="panel-title">Recente sessies</h3>
        <div class="table-shell">
          <table class="recent-table">
            <thead>
              <tr><th>Datum</th><th>Scenario</th><th>Status</th><th>Duur</th></tr>
            </thead>
            <tbody>
              <tr v-for="session in recentSessions" :key="session.id">
                <td>{{ session.date }}</td>
                <td class="strong">{{ session.scenario }}</td>
                <td>
                  <span class="status status--done">{{ session.status }}</span>
                </td>
                <td>{{ session.duration }}</td>
              </tr>
              <tr v-if="!recentSessions.length">
                <td colspan="4">Nog geen sessies gevonden in Supabase.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <router-link class="all-link" to="/sessions">Alles bekijken ›</router-link>
      </section>

      <aside class="dashboard-side-stack">
        <section class="card dashboard-panel">
          <h3 class="panel-title">Populaire scenario's</h3>
          <div class="popular-list">
            <div v-for="item in popularScenarios" :key="item.title" class="popular-item">
              <div class="popular-item__head">
                <div class="popular-item__title">{{ item.title }}</div>
                <div class="popular-item__count">{{ item.count }}</div>
              </div>
              <div class="popular-bar"><span class="popular-bar__fill" :style="{ width: item.width }"></span></div>
            </div>
          </div>
        </section>

        <section class="card dashboard-panel">
          <h3 class="panel-title">Quick actions</h3>
          <div class="quick-actions">
            <button class="btn-primary quick-actions__primary" type="button" @click="goToScenarioCreate">+ Nieuw scenario maken</button>
            <button class="btn-secondary quick-actions__secondary" type="button" @click="goToScenarios">Scenario beheren</button>
          </div>
        </section>
      </aside>

      <section class="card dashboard-panel dashboard-panel--insights">
        <h3 class="panel-title">Belangrijkste inzichten deze week</h3>
        <div class="insight-list">
          <article class="insight-item">
            <div class="insight-icon insight-icon--pink">▢</div>
            <div>
              <div class="insight-title">Eigen input gebruikt</div>
              <div class="insight-copy">0% van de gebruikers gaf een eigen antwoord.</div>
            </div>
          </article>

          <article class="insight-item">
            <div class="insight-icon insight-icon--gold">⌂</div>
            <div>
              <div class="insight-title">Populairste scenario</div>
              <div class="insight-copy">'Situatie op een feestje' werd het vaakst doorlopen.</div>
            </div>
          </article>
        </div>
        <div class="insight-footer">Laatst bijgewerkt: 31/05/2026, 17:20</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import sessionsService from '../services/sessionsService'
import analyticsService from '../services/analyticsService'
import scenariosService from '../services/scenariosService'

const router = useRouter()

const recentSessions = ref<any[]>([])
const metrics = ref({ total: 0, completed: 0, averageDuration: '—', dropout: 0, offline: 0, thisWeek: 0 })
const activeScenarioCount = ref(0)

const popularScenarios = computed(() => {
  const counts = recentSessions.value.reduce<Record<string, number>>((accumulator, session) => {
    accumulator[session.scenario] = (accumulator[session.scenario] || 0) + 1
    return accumulator
  }, {})

  return Object.entries(counts)
    .map(([title, count]) => ({ title, count, width: `${Math.min(100, count * 18)}%` }))
    .sort((left, right) => right.count - left.count)
})

onMounted(async () => {
  const [sessions, snapshot, scenarios] = await Promise.all([
    sessionsService.listSessions(),
    analyticsService.getSnapshot('week'),
    scenariosService.listScenarios()
  ])

  recentSessions.value = sessions.slice(0, 4).map((session: any) => ({
    id: session.id,
    date: session.date,
    scenario: session.scenario,
    status: session.status,
    duration: session.duration_seconds ? `${Math.round(session.duration_seconds / 60)} min` : '—'
  }))

  metrics.value = snapshot
  activeScenarioCount.value = (scenarios || []).filter((scenario: any) => scenario.status === 'published').length
})

function goToScenarioCreate() {
  router.push('/scenarios/new')
}

function goToScenarios() {
  router.push('/scenarios')
}
</script>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 16px;
}

.dashboard-hero-grid {
  align-items: stretch;
}

.metric-card {
  padding: 16px 18px 18px;
}

.metric-label {
  font-size: 0.95rem;
  color: var(--color-text, #454147);
  margin-bottom: 8px;
}

.metric-value {
  font-size: clamp(2rem, 2.25vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #0f4f66;
}

.dashboard-secondary-grid {
  margin-top: 2px;
}

.dashboard-panel {
  padding: 18px 18px 16px;
}

.dashboard-side-stack {
  display: grid;
  gap: 16px;
}

.dashboard-panel--sessions {
  min-height: 320px;
}

.recent-table {
  margin-top: 4px;
}

.recent-table .strong {
  color: var(--color-text-strong, #1e1e1e);
  font-weight: 600;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.88rem;
  color: #2ea24e;
}

.status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #2ea24e;
}

.all-link {
  display: inline-flex;
  align-items: center;
  margin-top: 12px;
  color: var(--color-text, #454147);
  font-weight: 500;
}

.popular-list {
  display: grid;
  gap: 14px;
}

.popular-item {
  display: grid;
  gap: 8px;
}

.popular-item__head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.popular-item__title {
  color: var(--color-text-strong, #1e1e1e);
}

.popular-item__count {
  color: var(--color-text, #454147);
}

.popular-bar {
  height: 8px;
  border-radius: 999px;
  background: #e9e5e2;
  overflow: hidden;
}

.popular-bar__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #11485f;
}

.quick-actions {
  display: grid;
  gap: 12px;
}

.quick-actions__primary,
.quick-actions__secondary {
  width: 100%;
  min-height: 44px;
  border-radius: 12px;
  border: none;
  font-weight: 700;
}

.quick-actions__primary {
  background: linear-gradient(90deg, var(--purple-600), var(--purple-500));
  color: white;
}

.quick-actions__secondary {
  background: #0d5462;
  color: white;
}

.insight-list {
  display: grid;
  gap: 18px;
  margin-top: 4px;
  border-top: 1px solid rgba(2, 40, 55, 0.08);
  padding-top: 12px;
}

.insight-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.insight-icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 0.95rem;
  flex: 0 0 auto;
}

.insight-icon--pink {
  background: rgba(176, 16, 130, 0.12);
  color: #b01082;
}

.insight-icon--gold {
  background: rgba(220, 177, 44, 0.16);
  color: #c69c0c;
}

.insight-title {
  font-weight: 700;
  color: var(--color-text-strong, #1e1e1e);
}

.insight-copy {
  color: var(--color-text, #454147);
  margin-top: 2px;
}

.insight-footer {
  margin-top: 10px;
  color: var(--color-text, #454147);
  font-size: 0.88rem;
}

@media (max-width: 1023px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px){
  .kpis{grid-template-columns:1fr}
  .dashboard-grid{grid-template-columns:1fr}
}
</style>
