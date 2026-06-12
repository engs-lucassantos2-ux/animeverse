<template>
  <div class="card" @click="$emit('click', anime)">
    <img :src="hxh2.jpg" :alt="anime.title" class="card-img" />
    <div class="card-info">
      <p class="card-title">{{ anime.title }}</p>
      <span class="card-score">{{ anime.score ?? 'N/A' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimeCard',
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.card {
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  background: var(--color-card);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
}

.card-img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  display: block;
}

.card-info {
  padding: 0.5rem;
}

.card-title {
  font-size: 0.85rem;
  color: var(--color-text);
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-score {
  font-size: 0.8rem;
  color: var(--color-accent);
}
</style>