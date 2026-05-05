<script setup>
// Keuze-knop voor scenario-opties; emit enkel een click-event naar de parent.
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
  padding: var(--space-16) var(--space-20);
  border: none;
  border-radius: 12px;
  background: #f8f4f2;
  color: var(--color-text-strong);
  font-weight: var(--fw-medium);
  font-size: var(--fs-base);
  text-align: left;
  cursor: pointer;
  transition: transform 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
}

.choice-button:hover:not(:disabled) {
  transform: translateY(-1px);
  background: #f4efec;
  box-shadow: 0 3px 8px rgba(2, 40, 55, 0.08);
}

.choice-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>