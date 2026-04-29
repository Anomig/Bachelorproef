import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import Join from '../views/Join.vue'
import Overview from '../views/Overview.vue'
import Scenario from '../views/Scenario.vue'
import Reflection from '../views/Reflection.vue'
import End from '../views/EndView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/join' },
  { path: '/join', component: Join },
  { path: '/overview', component: Overview },
  { path: '/scenario', component: Scenario },
  { path: '/reflection', component: Reflection },
  { path: '/end', component: End }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
