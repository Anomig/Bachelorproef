<template>
  <div class="scenario-card">
    <div>
        <div style="font-weight:700;font-size:18px">{{ scenario.title }}</div>
        <div class="scenario-meta">Status: {{ scenario.status }}</div>
      </div>
    <div>
      <router-link :to="`/scenarios/${scenario.id}`">Bekijk</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({ scenario: Object })
</script>
