import { createRouter, createWebHistory } from 'vue-router'
import AdminShell from '../components/AdminShell.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import ScenariosList from '../views/ScenariosList.vue'
import ScenarioDetail from '../views/ScenarioDetail.vue'
import ScenarioCreate from '../views/ScenarioCreate.vue'
import ScenarioEditor from '../views/ScenarioEditor.vue'
import ScenarioPreview from '../views/ScenarioPreview.vue'
import Sessions from '../views/Sessions.vue'
import UsersList from '../views/UsersList.vue'
import UserDetail from '../views/UserDetail.vue'
import Analytics from '../views/Analytics.vue'
import Settings from '../views/Settings.vue'
import { getSession } from '../services/authService'
import { hasSupabaseConfig } from '../services/supabaseClient'

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  {
    path: '/',
    component: AdminShell,
    children: [
      { path: '', component: Dashboard },
      { path: 'scenarios', component: ScenariosList },
      { path: 'scenarios/new', component: ScenarioCreate },
      { path: 'scenarios/:id', component: ScenarioDetail },
      { path: 'scenarios/:id/edit', component: ScenarioEditor },
      { path: 'scenarios/:id/preview', component: ScenarioPreview },
      { path: 'sessions', component: Sessions },
      { path: 'users', component: UsersList },
      { path: 'users/:id', component: UserDetail },
      { path: 'analytics', component: Analytics },
      { path: 'settings', component: Settings }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const publicRoutes = ['/login', '/signup']

  if (!hasSupabaseConfig()) {
    return true
  }

  const session = await getSession().catch(() => null)

  if (session && publicRoutes.includes(to.path)) {
    return '/'
  }

  if (!session && !publicRoutes.includes(to.path)) {
    return '/login'
  }

  return true
})

export default router
