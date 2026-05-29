import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Global admin styles and design tokens
import './style.css'
import './assets/styles/tokens.css'
import './assets/styles/global.css'
import './assets/styles/components.css'
import './assets/styles/pages.css'
import './assets/styles/typography.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')