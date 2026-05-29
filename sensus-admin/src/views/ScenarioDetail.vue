<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h1 class="page-title">{{ scenario.title }}</h1>
        <div style="margin-top:6px">
          <span :class="['badge', scenario.status === 'published' ? 'published' : 'draft']">{{ scenario.status }}</span>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <router-link :to="`/scenarios/${scenario.id}/edit`"><button class="btn btn-ghost">Bewerken</button></router-link>
        <router-link :to="`/scenarios/${scenario.id}/preview`"><button class="btn btn-primary">Voorbeeld</button></router-link>
        <button class="btn btn-ghost" @click="togglePublish">Toggle publish</button>
      </div>
    </div>
    <div style="margin-top:12px" class="card">{{ scenario.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import mockService from '../services/mockService'

import { useRouter } from 'vue-router'
const router = useRouter()

const route = useRoute()
const id = route.params.id
const scenario = ref({ id: '', title: 'Niet gevonden', description: '', status: 'unknown' })

onMounted(()=>{
  const found = mockService.findScenario(id as any)
  if(found) scenario.value = found
})

function togglePublish(){
  mockService.togglePublish(id as any)
  const found = mockService.findScenario(id as any)
  if(found) scenario.value = found
}
</script>
