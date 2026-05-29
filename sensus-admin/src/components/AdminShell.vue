<template>
  <div class="app-shell">
    <aside class="sidebar">
      <h3>Sensus Admin</h3>
      <nav>
        <ul>
          <li><router-link to="/">Dashboard</router-link></li>
          <li><router-link to="/scenarios">Scenarios</router-link></li>
          <li><router-link to="/scenarios/new">Nieuw scenario</router-link></li>
          <li><router-link to="/users">Gebruikers</router-link></li>
          <li><router-link to="/analytics">Analytics</router-link></li>
          <li><router-link to="/settings">Instellingen</router-link></li>
        </ul>
      </nav>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
