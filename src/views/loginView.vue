<template>
  <div class="auth-page">
    <div class="auth-card">
      <p class="auth-jp">ログイン</p>
      <h1>Entrar</h1>

      <div v-if="errorMsg" class="auth-error">{{ errorMsg }}</div>

      <div class="auth-form">

        <div class="form-group">
          <label>E-mail</label>
          <input
            v-model="email"
            type="email"
            placeholder="seu@email.com"
            :class="{ 'input-error': errors.email }"
            @keyup.enter="submit"
          />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label>Senha</label>
          <div class="input-wrapper">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              :class="{ 'input-error': errors.password }"
              @keyup.enter="submit"
            />
            <button class="toggle-pw" type="button" @click="showPassword = !showPassword" tabindex="-1">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            </button>
          </div>
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <button class="btn-primary" style="width:100%" @click="submit" :disabled="loading">
          <span v-if="loading">Entrando...</span>
          <span v-else>Entrar</span>
        </button>
      </div>

      <p class="auth-switch">
        Não tem conta?
        <RouterLink to="/cadastro">Cadastre-se</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginView',
  setup() {
    return {
      authStore: useAuthStore(),
      router: useRouter()
    }
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
      errors: {},
      errorMsg: ''
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.email) this.errors.email = 'E-mail obrigatório'
      else if (!/\S+@\S+\.\S+/.test(this.email)) this.errors.email = 'E-mail inválido'
      if (!this.password) this.errors.password = 'Senha obrigatória'
      return Object.keys(this.errors).length === 0
    },
    async submit() {
      this.errorMsg = ''
      if (!this.validate()) return
      this.loading = true
      try {
        this.authStore.login(this.email, this.password)
        this.router.push('/')
      } catch (err) {
        this.errorMsg = err.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  padding: 2.5rem;
}

.auth-jp {
  font-family: var(--font-jp);
  font-size: 0.8rem;
  color: var(--color-accent);
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}

.auth-card h1 {
  font-family: var(--font-jp);
  font-size: 2rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

.auth-error {
  background: rgba(200, 16, 46, 0.1);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  letter-spacing: 1px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrapper input {
  padding-right: 2.8rem;
}

.toggle-pw {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.toggle-pw:hover {
  color: var(--color-accent);
}

.toggle-pw svg {
  width: 18px;
  height: 18px;
}

.input-error {
  border-color: var(--color-accent) !important;
}

.field-error {
  font-size: 0.78rem;
  color: var(--color-accent);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.auth-switch {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.auth-switch a {
  color: var(--color-accent);
  text-decoration: none;
  margin-left: 0.3rem;
}
</style>