<template>
  <div class="app-shell">
    <div v-if="isSidebarOpen" class="sidebar-backdrop" @click="closeSidebar"></div>

    <aside class="sidebar" :class="{ 'sidebar--open': isSidebarOpen }">
      <div class="brand">
        <img :src="logoUrl" alt="Sensus" class="brand-logo" />
      </div>

      <nav class="sidebar-nav">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to" class="nav-item" @click="closeSidebar">
          <img :src="item.icon" :alt="item.label" class="nav-icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <router-link to="/login" class="nav-item nav-item--logout" @click="closeSidebar">
          <img :src="logoutIcon" alt="Uitloggen" class="nav-icon" />
          <span>Uitloggen</span>
        </router-link>
      </div>
    </aside>

    <div class="workspace">
      <header class="workspace-header">
        <div class="workspace-header__left">
          <button class="sidebar-toggle" type="button" :aria-expanded="isSidebarOpen" aria-label="Menu" @click="toggleSidebar">
            <span class="sidebar-toggle__line"></span>
            <span class="sidebar-toggle__line"></span>
            <span class="sidebar-toggle__line"></span>
          </button>

          <label class="topbar-search" aria-label="Zoeken">
            <span class="search-icon">⌕</span>
            <input type="search" placeholder="Zoeken" />
          </label>
        </div>

        <div class="topbar-actions">
          <button class="topbar-icon-btn" type="button" aria-label="Meldingen" :aria-pressed="isNotificationsOpen" @click="toggleNotifications">
            <img :src="bellIcon" alt="" />
            <span v-if="notificationCount > 0" class="topbar-badge">{{ notificationCount }}</span>
          </button>
          <button class="topbar-icon-btn" type="button" aria-label="Hulp" :aria-pressed="isHelpOpen" @click="toggleHelp">
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

      <section v-if="isNotificationsOpen" class="topbar-panel topbar-panel--notifications" aria-label="Meldingen">
        <div class="topbar-panel__header">
          <h2 class="topbar-panel__title">Meldingen <span class="topbar-panel__count">{{ notificationCount }}</span></h2>
          <button class="topbar-panel__action" type="button" @click="clearNotifications" :disabled="notifications.length === 0">Alles verwijderen</button>
        </div>

        <div v-if="notifications.length" class="notification-list">
          <article v-for="item in notifications" :key="item.id" class="notification-item">
            <div class="notification-item__content">
              <div class="notification-item__title">{{ item.title }}</div>
              <div class="notification-item__meta">{{ item.timestamp }}</div>
            </div>
            <button class="notification-item__close" type="button" :aria-label="`Verwijder ${item.title}`" @click="dismissNotification(item.id)">×</button>
          </article>
        </div>

        <p v-else class="topbar-panel__empty">Geen nieuwe meldingen.</p>

        <div class="topbar-panel__footer">
          <button class="btn-secondary topbar-panel__primary" type="button" @click="goToAnalytics">Alle meldingen bekijken</button>
          <button class="topbar-panel__link" type="button" @click="closePanels">Sluiten</button>
        </div>
      </section>

      <section v-if="isHelpOpen" class="topbar-panel topbar-panel--help" aria-label="Hulp en informatie">
        <div class="topbar-panel__header">
          <h2 class="topbar-panel__title">Hulp &amp; informatie</h2>
          <button class="topbar-panel__action" type="button" @click="closePanels">Sluiten</button>
        </div>

        <div class="help-accordion">
          <div class="help-accordion__item">
            <button class="help-accordion__trigger" type="button" :aria-expanded="helpSections.about" @click="toggleHelpSection('about')">
              <span>Over deze admin</span>
              <span class="help-accordion__icon">⌄</span>
            </button>
            <div v-if="helpSections.about" class="help-accordion__body">
              Deze omgeving is bedoeld om scenario's, sessies en inzichten te beheren binnen de Sensus-demo.
            </div>
          </div>

          <div class="help-accordion__item">
            <button class="help-accordion__trigger" type="button" :aria-expanded="helpSections.dashboard" @click="toggleHelpSection('dashboard')">
              <span>Dashboard uitleg</span>
              <span class="help-accordion__icon">⌄</span>
            </button>
            <div v-if="helpSections.dashboard" class="help-accordion__body">
              Gebruik de snelle acties om scenario's te maken of beheren en open de meldingen voor recente updates.
            </div>
          </div>

          <div class="help-accordion__item help-accordion__item--links">
            <div class="help-accordion__label">Handige links</div>
            <div class="help-links">
              <button class="help-pill" type="button" @click="openMarketingWebsite">Marketing website</button>
            </div>
          </div>

          <div class="help-accordion__item help-accordion__item--contact">
            <div class="help-accordion__label">Contact &amp; support</div>
            <p class="help-contact-copy">Probleem gevonden of hulp nodig?</p>
            <button class="btn-primary topbar-panel__primary" type="button" @click="contactSupport">Contact opnemen</button>
          </div>
        </div>
      </section>

      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoUrl from '../assets/Favicon.png'
