<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  disabled: Boolean
})

defineEmits(['click'])
</script>

<template>
  <button
    class="choice-button"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.choice-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: var(--space-16);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text-strong);
  font-weight: var(--fw-medium);
  text-align: left;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.choice-button:hover:not(:disabled) {
  transform: translateY(-1px);
  background: var(--purple-100);
  border-color: var(--purple-300);
}

.choice-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>