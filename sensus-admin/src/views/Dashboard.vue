<template>
  <div class="dashboard">
    <div class="top-row">
      <div class="search">
        <input placeholder="Zoeken" />
      </div>
      <div class="user">Philip Davids<br/><small>Admin</small></div>
    </div>

    <div class="kpis">
      <div class="kpi">
        <div class="label">Sessies deze week</div>
        <div class="value">128</div>
        <div class="meta green">↑ 12% deze week</div>
      </div>
      <div class="kpi">
        <div class="label">Actieve scenario's</div>
        <div class="value">6</div>
      </div>
      <div class="kpi">
        <div class="label">Gem. sessieduur</div>
        <div class="value">11 min</div>
      </div>
      <div class="kpi">
        <div class="label">Afgeronde sessies</div>
        <div class="value">82%</div>
        <div class="meta green">↑ 37% t.o.v. vorige week</div>
      </div>
    </div>

    <div class="main-grid">
      <section class="recent card">
        <h3>Recente sessies</h3>
        <table class="recent-table">
          <thead>
            <tr><th>Datum</th><th>Scenario</th><th>Status</th><th>Duur</th></tr>
          </thead>
          <tbody>
            <tr v-for="s in sessions" :key="s.id">
              <td>{{ s.date }}</td>
              <td class="strong">{{ s.scenario }}</td>
              <td>
                <span :class="['status', s.status==='Voltooid' ? 'done' : s.status==='Gestopt' ? 'stopped' : '']">{{ s.status }}</span>
              </td>
              <td>{{ s.duration }}</td>
            </tr>
          </tbody>
        </table>
        <div class="all-link">Bekijk alles sessies ›</div>
      </section>

      <aside class="right-col">
        <div class="card popular">
          <h3>Populaire scenario's</h3>
          <ul class="popular-list">
            <li v-for="p in popular" :key="p.title">
              <div class="row">
                <div class="title">{{ p.title }}</div>
                <div class="count">{{ p.count }}</div>
              </div>
              <div class="bar"><div class="bar-fill" :style="{width: p.percent + '%'}"></div></div>
            </li>
          </ul>
        </div>

        <div class="card actions">
          <h3>Quick actions</h3>
          <button class="btn primary">+ Nieuw scenario maken</button>
          <button class="btn secondary">Scenario beheren</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const sessions = ref([
  { id: 1, date: '17 dec 2025', scenario: 'Feest', status: 'Voltooid', duration: '12 min' },
  { id: 2, date: '17 dec 2025', scenario: 'Relatie', status: 'Gestopt', duration: '5 min' },
  { id: 3, date: '22 dec 2025', scenario: 'Online', status: 'Voltooid', duration: '11 min' },
  { id: 4, date: '7 jan 2025', scenario: 'Groepsdruk', status: 'Voltooid', duration: '13 min' }
])

const popular = ref([
  { title: 'Feest', count: 62, percent: 95 },
  { title: 'Relatie', count: 54, percent: 85 },
  { title: 'Online', count: 48, percent: 72 },
  { title: 'Groepsdruk', count: 35, percent: 55 },
  { title: 'Date', count: 20, percent: 32 }
])
</script>

<style scoped>
.dashboard{padding:20px}
.top-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.search input{width:420px;padding:10px 14px;border-radius:12px;border:1px solid var(--border);background:var(--code-bg)}
.user{font-size:14px;text-align:right;color:var(--text)}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:20px}
.kpi{background:var(--code-bg);padding:18px;border-radius:10px;text-align:left}
.kpi .label{color:var(--text);font-size:14px;margin-bottom:6px}
.kpi .value{font-size:28px;color:var(--text-h);font-weight:600}
.kpi .meta{font-size:12px;color:var(--text);margin-top:8px}
.green{color:#2ea24e}
.main-grid{display:grid;grid-template-columns:1fr 320px;gap:16px}
.card{background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:18px;box-shadow:var(--shadow)}
.recent-table{width:100%;border-collapse:collapse;margin-top:8px}
.recent-table th{font-weight:600;text-align:left;color:var(--text);padding:12px 0;border-bottom:1px solid var(--border)}
.recent-table td{padding:12px 0;border-bottom:1px dashed var(--border);color:var(--text)}
.recent-table .strong{color:var(--text-h);font-weight:600}
.all-link{margin-top:12px;color:var(--accent);font-weight:600}
.popular-list{list-style:none;padding:0;margin:0}
.popular-list li{padding:10px 0;border-bottom:1px dashed var(--border)}
.popular-list .row{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.bar{height:10px;background:#f0f0f0;border-radius:8px;overflow:hidden}
.bar-fill{height:100%;background:#123b46}
.actions .btn{display:block;width:100%;padding:10px;border-radius:8px;border:none;margin-bottom:10px}
.btn.primary{background:#8b0f7a;color:#fff}
.btn.secondary{background:#0c5460;color:#fff}
.status{padding:4px 8px;border-radius:12px;font-size:13px}
.status.done{color:#1b7a3a}
.status.stopped{color:#c83b3b}

@media (max-width: 900px){
  .kpis{grid-template-columns:repeat(2,1fr)}
  .main-grid{grid-template-columns:1fr}
}
</style>
