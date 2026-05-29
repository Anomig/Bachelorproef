<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h1>Gebruikers</h1>
      <router-link to="/users/new"><button class="btn-primary">+ Nieuwe gebruiker</button></router-link>
    </div>

    <div class="card" style="margin-top:12px">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr><th>Naam</th><th>E-mail</th><th>Rol</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u.id">
            <td><router-link :to="`/users/${u.id}`">{{ u.name }}</router-link></td>
            <td>{{ u.email }}</td>
            <td>{{ u.role || 'Admin' }}</td>
            <td style="text-align:right"><router-link :to="`/users/${u.id}`"><button class="btn-secondary">Open</button></router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import users from '../mock/mockUsers'
</script>

<style scoped>
table thead th{font-weight:600;text-align:left;padding:12px;border-bottom:1px solid var(--color-border)}
table tbody td{padding:12px 0;border-bottom:1px dashed var(--color-border)}
</style>
