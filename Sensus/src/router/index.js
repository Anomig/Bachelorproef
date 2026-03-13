import { createRouter, createWebHistory } from 'vue-router'

import Start from '../views/StartView.vue'
import AgeGender from '../views/AgeGenderView.vue'
import Warning from '../views/WarningView.vue'
import Home from '../views/HomeView.vue'
import Scenario from '../views/ScenarioView.vue'

const routes = [

  { path: '/', component: Start },

  { path: '/onboarding', component: AgeGender },

  { path: '/warning', component: Warning },

  { path: '/home', component: Home },

  { path: '/scenario/:id', component: Scenario }

]

export default createRouter({
  history: createWebHistory(),
  routes
})