<template>
  <div :class="['card', sizeClass]">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({ size: { type: String, default: 'md' } })
const sizeClass = computed(() => (props.size === 'sm' ? 'card--small' : props.size === 'lg' ? 'card--large' : ''))
</script>

<style scoped>
.card--small{padding:12px}
.card--large{padding:32px}
</style>
