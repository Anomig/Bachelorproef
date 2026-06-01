import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import faviconUrl from './assets/Favicon.png'

// Global admin styles and design tokens
import './style.css'
import './assets/styles/tokens.css'
import './assets/styles/global.css'
import './assets/styles/components.css'
import './assets/styles/pages.css'
import './assets/styles/typography.css'
import { initSupabase } from './services/supabaseClient'

initSupabase()

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null
if (favicon) {
	favicon.href = faviconUrl
}