import bellIcon from '../assets/icons/fi-rr-bell.png'
import helpIcon from '../assets/icons/fi-rr-interrogation.png'
import dashboardIcon from '../assets/icons/fi-rr-dashboard.png'
import appsIcon from '../assets/icons/fi-rr-apps.png'
import clockIcon from '../assets/icons/fi-rr-clock.png'
import chartIcon from '../assets/icons/fi-rr-chart-histogram.png'
import settingsIcon from '../assets/icons/fi-rr-settings.png'
import logoutIcon from '../assets/icons/fi-rr-time-delete.png'
import notificationService from '../services/notificationService'

const router = useRouter()
const route = useRoute()

const isNotificationsOpen = ref(false)
const isHelpOpen = ref(false)
const isSidebarOpen = ref(false)
const notifications = ref<{ id: string; title: string; timestamp: string }[]>([])
const helpSections = reactive({
  about: false,
  dashboard: false
})

const notificationCount = computed(() => notifications.value.length)

onMounted(async () => {
  notifications.value = await notificationService.listNotifications()
})

watch(
  () => route.fullPath,
  () => {
    closeSidebar()
  }
)

watch(isSidebarOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closePanels()
    closeSidebar()
  }
}

window.addEventListener('keydown', handleKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

const navItems = [
  { to: '/', label: 'Dashboard', icon: dashboardIcon },
  { to: '/scenarios', label: "Scenario's", icon: appsIcon },
  { to: '/sessions', label: 'Sessies', icon: clockIcon },
  { to: '/analytics', label: 'Inzichten', icon: chartIcon },
  { to: '/settings', label: 'Instellingen', icon: settingsIcon }
]

function closePanels() {
  isNotificationsOpen.value = false
  isHelpOpen.value = false
}

function closeSidebar() {
  isSidebarOpen.value = false
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
  if (isSidebarOpen.value) {
    closePanels()
  }
}

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value
  if (isNotificationsOpen.value) {
    isHelpOpen.value = false
    closeSidebar()
  }
}

function toggleHelp() {
  isHelpOpen.value = !isHelpOpen.value
  if (isHelpOpen.value) {
    isNotificationsOpen.value = false
    closeSidebar()
  }
}

function clearNotifications() {
  void notificationService.clearNotifications().then((items) => {
    notifications.value = items
  })
}

function dismissNotification(id: string) {
  void notificationService.dismissNotification(id).then((items) => {
    notifications.value = items
  })
}

function toggleHelpSection(section: 'about' | 'dashboard') {
  helpSections[section] = !helpSections[section]
}

function openMarketingWebsite() {
  window.open('https://sensus.nl', '_blank', 'noopener')
}

function contactSupport() {
  window.location.href = 'mailto:support@sensus.nl?subject=Sensus%20Admin%20support'
}

function goToAnalytics() {
  closePanels()
  closeSidebar()
  router.push('/analytics')
}
</script>

<style scoped>
.app-shell {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr);
  min-height: 100vh;
  background: var(--color-background, #f7f4f2);
}

.sidebar-backdrop {
  display: none;
}

