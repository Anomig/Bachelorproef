<template>
  <button :class="['btn', variantClass]" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const props = defineProps({ label: String, variant: { type: String, default: 'primary' } })
const variantClass = computed(()=> props.variant === 'primary' ? 'btn-primary' : 'btn-ghost')
</script>
