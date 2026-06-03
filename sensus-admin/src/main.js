import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/auth'

import './styles/tokens.css'
import './styles/base.css'
import './styles/typography.css'
import './styles/utilities.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const authStore = useAuthStore(pinia)

await authStore.fetchUser()
authStore.setupAuthListener()

// wacht tot auth echt stabiel is
await new Promise((resolve) => {
  const check = () => {
    if (authStore.isAuthenticated !== undefined) {
      resolve()
    } else {
      setTimeout(check, 50)
    }
  }
  check()
})

app.use(router)

app.mount('#app')
