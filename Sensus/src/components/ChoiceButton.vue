<script setup>
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  option: {
    type: Object,
    default: null
  },
  disabled: Boolean
})

const emit = defineEmits(['choose', 'submit-input'])

const editing = ref(false)
const freeText = ref('')
const inputRef = ref(null)

const isFreeText = computed(() => props.option?.inputMode === 'freeText')
const buttonLabel = computed(() => props.label || props.option?.label || '')

function onPrimaryClick() {
  if (props.disabled) return

  if (isFreeText.value) {
    editing.value = true
    nextTick(() => inputRef.value?.focus())
    return
  }

  emit('choose')
}

function submitInput() {
  const value = String(freeText.value || '').trim()
  if (!value) return

  emit('submit-input', {
    option: props.option,
    value
  })

  freeText.value = ''
  editing.value = false
}

function cancelInput() {
  freeText.value = ''
  editing.value = false
}
</script>

<template>
  <div class="choice-control">
    <button
      v-if="!editing"
      class="choice-button"
      :disabled="disabled"
      type="button"
      @click="onPrimaryClick"
    >
      {{ buttonLabel }}
    </button>

    <div v-else class="choice-input" role="group" aria-label="Eigen invoer">
      <input
        ref="inputRef"
        v-model="freeText"
        class="choice-input__field"
        type="text"
        :placeholder="option?.placeholder || 'Typ je antwoord...'"
        @keydown.enter.prevent="submitInput"
        @keydown.esc.prevent="cancelInput"
      />
      <button class="choice-input__submit" type="button" @click="submitInput">
        {{ option?.submitLabel || 'Verstuur' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.choice-control {
  width: 100%;
}

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

.choice-input {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-8);
  align-items: center;
  padding: var(--space-8);
  border-radius: 12px;
  background: #f8f4f2;
  border: 1px solid #e2ddd9;
}

.choice-input__field {
  width: 100%;
  min-height: 42px;
  border: none;
  background: transparent;
  color: var(--color-text-strong);
  font: inherit;
  font-size: var(--fs-base);
  padding: 0 var(--space-8);
}

.choice-input__field:focus {
  outline: none;
}

.choice-input__submit {
  min-height: 42px;
  border: none;
  border-radius: 10px;
  padding: 0 var(--space-12);
  background: var(--blue-700);
  color: var(--neutral-100);
  font: inherit;
  font-weight: var(--fw-semibold);
  cursor: pointer;
}
</style>