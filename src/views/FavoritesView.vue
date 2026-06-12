<template>
  <div class="favorites-page">
    <div class="page-header">
      <p class="page-eyebrow">お気に入り — Favoritos</p>
      <h1>Minha Lista</h1>
      <span class="fav-count">{{ favoritesStore.count }} anime(s)</span>
    </div>

    <div v-if="favoritesStore.count === 0" class="empty-state">
      <span class="empty-jp">空</span>
      <p>Sua lista está vazia</p>
      <RouterLink to="/catalogo" class="btn-primary">Explorar Catálogo</RouterLink>
    </div>

    <div v-else>
      <div class="favorites-toolbar">
        <input
          v-model="search"
          type="text"
          placeholder="Filtrar favoritos..."
          class="fav-search"
        />
        <button class="btn-clear" @click="confirmClear">Limpar tudo</button>
      </div>

      <div class="anime-grid">
        <AnimeCard
          v-for="anime in filteredFavorites"
          :key="anime.mal_id"
          :anime="anime"
        />
      </div>

      <p v-if="filteredFavorites.length === 0" class="no-results">
        Nenhum favorito encontrado para "{{ search }}"
      </p>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal">
        <p class="modal-jp">確認</p>
        <h3>Limpar favoritos?</h3>
        <p>Essa ação não pode ser desfeita.</p>
        <div class="modal-actions">
          <button class="btn-secondary" @click="showModal = false">Cancelar</button>
          <button class="btn-primary" @click="clearAll">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavoritesStore } from '@/store/favorites'
import AnimeCard from '@/components/anime/AnimeCard.vue'

export default {
  name: 'FavoritesView',
  components: { AnimeCard },
  setup() {
    return { favoritesStore: useFavoritesStore() }
  },
  data() {
    return {
      search: '',
      showModal: false
    }
  },
  computed: {
    filteredFavorites() {
      if (!this.search.trim()) return this.favoritesStore.items
      const q = this.search.toLowerCase()
      return this.favoritesStore.items.filter(a =>
        a.title.toLowerCase().includes(q)
      )
    }
  },
  methods: {
    confirmClear() {
      this.showModal = true
    },
    clearAll() {
      this.favoritesStore.clear()
      this.showModal = false
    }
  }
}
</script>

<style scoped>
.favorites-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.page-header {
  margin-bottom: 2.5rem;
}

.page-eyebrow {
  font-family: var(--font-jp);
  font-size: 0.8rem;
  color: var(--color-accent);
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}

.page-header h1 {
  font-family: var(--font-jp);
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--color-text-light);
}

.fav-count {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.empty-state {
  text-align: center;
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-jp {
  font-family: var(--font-jp);
  font-size: 5rem;
  color: var(--color-border);
  line-height: 1;
}

.empty-state p {
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.favorites-toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.fav-search {
  flex: 1;
}

.btn-clear {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 0.7rem 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-clear:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.no-results {
  text-align: center;
  color: var(--color-text-muted);
  padding: 3rem 0;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  padding: 2.5rem;
  max-width: 380px;
  width: 90%;
  text-align: center;
}

.modal-jp {
  font-family: var(--font-jp);
  color: var(--color-accent);
  font-size: 0.8rem;
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
}

.modal h3 {
  font-family: var(--font-jp);
  color: var(--color-text-light);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.modal p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .anime-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .favorites-toolbar {
    flex-direction: column;
  }

  .fav-search {
    width: 100%;
  }
}
</style>
