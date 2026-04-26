import { createRouter, createWebHistory } from 'vue-router'

import Start from '../views/Start.vue'
import Home from '../views/Home.vue'
import Join from '../views/Join.vue'
import Scenario from '../views/Scenario.vue'
import End from '../views/EndView.vue'

const routes = [
  { path: '/', component: Start },
  { path: '/join', component: Join },
  { path: '/home', component: Home },
  { path: '/scenario/:id', component: Scenario },
  { path: '/end', component: End }
]

export default createRouter({
  history: createWebHistory(),
  routes
})