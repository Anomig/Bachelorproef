<template>
  <div>
    <div class="page-header">
      <h1>Inzichten</h1>
      <div>
        <button class="btn-primary">Export</button>
      </div>
    </div>

    <div class="page-subnav tabs">
      <button class="tab active">Alle sessies</button>
      <button class="tab">Deze week</button>
      <button class="tab">Vandaag</button>
    </div>

    <div class="metrics-grid-4">
      <div class="card"> 
        <div class="label">Sessies</div>
        <div class="value">{{ snapshot.sessions }}</div>
      </div>
      <div class="card">
        <div class="label">Voltooid</div>
        <div class="value">{{ snapshot.completed }}%</div>
      </div>
      <div class="card">
        <div class="label">Gem. sessieduur</div>
        <div class="value">{{ snapshot.averageDuration }}</div>
      </div>
      <div class="card">
        <div class="label">Afhaak %</div>
        <div class="value">{{ snapshot.dropout }}%</div>
      </div>
    </div>

    <div class="card" style="margin-top:18px">
      <div class="toolbar">
        <label style="min-width:80px">Scenario:</label>
        <select class="select" style="flex:1">
          <option>Online gesprek loopt vast</option>
        </select>
      </div>

      <div style="margin-top:18px;display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        <div class="card small">Sessies deze week<br/><strong>{{ snapshot.thisWeek }}</strong></div>
        <div class="card small">Voltooid<br/><strong>{{ snapshot.completed }}%</strong></div>
        <div class="card small">Gem. sessieduur<br/><strong>{{ snapshot.averageDuration }}</strong></div>
        <div class="card small">Afhaak %<br/><strong>{{ snapshot.dropout }}%</strong></div>
      </div>

      <div style="margin-top:18px">
        <h3>Reflectieresultaten</h3>
        <table style="width:100%;border-collapse:collapse;margin-top:8px">
          <thead>
            <tr><th>Gebruiker/id</th><th>Datum</th><th>Leeftijd</th><th>Gender</th><th>Reflectie</th></tr>
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
    </div>

    <div class="metrics-grid-3" style="margin-top:18px">
      <div class="card"><ChartPie /></div>
      <div class="card"><ChartPie /></div>
      <div class="card"><ChartPie /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ChartPie from '../components/ChartPie.vue'
import analyticsService from '../services/analyticsService'

const snapshot = ref({ sessions: 689, completed: 70, averageDuration: '11 min', dropout: 32, offline: 30, thisWeek: 128 })
const reflections = ref<any[]>([])

onMounted(async ()=>{
  snapshot.value = await analyticsService.getSnapshot('all')
  reflections.value = await analyticsService.listReflections()
})
</script>

<style scoped>
.label{color:var(--color-text);font-size:14px}
.value{font-size:26px;color:var(--color-text-strong);font-weight:700;margin-top:6px;letter-spacing:-0.02em}
.small{padding:12px}
</style>

