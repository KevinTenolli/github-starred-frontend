import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from './components/Login.vue'
import User from './components/User.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/user', component: User },
    { path: '/login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.getItem('accessToken')) {
    next('/login')
  } else {
    next()
  }
})

export default router