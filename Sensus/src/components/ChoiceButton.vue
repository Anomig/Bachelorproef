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
  justify-content: space-between;
  box-sizing: border-box;
  padding: var(--space-18) var(--space-20);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text-strong);
  font-weight: var(--fw-medium);
  font-size: var(--fs-base);
  text-align: left;
  cursor: pointer;
  transition: transform 0.18s ease, background-color 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.choice-button:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--purple-50);
  border-color: var(--purple-300);
  box-shadow: 0 6px 18px rgba(165, 10, 126, 0.08);
}

.choice-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>