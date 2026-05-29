<template>
  <div>
    <h1>{{ user.name }}</h1>
    <div style="color:var(--muted)">{{ user.email }}</div>
    <div class="card" style="margin-top:12px;max-width:720px;display:flex;justify-content:space-between;align-items:center">
      <div>Rol: <strong>{{ user.role }}</strong></div>
      <AppButton variant="ghost">Wijzig rol</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import users from '../mock/mockUsers.ts'
import AppButton from '../components/AppButton.vue'

const route = useRoute()
const id = route.params.id
const user = ref({ id: '', name: 'Niet gevonden', email: '', role: '' })

onMounted(()=>{
  const found = users.find((u:any)=>String(u.id) === String(id))
  if(found) user.value = found
})
</script>
