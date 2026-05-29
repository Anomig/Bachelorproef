<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({ columns: { type: Array, default: ()=>[] } })
</script>

<style scoped>
.data-table table{width:100%;border-collapse:collapse}
.data-table thead th{font-weight:600;text-align:left;padding:12px;border-bottom:1px solid var(--color-border)}
.data-table tbody td{padding:12px 0;border-bottom:1px dashed var(--color-border)}
</style>