.sidebar {
  background: var(--color-surface, #fff);
  border-right: 1px solid rgba(2, 40, 55, 0.08);
  display: flex;
  flex-direction: column;
  padding: 24px 14px 18px;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
}

.brand-logo {
  width: 64px;
  height: auto;
  display: block;
}

.sidebar-nav {
  display: grid;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  color: var(--color-text-strong, #1e1e1e);
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: linear-gradient(90deg, var(--purple-600), var(--purple-400));
  color: var(--color-text-inverse, #fff);
}

.nav-item.router-link-active .nav-icon,
.nav-item.router-link-exact-active .nav-icon {
  filter: brightness(0) invert(1);
}

.nav-item--logout {
  color: #c24b4b;
}

.nav-item--logout.router-link-active,
.nav-item--logout.router-link-exact-active {
  background: rgba(194, 75, 75, 0.08);
  color: #c24b4b;
}

.nav-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex: 0 0 auto;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(2, 40, 55, 0.12);
}

.workspace {
  padding: 18px 24px 20px 44px;
  position: relative;
}

.workspace-header {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.workspace-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex: 1;
}

.sidebar-toggle {
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(2, 40, 55, 0.12);
  border-radius: 14px;
  background: var(--color-surface, #fff);
  box-shadow: 0 6px 16px rgba(2, 40, 55, 0.05);
  padding: 0;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-direction: column;
  cursor: pointer;
}

.sidebar-toggle__line {
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: var(--color-text-strong, #1e1e1e);
  display: block;
}

.topbar-search {
  width: min(396px, 100%);
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 14px;
  border: 1px solid rgba(2, 40, 55, 0.08);
  border-radius: 16px;
  background: var(--color-surface, #fff);
  box-shadow: 0 6px 16px rgba(2, 40, 55, 0.05);
}

.topbar-search input {
  border: none;
  background: transparent;
  padding: 0;
  width: 100%;
  min-height: unset;
}

.topbar-search input:focus {
  box-shadow: none;
}

.search-icon {
  color: var(--color-text, #454147);
  font-size: 0.95rem;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.topbar-icon-btn {
  position: relative;
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.topbar-icon-btn img {
  width: 22px;
  height: 22px;
}

.topbar-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #b91d8a;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.topbar-panel {
  position: absolute;
  top: 74px;
  right: 0;
  width: min(420px, 100%);
  background: var(--color-surface, #fff);
  border: 1px solid rgba(2, 40, 55, 0.12);
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(2, 40, 55, 0.12);
  padding: 18px;
  z-index: 20;
}

.topbar-panel--notifications {
  max-width: 390px;
}

.topbar-panel--help {
  max-width: 440px;
}

.topbar-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.topbar-panel__title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-text-strong, #1e1e1e);
}

.topbar-panel__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-left: 8px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(185, 29, 138, 0.14);
  color: #b91d8a;
  font-size: 0.95rem;
}

.topbar-panel__action,
.topbar-panel__link {
  border: none;
  background: transparent;
  color: var(--color-text, #454147);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.topbar-panel__action:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.notification-list {
  display: grid;
  gap: 12px;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 14px 12px;
  border-radius: 16px;
  border: 1px solid rgba(2, 40, 55, 0.08);
  background: #faf9f8;
}

.notification-item__content {
  display: grid;
  gap: 8px;
}

.notification-item__title {
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-strong, #1e1e1e);
}

.notification-item__meta {
  color: var(--color-text, #454147);
  font-size: 0.92rem;
}

.notification-item__close {
  border: none;
  background: transparent;
  color: var(--color-text, #454147);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.topbar-panel__empty {
  margin: 0;
  color: var(--color-text, #454147);
}

.topbar-panel__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 16px;
}

.topbar-panel__primary {
  min-height: 42px;
  padding-inline: 16px;
}

.help-accordion {
  display: grid;
  gap: 12px;
}

.help-accordion__item {
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(2, 40, 55, 0.08);
  background: #faf9f8;
}

.help-accordion__trigger {
  width: 100%;
  border: none;
  background: transparent;
  color: var(--color-text-strong, #1e1e1e);
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  padding: 0;
}

.help-accordion__icon {
  font-size: 1.1rem;
}

.help-accordion__body {
  margin-top: 10px;
  color: var(--color-text, #454147);
  line-height: 1.5;
}

.help-accordion__label {
  font-weight: 700;
  color: var(--color-text-strong, #1e1e1e);
  margin-bottom: 10px;
}

.help-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.help-pill {
  min-height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(2, 40, 55, 0.14);
  background: #fff;
  color: var(--color-text-strong, #1e1e1e);
  padding: 0 16px;
  font-weight: 700;
  cursor: pointer;
}

.help-contact-copy {
  margin: 0 0 12px;
  color: var(--color-text, #454147);
}

.profile-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-strong, #1e1e1e);
}

.profile-avatar {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--blue-700), var(--purple-600));
  color: white;
  font-size: 0.82rem;
  font-weight: 700;
}

.profile-meta {
  display: grid;
  line-height: 1.05;
}

.profile-name {
  font-size: 0.95rem;
  font-weight: 700;
}

.profile-role {
  font-size: 0.85rem;
  color: var(--color-text);
}

.profile-caret {
  color: var(--color-text-strong, #1e1e1e);
  margin-left: 2px;
}

.content {
  padding-top: 14px;
}

@media (max-width: 1100px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid rgba(2, 40, 55, 0.08);
  }

  .profile-meta,
  .profile-caret {
    display: none;
  }

  .sidebar {
    padding-inline: 12px;
  }

  .nav-item {
    justify-content: center;
    padding-inline: 0;
  }

  .sidebar-footer {
    display: grid;
    place-items: center;
  }

  .topbar-panel {
    left: 12px;
    right: 12px;
    width: auto;
  }
}

@media (max-width: 768px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(84vw, 300px);
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    box-shadow: 16px 0 40px rgba(2, 40, 55, 0.18);
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(2, 40, 55, 0.34);
    z-index: 40;
  }

  .workspace {
    padding-inline: 12px;
  }

  .workspace-header {
    align-items: center;
    gap: 12px;
  }

  .workspace-header__left {
    gap: 10px;
  }

  .sidebar-toggle {
    display: inline-flex;
    flex: 0 0 auto;
  }

  .topbar-search {
    min-width: 0;
    width: 100%;
  }

  .topbar-actions {
    align-self: center;
    gap: 10px;
  }

  .profile-chip {
    padding-left: 0;
  }

  .profile-avatar {
    width: 38px;
    height: 38px;
  }
}
</style>
