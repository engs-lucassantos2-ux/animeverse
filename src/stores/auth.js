import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('animeverse_user')) || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    username: (state) => state.user?.name || '',
    avatar: (state) => state.user?.avatar || null
  },

  actions: {
    register(name, email, password, avatar = null) {
      const users = JSON.parse(localStorage.getItem('animeverse_users') || '[]')
      const exists = users.find(u => u.email === email)
      if (exists) {
        throw new Error('E-mail já cadastrado')
      }
      const newUser = { id: Date.now(), name, email, password, avatar }
      users.push(newUser)
      localStorage.setItem('animeverse_users', JSON.stringify(users))
      this.user = { id: newUser.id, name, email, avatar }
      localStorage.setItem('animeverse_user', JSON.stringify(this.user))
    },

    login(email, password) {
      const users = JSON.parse(localStorage.getItem('animeverse_users') || '[]')
      const found = users.find(u => u.email === email && u.password === password)
      if (!found) {
        throw new Error('E-mail ou senha incorretos')
      }
      this.user = { id: found.id, name: found.name, email: found.email, avatar: found.avatar || null }
      localStorage.setItem('animeverse_user', JSON.stringify(this.user))
    },

    logout() {
      this.user = null
      localStorage.removeItem('animeverse_user')
    }
  }
})