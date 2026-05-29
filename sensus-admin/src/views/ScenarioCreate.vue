<template>
  <div>
    <h1>Nieuw scenario</h1>
    <div class="card" style="margin-top:12px;max-width:720px">
      <FormField v-model="title" label="Titel" placeholder="Titel scenario" />
      <FormField v-model="description" label="Beschrijving" placeholder="Beschrijving" type="textarea" />
      <div style="margin-top:12px;text-align:right">
        <AppButton label="Opslaan" @click="create" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '../components/FormField.vue'
import AppButton from '../components/AppButton.vue'
import mockService from '../services/mockService.ts'

const title = ref('')
const description = ref('')
const router = useRouter()

function create(){
  const s = mockService.createScenario({ title: title.value || 'Nieuw scenario', description: description.value || '' })
  router.push(`/scenarios/${s.id}`)
}
</script>
