<template>
  <div class="field">
    <label class="field__label">{{ label }}</label>
    <input v-if="type !== 'textarea'" class="field__control" :type="type" :placeholder="placeholder" v-model="model" />
    <textarea v-else class="field__control field__control--textarea" v-model="model" :placeholder="placeholder"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps({ label: String, modelValue: String, placeholder: String, type: { type: String, default: 'text' } })
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue ?? '')
watch(() => props.modelValue, (v) => {
  model.value = v ?? ''
})
watch(model, (v)=> emit('update:modelValue', v))
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field__label {
  font-size: var(--fs-sm, 0.875rem);
  font-weight: var(--fw-medium, 500);
  color: var(--color-text, #454147);
}

.field__control {
  width: 100%;
  min-height: 44px;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-border, #E8E5E3);
  border-radius: var(--radius-md, 0.75rem);
  background: var(--color-surface, #fff);
  color: var(--color-text-strong, #1E1E1E);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.field__control::placeholder {
  color: rgba(69, 65, 71, 0.55);
}

.field__control:focus {
  border-color: rgba(165, 10, 126, 0.55);
  box-shadow: 0 0 0 4px rgba(165, 10, 126, 0.08);
}

.field__control--textarea {
  min-height: 96px;
  resize: vertical;
}
</style>
