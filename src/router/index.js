import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: () => import('@/views/CatalogView.vue')
  },
  {
    path: '/anime/:id',
    name: 'AnimeDetail',
    component: () => import('@/views/AnimeDetailView.vue')
  },
  {
    path: '/favoritos',
    name: 'Favoritos',
    component: () => import('@/views/FavoritesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/loginView.vue')
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/views/RegisterView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // passa a rota atual como ?redirect= para voltar depois do login
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})

export default router