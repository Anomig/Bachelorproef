// Entry point van de Vue app: laadt globale styles, registreert Pinia + router en mount op #app.
import './assets/styles/tokens.css'
import './assets/styles/typography.css'
import './assets/styles/global.css'
import './assets/styles/components.css'
import './assets/styles/pages.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')