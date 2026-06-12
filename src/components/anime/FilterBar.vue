<template>
  <div class="filter-bar">
    <select v-model="selected" class="filter-select" @change="emitFilter">
      <option value="">Todos</option>
      <option value="1">Ação</option>
      <option value="4">Comédia</option>
      <option value="7">Mistério</option>
      <option value="22">Romance</option>
      <option value="24">Sobrenatural</option>
      <option value="37">Isekai</option>
    </select>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FilterBar',
  emits: ['filter'],
  setup(props, { emit }) {
    const selected = ref('')

    function emitFilter() {
      emit('filter', selected.value)
    }

    return { selected, emitFilter }
  }
}
</script>

<style scoped>
.filter-bar {
  margin-bottom: 1rem;
}

.filter-select {
  padding: 0.5rem 1.2rem;
  border: 1px solid var(--color-border);
  background: var(--color-bg-card);
  color: var(--color-text-light);
  font-family: var(--font-body);
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a7268' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.9rem center;
  padding-right: 2.2rem;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-accent);
}

.filter-select option {
  background: var(--color-bg-card);
  color: var(--color-text-light);
}
</style>