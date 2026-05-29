<template>
  <div class="chart-bar">
    <!-- Static horizontal bars placeholder -->
    <div class="bar-row"><div class="label">Feest</div><div class="bar"><div class="fill" style="width:95%"></div></div><div class="num">62</div></div>
    <div class="bar-row"><div class="label">Relatie</div><div class="bar"><div class="fill" style="width:82%"></div></div><div class="num">54</div></div>
    <div class="bar-row"><div class="label">Online</div><div class="bar"><div class="fill" style="width:72%"></div></div><div class="num">48</div></div>
    <div class="bar-row"><div class="label">Groepsdruk</div><div class="bar"><div class="fill" style="width:55%"></div></div><div class="num">35</div></div>
    <div class="bar-row"><div class="label">Date</div><div class="bar"><div class="fill" style="width:30%"></div></div><div class="num">20</div></div>
  </div>
</template>

<script setup lang="ts">
// Static bar placeholder — no external libs required
</script>

<style scoped>
.bar-row{display:flex;align-items:center;gap:12px;padding:6px 0}
.bar-row .label{width:110px;color:var(--color-text)}
.bar{flex:1;background:#f0f0f0;border-radius:999px;height:12px;overflow:hidden}
.fill{height:100%;background:#123b46}
.num{width:36px;text-align:right;color:var(--color-text)}
</style>
