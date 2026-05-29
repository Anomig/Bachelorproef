<template>
  <div class="scenarios-page">
    <div class="page-header" style="display:flex;justify-content:space-between;align-items:center">
      <h1>Scenario's</h1>
      <router-link to="/scenarios/new"><button class="btn-primary">+ Nieuw scenario</button></router-link>
    </div>

    <div class="tabs" style="margin-top:12px;display:flex;gap:18px;align-items:center">
      <button class="tab active">Alle scenario's</button>
      <button class="tab">Actief (6)</button>
      <button class="tab">Concepten (2)</button>
    </div>

    <div class="card" style="margin-top:16px">
      <div class="filters" style="display:flex;gap:12px;margin-bottom:12px;align-items:center">
        <input v-model="query" placeholder="Zoeken" class="search-input" />
        <select v-model="theme" class="select">
          <option>Alle thema's</option>
        </select>
        <select v-model="status" class="select">
          <option>Alle statussen</option>
          <option>published</option>
          <option>draft</option>
        </select>
      </div>

      <table class="list-table" style="width:100%;border-collapse:collapse">
        <thead>
          <tr>
            <th style="width:40px"><input type="checkbox"/></th>
            <th>Naam</th>
            <th>Thema</th>
            <th>Datum</th>
            <th>Sessies</th>
            <th style="width:120px">Status</th>
            <th style="width:40px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in filtered" :key="s.id">
            <td><input type="checkbox"/></td>
            <td>{{ s.title }}</td>
            <td>Online gedrag</td>
            <td>17 dec 2025</td>
            <td>26</td>
            <td><label class="switch"><input type="checkbox" :checked="s.status==='published'" /><span class="slider"></span></label></td>
            <td>⋯</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import mockService from '../services/mockService.ts'

const scenariosList = ref(mockService.listScenarios())
const query = ref('')
const status = ref('Alle statussen')
const theme = ref('Alle thema\'s')

const filtered = computed(()=>{
  const q = query.value.trim().toLowerCase()
  return scenariosList.value.filter((s:any)=>{
    const matchesQ = !q || s.title.toLowerCase().includes(q)
    const matchesStatus = status.value === 'Alle statussen' || s.status === status.value
    return matchesQ && matchesStatus
  })
})
</script>

<style scoped>
.search-input{flex:1;padding:10px;border-radius:12px;border:1px solid var(--color-border);background:var(--color-surface)}
.select{padding:10px;border-radius:12px;border:1px solid var(--color-border);background:var(--color-surface)}
.list-table thead th{font-weight:600;text-align:left;padding:12px;border-bottom:1px solid var(--color-border);color:var(--color-text)}
.list-table tbody td{padding:12px 0;border-bottom:1px dashed var(--color-border);color:var(--color-text)}
.tab{background:transparent;border:none;padding:8px 12px;border-radius:8px;color:var(--color-text);cursor:pointer}
.tab.active{background:var(--purple-100);color:var(--color-text-strong)}
.switch{position:relative;display:inline-block;width:44px;height:24px}
.switch input{opacity:0;width:0;height:0}
.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#ccc;border-radius:24px}
.slider:before{position:absolute;content:'';height:18px;width:18px;left:3px;top:3px;background:white;border-radius:50%;transition:0.2s}
.switch input:checked + .slider{background:var(--blue-600)}
.switch input:checked + .slider:before{transform:translateX(20px)}
</style>
