import { defineStore } from 'pinia'
import { useAuthStore } from '@/store/auth'

function storageKey() {
  const auth = useAuthStore()
  const uid = auth.user?.id || 'guest'
  return `animeverse_favorites_${uid}`
}

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(storageKey()) || '[]')
  } catch {
    return []
  }
}

function saveItems(items) {
  localStorage.setItem(storageKey(), JSON.stringify(items))
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: loadItems(),
    sortBy: 'added' // 'added' | 'title' | 'score' | 'year'
  }),

  getters: {
    count: (state) => state.items.length,

    isFavorite: (state) => (id) => state.items.some(a => a.mal_id === id),

    sortedItems: (state) => {
      const list = [...state.items]
      switch (state.sortBy) {
        case 'title':
          return list.sort((a, b) => a.title.localeCompare(b.title))
        case 'score':
          return list.sort((a, b) => (b.score || 0) - (a.score || 0))
        case 'year':
          return list.sort((a, b) => (b.year || 0) - (a.year || 0))
        case 'added':
        default:
          return list.reverse()
      }
    }
  },

  actions: {
    reload() {
      this.items = loadItems()
    },

    toggle(anime) {
      const auth = useAuthStore()
      if (!auth.isLoggedIn) {
        throw new Error('login_required')
      }
      const index = this.items.findIndex(a => a.mal_id === anime.mal_id)
      if (index >= 0) {
        this.items.splice(index, 1)
      } else {
        this.items.push({
          mal_id:   anime.mal_id,
          title:    anime.title,
          images:   anime.images,
          score:    anime.score,
          episodes: anime.episodes,
          year:     anime.year,
          genres:   anime.genres,
          addedAt:  Date.now()
        })
      }
      saveItems(this.items)
    },

    remove(id) {
      this.items = this.items.filter(a => a.mal_id !== id)
      saveItems(this.items)
    },

    clear() {
      this.items = []
      localStorage.removeItem(storageKey())
    },

    setSortBy(value) {
      this.sortBy = value
    }
  }
})