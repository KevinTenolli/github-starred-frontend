import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from './components/Login.vue'
import User from './components/User.vue'
import NotFoundVue from './components/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    { path: '/user', component: User },
    { path: '/login', component: Login },
    { path: '/:catchAll(.*)', component: NotFoundVue }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _, next) => {
    const hasAccessToken = !!localStorage.getItem('accessToken')
    if(to.path === '/'){
        next('/login')
    } else if (to.path === '/login' && hasAccessToken) {
        next('/user')
    } else if (to.path !== '/login' && !hasAccessToken) {
        next('/login')
    } else {
        next()
    }
})

export default router