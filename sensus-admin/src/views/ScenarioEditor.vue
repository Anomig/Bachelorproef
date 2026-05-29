<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h1>Scenario beheren</h1>
      <div style="display:flex;gap:12px">
        <AppButton label="Opslaan" />
        <button class="btn-secondary">Publiceren</button>
        <button class="btn-primary">Annuleer</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:16px;margin-top:16px">
      <div class="card">
        <h3>Scenario flow</h3>
        <FormField label="Titel" v-model="scenario.title" />
        <FormField label="Tekst" v-model="scenario.description" type="textarea" />
      </div>

      <aside class="card">
        <h3>Live preview</h3>
        <div style="margin-top:12px">
          <h4>{{ scenario.title }}</h4>
          <p style="color:var(--color-text);">{{ scenario.description }}</p>
          <div style="margin-top:16px">
            <button class="btn-primary">Start scenario</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import scenariosService from '../services/scenariosService'

import FormField from '../components/FormField.vue'
import AppButton from '../components/AppButton.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const scenario = ref({ id: '', title: 'Laden...', description: '' })

onMounted(async ()=>{
  const found = await scenariosService.findScenario(id as any)
  if(found) scenario.value = { ...found }
})

async function save(){
  await scenariosService.updateScenario(id as any, { title: scenario.value.title, description: scenario.value.description })
  router.push(`/scenarios/${id}`)
}
</script>
