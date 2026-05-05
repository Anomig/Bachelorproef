// JS-variant van de router; functioneel gelijk aan `router/index.ts`.
import { createRouter, createWebHistory } from 'vue-router'

import Start from '../views/StartView.vue'
import Join from '../views/Join.vue'
import InfoView from '../views/InfoView.vue'
import BeforeStartView from '../views/BeforeStartView.vue'
import Overview from '../views/Overview.vue'
import Scenario from '../views/Scenario.vue'
import Reflection from '../views/Reflection.vue'
import End from '../views/EndView.vue'

const routes = [
  { path: '/', redirect: '/start' },
  { path: '/start', component: Start },
  { path: '/join', component: Join },
  { path: '/info', component: InfoView },
  { path: '/before-start', component: BeforeStartView },
  { path: '/overview', component: Overview },
  { path: '/scenario', component: Scenario },
  { path: '/reflection', component: Reflection },
  { path: '/end', component: End }
]

export default createRouter({
  history: createWebHistory(),
  routes
})