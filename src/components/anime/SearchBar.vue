<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      placeholder="Buscar anime..."
      class="search-input"
      @keyup.enter="emit"
    />
    <button class="search-btn" @click="emit">Buscar</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SearchBar',
  emits: ['search'],
  setup(props, { emit }) {
    const query = ref('')

    function emitSearch() {
      emit('search', query.value.trim())
    }

    return { query, emit: emitSearch }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-card);
  color: var(--color-text);
  font-size: 1rem;
}

.search-btn {
  padding: 0.5rem 1.2rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.search-btn:hover {
  opacity: 0.85;
}
</style>