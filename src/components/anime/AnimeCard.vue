<template>
  <RouterLink :to="`/anime/${anime.mal_id}`" class="anime-card">
    <div class="card-image">
      <img
        :src="anime.images?.jpg?.image_url"
        :alt="anime.title"
        loading="lazy"
      />
      <div class="card-score" v-if="anime.score">
        ★ {{ anime.score }}
      </div>
      <button
        class="btn-fav"
        :class="{ active: isFavorite }"
        @click.prevent="toggleFavorite"
        :title="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="card-info">
      <h3 class="card-title">{{ anime.title }}</h3>
      <div class="card-meta">
        <span v-if="anime.episodes">{{ anime.episodes }} eps</span>
        <span v-if="anime.year">{{ anime.year }}</span>
      </div>
      <div class="card-genres" v-if="anime.genres?.length">
        <span
          v-for="genre in anime.genres.slice(0, 2)"
          :key="genre.mal_id"
          class="genre-tag"
        >{{ genre.name }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script>
import { useFavoritesStore } from '@/store/favorites'
import { computed } from 'vue'

export default {
  name: 'AnimeCard',
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const favoritesStore = useFavoritesStore()

    const isFavorite = computed(() =>
      favoritesStore.isFavorite(props.anime.mal_id)
    )

    function toggleFavorite() {
      try {
        favoritesStore.toggle(props.anime)
      } catch (e) {
        if (e.message === 'login_required') {
          alert('Faça login para adicionar favoritos!')
        }
      }
    }

    return { isFavorite, toggleFavorite }
  }
}
</script>

<style scoped>
.anime-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  transition: border-color 0.2s, transform 0.2s;
}

.anime-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-3px);
}

.card-image {
  position: relative;
  aspect-ratio: 2/3;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.anime-card:hover .card-image img {
  transform: scale(1.04);
}

.card-score {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0,0,0,0.8);
  color: var(--color-accent-2);
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 6px;
  font-family: var(--font-jp);
}

.btn-fav {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(0,0,0,0.7);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 6px;
  transition: transform 0.2s;
}

.btn-fav:hover {
  transform: scale(1.2);
}

.card-info {
  padding: 0.8rem;
}

.card-title {
  font-family: var(--font-jp);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-text-light);
  margin-bottom: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
}

.card-meta {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.card-meta span {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.card-genres {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.genre-tag {
  font-size: 0.65rem;
  background: rgba(200, 16, 46, 0.15);
  color: var(--color-accent);
  border: 1px solid rgba(200, 16, 46, 0.3);
  padding: 1px 6px;
}
</style>