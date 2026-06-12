<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-jp">アニメ</span>
        <span class="logo-en">AnimeVerse</span>
      </RouterLink>

      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>

      <nav :class="['main-nav', { open: menuOpen }]">
        <RouterLink to="/" @click="menuOpen = false">Início</RouterLink>
        <RouterLink to="/catalogo" @click="menuOpen = false">Catálogo</RouterLink>
        <RouterLink to="/favoritos" @click="menuOpen = false">Favoritos</RouterLink>
        <RouterLink v-if="!authStore.isLoggedIn" to="/login" @click="menuOpen = false">Entrar</RouterLink>
        <RouterLink v-if="!authStore.isLoggedIn" to="/cadastro" @click="menuOpen = false">Cadastrar</RouterLink>
        <button v-if="authStore.isLoggedIn" class="btn-logout" @click="logout">Sair</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const menuOpen = ref(false)

    function logout() {
      authStore.logout()
      router.push('/')
    }

    return { authStore, logout, menuOpen }
  }
}
</script>

<style scoped>
.app-header {
  background-color: var(--color-bg-dark);
  border-bottom: 3px solid var(--color-accent);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
}

.logo-jp {
  font-family: var(--font-jp);
  font-size: 0.7rem;
  color: var(--color-accent);
  letter-spacing: 4px;
}

.logo-en {
  font-family: var(--font-jp);
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--color-text-light);
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.main-nav a {
  font-family: var(--font-body);
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  letter-spacing: 1px;
}

.main-nav a:hover,
.main-nav a.router-link-active {
  color: var(--color-accent);
}

.btn-logout {
  background: none;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 0.3rem 0.9rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: var(--color-accent);
  color: var(--color-bg-dark);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-light);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .main-nav {
    display: none;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--color-bg-dark);
    flex-direction: column;
    padding: 1.5rem;
    border-bottom: 2px solid var(--color-accent);
    gap: 1.2rem;
  }

  .main-nav.open {
    display: flex;
  }
}
</style>