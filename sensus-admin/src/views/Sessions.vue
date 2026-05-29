<template>
  <div>
    <div class="page-header">
      <h1>Sessies</h1>
      <router-link to="/sessions/new"><button class="btn-primary">+ Nieuwe sessie</button></router-link>
    </div>

    <div class="page-subnav tabs">
      <button class="tab active">Alle sessies</button>
      <button class="tab">Actief (6)</button>
      <button class="tab">Voltooid (2)</button>
    </div>

    <div class="card">
      <div class="toolbar" style="margin-bottom:12px">
        <input class="search-input" v-model="query" placeholder="Zoeken" />
        <select class="select" v-model="filterScenario"><option>Scenario</option></select>
        <select class="select" v-model="filterStatus"><option>Status</option></select>
      </div>

      <DataTable :columns="cols">
        <tr v-for="s in sessions" :key="s.id">
          <td><input type="checkbox" /></td>
          <td>{{ s.name }}</td>
          <td>{{ s.scenario }}</td>
          <td>{{ s.date }}</td>
          <td>{{ s.start }}</td>
          <td>{{ s.end }}</td>
          <td style="text-align:right">{{ s.status === 'done' ? '✅' : s.status === 'stopped' ? '⛔' : '●' }}</td>
        </tr>
      </DataTable>
    </div>

    <div style="margin-top:18px" class="metrics-grid-4">
      <KpiCard label="Sessies deze week" :value="metrics.thisWeek" meta="↑ 12% deze week" />
      <KpiCard label="Voltooid" :value="`${metrics.completed}%`" />
      <KpiCard label="Gem. sessieduur" :value="metrics.averageDuration" />
      <KpiCard label="Afhaak %" :value="`${metrics.dropout}%`" meta="↑ 37% t.o.v. vorige week" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '../components/DataTable.vue'
import KpiCard from '../components/KpiCard.vue'
import sessionsService from '../services/sessionsService'

const cols = [
  { key: 'c1', label: '' },
  { key: 'c2', label: 'Naam/id' },
  { key: 'c3', label: 'Scenario' },
  { key: 'c4', label: 'Datum' },
  { key: 'c5', label: 'Start' },
  { key: 'c6', label: 'Einde' },
  { key: 'c7', label: '' }
]

const sessions = ref<any[]>([])
const metrics = ref({ thisWeek: 128, completed: 70, averageDuration: '11 min', dropout: 32 })

onMounted(async ()=>{
  sessions.value = await sessionsService.listSessions()
  metrics.value = await sessionsService.getMetrics()
})

const query = ref('')
const filterScenario = ref('')
const filterStatus = ref('')
</script>

<style scoped>
.search-input{flex:1;padding:10px;border-radius:12px;border:1px solid var(--color-border);background:var(--color-surface-soft)}
.select{padding:10px;border-radius:12px;border:1px solid var(--color-border);background:var(--color-surface)}
</style>
