<template>
  <div class="catalog">
    <h1 class="catalog-title">Catalogo</h1>

    <SearchBar @search="onSearch" />
    <FilterBar @filter="onFilter" />

    <div v-if="loading" class="loading">Carregando...</div>

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
import AnimeCard from '../components/anime/AnimeCard.vue'
import SearchBar from '../components/anime/SearchBar.vue'
import FilterBar from '../components/anime/FilterBar.vue'
import { getTopAnimes, searchAnimes, getAnimesByGenre } from '../services/animeApi.js'

export default {
  name: 'CatalogView',
  components: { AnimeCard, SearchBar, FilterBar },
  setup() {
    const animes = ref([])
    const loading = ref(false)

    async function loadTop() {
      loading.value = true
      animes.value = await getTopAnimes()
      loading.value = false
    }

    async function onSearch(query) {
      if (!query) return loadTop()
      loading.value = true
      animes.value = await searchAnimes(query)
      loading.value = false
    }

    async function onFilter(genreId) {
      if (!genreId) return loadTop()
      loading.value = true
      animes.value = await getAnimesByGenre(genreId)
      loading.value = false
    }

    onMounted(loadTop)

    return { animes, loading, onSearch, onFilter }
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
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
}

.anime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: var(--color-muted);
}
</style>