import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import PrivatePage from '@/components/PrivatePage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/private',
        name: 'Private',
        component: PrivatePage,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫：判断是否需要验证 token
router.beforeEach((to, from, next) => {
    // 获取 token（假设 token 存储在 localStorage 中）
    const token = localStorage.getItem('token');

    // 如果访问需要授权的路由且没有 token，跳转到 / 路径
    if (to.path !== '/' && !token) {
        next('/'); // 跳转到首页
    } else {
        next(); // 继续路由
    }
})

export default router
