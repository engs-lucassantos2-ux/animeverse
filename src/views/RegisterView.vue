<template>
  <div class="auth-page">
    <div class="auth-card">
      <p class="auth-jp">登録</p>
      <h1>Criar Conta</h1>

      <div v-if="errorMsg" class="auth-error">{{ errorMsg }}</div>

      <div class="auth-form">
        <div class="form-group">
          <label>Nome</label>
          <input v-model="name" type="text" placeholder="Seu nome" />
          <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label>E-mail</label>
          <input v-model="email" type="email" placeholder="seu@email.com" />
          <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input v-model="password" type="password" placeholder="Mínimo 6 caracteres" />
          <span v-if="errors.password" class="field-error">{{ errors.password }}</span>
        </div>

        <div class="form-group">
          <label>Confirmar Senha</label>
          <input v-model="passwordConfirm" type="password" placeholder="Repita a senha" />
          <span v-if="errors.passwordConfirm" class="field-error">{{ errors.passwordConfirm }}</span>
        </div>

        <button class="btn-primary" style="width:100%" @click="submit">
          Criar Conta
        </button>
      </div>

      <p class="auth-switch">
        Já tem conta?
        <RouterLink to="/login">Entrar</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterView',
  setup() {
    return {
      authStore: useAuthStore(),
      router: useRouter()
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {},
      errorMsg: ''
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.name.trim()) this.errors.name = 'Nome obrigatório'
      if (!this.email) this.errors.email = 'E-mail obrigatório'
      else if (!/\S+@\S+\.\S+/.test(this.email)) this.errors.email = 'E-mail inválido'
      if (!this.password) this.errors.password = 'Senha obrigatória'
      else if (this.password.length < 6) this.errors.password = 'Mínimo 6 caracteres'
      if (this.password !== this.passwordConfirm) this.errors.passwordConfirm = 'As senhas não coincidem'
      return Object.keys(this.errors).length === 0
    },
    submit() {
      this.errorMsg = ''
      if (!this.validate()) return
      try {
        this.authStore.register(this.name, this.email, this.password)
        this.router.push('/')
      } catch (err) {
        this.errorMsg = err.message
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

.field-error {
  font-size: 0.78rem;
  color: var(--color-accent);
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
