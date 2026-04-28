<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: Boolean
})

const buttonClass = computed(() =>
  props.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
)
</script>

<template>
  <button :type="type" :class="buttonClass" :disabled="disabled">
    <slot />
  </button>
</template>