<template>
  <div class="field">
    <label>{{ label }}</label>
    <input v-if="type !== 'textarea'" :type="type" :placeholder="placeholder" v-model="model" />
    <textarea v-else v-model="model" :placeholder="placeholder"></textarea>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'
const props = defineProps({ label: String, modelValue: String, placeholder: String, type: { type: String, default: 'text' } })
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue ?? '')
watch(()=>props.modelValue, (v)=> model.value = v)
watch(model, (v)=> emit('update:modelValue', v))
</script>
