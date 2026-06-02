<template>
  <div>
    <h1>{{ user.display_name }}</h1>
    <div style="color:var(--muted)">{{ user.user_id }}</div>
    <div class="card" style="margin-top:12px;max-width:720px;display:flex;justify-content:space-between;align-items:center">
      <div>Rol: <strong>{{ user.role }}</strong></div>
      <div>Aangemaakt: <strong>{{ user.created_at }}</strong></div>
      <AppButton variant="ghost">Wijzig rol</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import profilesService from '../services/profilesService'
import AppButton from '../components/AppButton.vue'

const route = useRoute()
const id = route.params.id
const user = ref<any>({ id: '', user_id: '', display_name: 'Niet gevonden', role: '', created_at: '' })

onMounted(async()=>{
  const found = await profilesService.getProfile(id as any)
  if(found) user.value = found
})
</script>
