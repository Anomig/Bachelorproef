<template>
  <div>
    <h1>Preview: {{ scenario.title }}</h1>
    <div class="card" style="margin-top:12px;max-width:900px">
      <div style="padding:12px">{{ scenario.description }}</div>
      <div style="margin-top:12px">
        <AppButton>Open walkthrough</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import scenarios from '../mock/mockScenarios.ts'

import AppButton from '../components/AppButton.vue'

const route = useRoute()
const id = route.params.id
const scenario = ref({ id: '', title: 'Laden...', description: '' })

onMounted(()=>{
  const found = scenarios.find((s:any)=>String(s.id) === String(id))
  if(found) scenario.value = found
})
</script>
