<template>
  <div class="kpi-card">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
    <div v-if="meta" class="meta">{{ meta }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({ label: String, value: [String, Number], meta: String })
</script>

<style scoped>
.kpi-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:12px;padding:18px;text-align:left}
.kpi-card .label{font-size:14px;color:var(--color-text)}
.kpi-card .value{font-size:28px;color:var(--color-text-strong);font-weight:700;margin-top:6px}
.kpi-card .meta{font-size:12px;color:var(--color-text);margin-top:8px}
</style>
