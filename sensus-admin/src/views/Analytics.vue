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
        <div class="value">689</div>
      </div>
      <div class="card">
        <div class="label">Voltooid</div>
        <div class="value">70%</div>
      </div>
      <div class="card">
        <div class="label">Gem. sessieduur</div>
        <div class="value">11 min</div>
      </div>
      <div class="card">
        <div class="label">Afhaak %</div>
        <div class="value">32%</div>
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
        <div class="card small">Sessies deze week<br/><strong>23</strong></div>
        <div class="card small">Voltooid<br/><strong>95.7%</strong></div>
        <div class="card small">Gem. sessieduur<br/><strong>4 min</strong></div>
        <div class="card small">Afhaak %<br/><strong>-50%</strong></div>
      </div>

      <div style="margin-top:18px">
        <h3>Reflectieresultaten</h3>
        <table style="width:100%;border-collapse:collapse;margin-top:8px">
          <thead>
            <tr><th>Gebruiker/id</th><th>Datum</th><th>Leeftijd</th><th>Gender</th><th>Reflectie</th></tr>
          </thead>
          <tbody>
            <tr><td>r85n5Te8gG</td><td>17 dec 2025</td><td>17</td><td>V</td><td>Ik vind het soms lastig om signalen van een ander te herkennen.</td></tr>
            <tr><td>Ye8Pr5f92Ne</td><td>17 dec 2025</td><td>17</td><td>M</td><td>Ik ben heel open, en merk dat mensen daardoor soms foute aannemen hebben.</td></tr>
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
import ChartPie from '../components/ChartPie.vue'
</script>

<style scoped>
.label{color:var(--color-text);font-size:14px}
.value{font-size:26px;color:var(--color-text-strong);font-weight:700;margin-top:6px;letter-spacing:-0.02em}
.small{padding:12px}
</style>

