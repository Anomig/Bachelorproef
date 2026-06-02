<template>
  <div>
    <div class="page-header">
      <h1>Gebruikers</h1>
    </div>

    <div class="card">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr><th>Naam</th><th>User ID</th><th>Rol</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td><router-link :to="`/users/${u.user_id}`">{{ u.display_name }}</router-link></td>
            <td>{{ u.user_id }}</td>
            <td>{{ u.role || 'admin' }}</td>
            <td style="text-align:right"><router-link :to="`/users/${u.user_id}`"><button class="btn-secondary">Open</button></router-link></td>
          </tr>
          <tr v-if="!users.length">
            <td colspan="4">Nog geen profielen gevonden in Supabase.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import profilesService from '../services/profilesService'

const users = ref<any[]>([])

onMounted(async () => {
  users.value = await profilesService.listProfiles()
})
</script>

<style scoped>
table thead th{font-weight:600;text-align:left;padding:12px;border-bottom:1px solid var(--color-border)}
table tbody td{padding:12px 0;border-bottom:1px dashed var(--color-border)}
</style>
