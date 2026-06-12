<template>
  <div class="detail-page">
    <div v-if="loading" class="loading-state">
      <span class="loading-jp">読み込み中...</span>
    </div>

    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <RouterLink to="/catalogo" class="btn-primary">Voltar ao Catálogo</RouterLink>
    </div>

    <div v-else-if="anime" class="detail-content">
      <div class="detail-hero">
        <div class="detail-cover">
          <img :src="anime.images?.jpg?.large_image_url" :alt="anime.title" />
          <button
            class="btn-fav-detail"
            :class="{ active: isFavorite }"
            @click="toggleFavorite"
          >
            {{ isFavorite ? '❤️ Favoritado' : '🤍 Favoritar' }}
          </button>
        </div>

        <div class="detail-info">
          <p class="detail-eyebrow">{{ anime.year }} — {{ anime.type }}</p>
          <h1>{{ anime.title }}</h1>
          <p class="title-jp" v-if="anime.title_japanese">{{ anime.title_japanese }}</p>

          <div class="stats-row">
            <div class="stat" v-if="anime.score">
              <span class="stat-val">★ {{ anime.score }}</span>
              <span class="stat-label">Nota</span>
            </div>
            <div class="stat" v-if="anime.episodes">
              <span class="stat-val">{{ anime.episodes }}</span>
              <span class="stat-label">Episódios</span>
            </div>
            <div class="stat" v-if="anime.rank">
              <span class="stat-val">#{{ anime.rank }}</span>
              <span class="stat-label">Ranking</span>
            </div>
            <div class="stat" v-if="anime.members">
              <span class="stat-val">{{ formatNum(anime.members) }}</span>
              <span class="stat-label">Membros</span>
            </div>
          </div>

          <div class="genres-row" v-if="anime.genres?.length">
            <span
              v-for="genre in anime.genres"
              :key="genre.mal_id"
              class="genre-tag"
            >{{ genre.name }}</span>
          </div>

          <div class="detail-meta">
            <div class="meta-row" v-if="anime.status">
              <span class="meta-label">Status</span>
              <span>{{ anime.status }}</span>
            </div>
            <div class="meta-row" v-if="anime.studios?.length">
              <span class="meta-label">Estúdio</span>
              <span>{{ anime.studios.map(s => s.name).join(', ') }}</span>
            </div>
            <div class="meta-row" v-if="anime.duration">
              <span class="meta-label">Duração</span>
              <span>{{ anime.duration }}</span>
            </div>
            <div class="meta-row" v-if="anime.rating">
              <span class="meta-label">Classificação</span>
              <span>{{ anime.rating }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="synopsis-section" v-if="anime.synopsis">
        <h2>Sinopse</h2>
        <p>{{ anime.synopsis }}</p>
      </div>

      <div class="trailer-section" v-if="anime.trailer?.embed_url">
        <h2>Trailer</h2>
        <div class="trailer-wrap">
          <iframe
            :src="anime.trailer.embed_url"
            allowfullscreen
            frameborder="0"
          ></iframe>
        </div>
      </div>

      <div class="back-link">
        <RouterLink to="/catalogo" class="btn-secondary">← Voltar ao Catálogo</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { getAnimeById } from '@/services/animeApi'
import { useFavoritesStore } from '@/store/favorites'
import { useAuthStore } from '@/store/auth'
import { computed } from 'vue'

export default {
  name: 'AnimeDetailView',
  setup() {
    const favoritesStore = useFavoritesStore()
    const authStore = useAuthStore()
    return { favoritesStore, authStore }
  },
  data() {
    return {
      anime: null,
      loading: false,
      error: null
    }
  },
  computed: {
    isFavorite() {
      return this.anime ? this.favoritesStore.isFavorite(this.anime.mal_id) : false
    }
  },
  async created() {
    this.loading = true
    try {
      const data = await getAnimeById(this.$route.params.id)
      this.anime = data.data
    } catch {
      this.error = 'Não foi possível carregar os detalhes deste anime.'
    } finally {
      this.loading = false
    }
  },
  methods: {
    toggleFavorite() {
      if (!this.authStore.isLoggedIn) {
        alert('Faça login para adicionar favoritos!')
        return
      }
      this.favoritesStore.toggle(this.anime)
    },
    formatNum(n) {
      return n?.toLocaleString('pt-BR') || ''
    }
  }
}
</script>

<style scoped>
.detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 5rem 0;
}

.loading-jp {
  font-family: var(--font-jp);
  font-size: 1.5rem;
  color: var(--color-accent);
  display: block;
}

.detail-hero {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.detail-cover {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-cover img {
  width: 100%;
  border: 1px solid var(--color-border);
}

.btn-fav-detail {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  font-size: 0.9rem;
  padding: 0.7rem;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.btn-fav-detail:hover,
.btn-fav-detail.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.detail-eyebrow {
  font-family: var(--font-jp);
  font-size: 0.8rem;
  color: var(--color-accent);
  letter-spacing: 3px;
  margin-bottom: 0.5rem;
}

.detail-info h1 {
  font-family: var(--font-jp);
  font-size: 2.2rem;
  font-weight: 900;
  color: var(--color-text-light);
  line-height: 1.2;
  margin-bottom: 0.4rem;
}

.title-jp {
  font-family: var(--font-jp);
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.stats-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-val {
  font-family: var(--font-jp);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-accent-2);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 1px;
}

.genres-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.genre-tag {
  font-size: 0.78rem;
  background: rgba(200, 16, 46, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(200, 16, 46, 0.3);
  padding: 3px 10px;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-row {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.4rem;
}

.meta-label {
  color: var(--color-text-muted);
  min-width: 110px;
  font-size: 0.82rem;
  letter-spacing: 1px;
}

.synopsis-section,
.trailer-section {
  margin-bottom: 2.5rem;
}

.synopsis-section h2,
.trailer-section h2 {
  font-family: var(--font-jp);
  font-size: 1.3rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.synopsis-section p {
  color: var(--color-text-muted);
  line-height: 1.8;
  font-size: 0.95rem;
}

.trailer-wrap {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

.trailer-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.back-link {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .detail-hero {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .detail-cover img {
    max-width: 220px;
  }

  .detail-info h1 {
    font-size: 1.6rem;
  }
}
</style>
