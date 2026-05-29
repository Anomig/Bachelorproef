<template>
  <span :class="['status-badge', statusClass]">{{ label }}</span>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
const props = defineProps({ label: String, status: { type: String, default: 'info' } })
const statusClass = computed(()=> `status-${props.status}`)
</script>

<style scoped>
.status-badge{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;font-size:13px}
.status-done{color:var(--color-success);background:var(--success-100)}
.status-stopped{color:var(--color-error);background:var(--error-100)}
.status-info{color:var(--color-info);background:var(--info-100)}
</style>
