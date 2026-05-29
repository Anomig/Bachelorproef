<template>
  <div class="chart-pie">
    <!-- Simple static SVG pie placeholder with three segments -->
    <svg viewBox="0 0 32 32" width="100%" height="220">
      <circle r="16" cx="16" cy="16" fill="#e9ecec" />
      <path d="M16 16 L32 16 A16 16 0 0 1 5.88 25.12 z" fill="#123b46" />
      <path d="M16 16 L5.88 25.12 A16 16 0 0 1 22 6 z" fill="#8b0f7a" />
      <path d="M16 16 L22 6 A16 16 0 0 1 32 16 z" fill="#dcdcdc" />
    </svg>
    <div class="legend">
      <div><span class="dot" style="background:#123b46"></span> Pad A</div>
      <div><span class="dot" style="background:#8b0f7a"></span> Pad B</div>
      <div><span class="dot" style="background:#dcdcdc"></span> Gestopt</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Static SVG placeholder — no external libs required
</script>

<style scoped>
.chart-pie{display:flex;flex-direction:column;gap:8px}
.legend{display:flex;gap:12px;justify-content:flex-start}
.dot{width:12px;height:12px;border-radius:6px;display:inline-block;margin-right:6px}
</style>
