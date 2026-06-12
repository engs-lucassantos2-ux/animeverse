<template>
  <div class="filter-bar">
    <select v-model="selected" class="filter-select" @change="emit">
      <option value="">Todos</option>
      <option value="1">Acao</option>
      <option value="4">Comedia</option>
      <option value="7">Misterio</option>
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

    return { selected, emit: emitFilter }
  }
}
</script>

<style scoped>
.filter-bar {
  margin-bottom: 1rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-card);
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
}
</style>