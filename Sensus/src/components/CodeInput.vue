<script setup>
// 4-vaks code-input met numerieke validatie, auto-focus en paste-ondersteuning.
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputs = ref(['', '', '', ''])
const inputRefs = ref([])

const codeValue = () => inputs.value.join('')

watch(
  () => codeValue(),
  (newValue) => {
    emit('update:modelValue', newValue)
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== codeValue()) {
      inputs.value = newValue.split('').slice(0, 4).concat(['', '', '', '']).slice(0, 4)
    }
  }
)

function handleInput(index, event) {
  const value = event.target.value
  
  // Alleen cijfers toestaan
  if (!/^\d?$/.test(value)) {
    event.target.value = inputs.value[index]
    return
  }

  inputs.value[index] = value

  // Auto-focus naar volgende vakje
  if (value && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handleKeydown(index, event) {
  // Backspace: ga naar vorige vakje
  if (event.key === 'Backspace' && !inputs.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }

  // Delete: wis huidge vakje
  if (event.key === 'Delete') {
    inputs.value[index] = ''
  }

  // Arrow keys: navigeer tussen vakjes
  if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
  if (event.key === 'ArrowRight' && index < 3) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event) {
  event.preventDefault()
  const pastedData = event.clipboardData.getData('text')
  const digits = pastedData.replace(/\D/g, '').slice(0, 4)
  
  digits.split('').forEach((digit, index) => {
    inputs.value[index] = digit
  })
}
</script>

<template>
  <div class="code-input-wrapper">
    <div
      v-for="(_, index) in 4"
      :key="index"
      class="code-input-group"
    >
      <input
        :ref="el => inputRefs[index] = el"
        :value="inputs[index]"
        type="password"
        inputmode="numeric"
        maxlength="1"
        class="code-input"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste"
      />
    </div>
  </div>
</template>

<style scoped>
.code-input-wrapper {
  display: flex;
  gap: var(--space-12);
  justify-content: center;
  margin: var(--space-16) 0;
}

.code-input-group {
  position: relative;
}

.code-input {
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: var(--fs-xl);
  font-weight: var(--fw-semibold);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text-strong);
  transition: all 0.2s ease;
  padding: 0;
}

.code-input:hover {
  border-color: var(--color-primary);
}

.code-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(165, 10, 126, 0.15);
}

.code-input::placeholder {
  color: var(--neutral-400);
}
</style>
