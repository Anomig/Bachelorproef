<template>
  <div class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <img :src="logoUrl" alt="Sensus" class="brand-logo" />
      </div>

      <nav class="sidebar-nav">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="nav-item">
          <img :src="item.icon" :alt="item.label" class="nav-icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/login" class="nav-item nav-item--logout">
          <img :src="logoutIcon" alt="Uitloggen" class="nav-icon" />
          <span>Uitloggen</span>
        </router-link>
      </div>
    </aside>

    <div class="workspace">
      <header class="topbar">
        <label class="topbar-search" aria-label="Zoeken">
          <span class="search-icon">⌕</span>
          <input type="search" placeholder="Zoeken" />
        </label>

        <div class="topbar-actions">
          <button class="topbar-icon-btn" type="button" aria-label="Meldingen">
            <img :src="bellIcon" alt="" />
          </button>
          <button class="topbar-icon-btn" type="button" aria-label="Hulp">
            <img :src="helpIcon" alt="" />
          </button>

          <div class="profile-chip">
            <div class="profile-avatar">PD</div>
            <div class="profile-meta">
              <div class="profile-name">Philip Davids</div>
              <div class="profile-role">Admin</div>
            </div>
            <span class="profile-caret">⌄</span>
          </div>
        </div>
      </header>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoUrl from '../assets/Favicon.png'
import bellIcon from '../assets/icons/fi-rr-bell.png'
import helpIcon from '../assets/icons/fi-rr-interrogation.png'
import dashboardIcon from '../assets/icons/fi-rr-dashboard.png'
import appsIcon from '../assets/icons/fi-rr-apps.png'
import clockIcon from '../assets/icons/fi-rr-clock.png'
import chartIcon from '../assets/icons/fi-rr-chart-histogram.png'
import settingsIcon from '../assets/icons/fi-rr-settings.png'
import logoutIcon from '../assets/icons/fi-rr-time-delete.png'

const navItems = [
  { to: '/', label: 'Dashboard', icon: dashboardIcon },
  { to: '/scenarios', label: "Scenario's", icon: appsIcon },
  { to: '/sessions', label: 'Sessies', icon: clockIcon },
  { to: '/analytics', label: 'Inzichten', icon: chartIcon },
  { to: '/settings', label: 'Instellingen', icon: settingsIcon }
]
</script>
