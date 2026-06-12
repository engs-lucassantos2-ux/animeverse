<template>
  <div class="catalog">
    <h1 class="catalog-title">Catálogo</h1>

    <SearchBar @search="onSearch" />
    <FilterBar @filter="onFilter" />

    <div v-if="loading" class="loading">
      <span class="loading-spinner"></span>
      Carregando...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
      <button class="btn-primary" style="margin-top:1rem" @click="loadTop">Tentar novamente</button>
    </div>

    <div v-else-if="animes.length === 0" class="empty">
      Nenhum anime encontrado.
    </div>

    <div v-else class="anime-grid">
      <AnimeCard
        v-for="anime in animes"
        :key="anime.mal_id"
        :anime="anime"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import AnimeCard from '@/components/anime/AnimeCard.vue'
import SearchBar from '@/components/anime/SearchBar.vue'
import FilterBar from '@/components/anime/FilterBar.vue'
import { getTopAnimes, searchAnimes, getAnimesByGenre } from '@/services/animeApi.js'

export default {
  name: 'CatalogView',
  components: { AnimeCard, SearchBar, FilterBar },
  setup() {
    const animes  = ref([])
    const loading = ref(false)
    const error   = ref(null)

    // evita requisições simultâneas ao trocar filtro rápido
    let debounceTimer = null

    async function fetchWith(fn) {
      if (debounceTimer) clearTimeout(debounceTimer)

      debounceTimer = setTimeout(async () => {
        loading.value = true
        error.value   = null
        try {
          animes.value = await fn()
        } catch (e) {
          error.value = 'Erro ao carregar animes. Aguarde um momento e tente novamente.'
          animes.value = []
        } finally {
          loading.value = false
        }
      }, 400)
    }

    function loadTop()           { fetchWith(() => getTopAnimes()) }
    function onSearch(query)     { query   ? fetchWith(() => searchAnimes(query))      : loadTop() }
    function onFilter(genreId)   { genreId ? fetchWith(() => getAnimesByGenre(genreId)): loadTop() }

    onMounted(loadTop)

    return { animes, loading, error, onSearch, onFilter, loadTop }
  }
}
</script>

<style scoped>
.catalog {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.catalog-title {
  font-family: var(--font-jp);
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  color: var(--color-text-light);
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 4rem;
  color: var(--color-text-muted);
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--color-accent);
}

.empty {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--color-text-muted);
}
</style>