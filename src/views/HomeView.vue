<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">ようこそ — Bem-vindo</p>
        <h1 class="hero-title">AnimeVerse</h1>
        <p class="hero-subtitle">Descubra, explore e salve seus animes favoritos</p>
        <div class="hero-actions">
          <RouterLink to="/catalogo" class="btn-primary">Explorar Catálogo</RouterLink>
          <RouterLink to="/cadastro" class="btn-secondary">Criar Conta</RouterLink>
        </div>
      </div>
      <div class="hero-deco">
        <span class="kanji">漫</span>
        <span class="kanji">画</span>
      </div>
    </section>

    <section class="features">
      <div class="features-inner">
        <div class="feature-card">
          <span class="feature-icon">🔍</span>
          <h3>Busca Inteligente</h3>
          <p>Encontre qualquer anime pelo nome com resultados em tempo real</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🎌</span>
          <h3>Filtros por Gênero</h3>
          <p>Filtre por ação, romance, fantasia e muito mais</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">❤️</span>
          <h3>Lista de Favoritos</h3>
          <p>Salve os animes que você ama e acesse quando quiser</p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-inner">
        <p class="cta-jp">今すぐ始めましょう</p>
        <h2>Pronto para explorar?</h2>
        <RouterLink to="/catalogo" class="btn-primary">Ver Catálogo Agora</RouterLink>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  position: relative;
}

.hero-eyebrow {
  font-family: var(--font-jp);
  font-size: 0.9rem;
  color: var(--color-accent);
  letter-spacing: 4px;
  margin-bottom: 1rem;
}

.hero-title {
  font-family: var(--font-jp);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: var(--color-text-light);
  line-height: 1;
  margin-bottom: 1.2rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-muted);
  max-width: 420px;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-deco {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0.07;
  pointer-events: none;
  user-select: none;
}

.kanji {
  font-family: var(--font-jp);
  font-size: clamp(8rem, 18vw, 16rem);
  font-weight: 900;
  color: var(--color-accent);
  line-height: 1;
}

.features {
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 4rem 1.5rem;
}

.features-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  border: 1px solid var(--color-border);
  text-align: center;
  transition: border-color 0.2s;
}

.feature-card:hover {
  border-color: var(--color-accent);
}

.feature-icon {
  font-size: 2.2rem;
  display: block;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-family: var(--font-jp);
  color: var(--color-text-light);
  margin-bottom: 0.6rem;
  font-size: 1.1rem;
}

.feature-card p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.6;
}

.cta-section {
  padding: 6rem 1.5rem;
  text-align: center;
}

.cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.cta-jp {
  font-family: var(--font-jp);
  color: var(--color-accent);
  letter-spacing: 4px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.cta-inner h2 {
  font-family: var(--font-jp);
  font-size: 2.2rem;
  color: var(--color-text-light);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    min-height: auto;
    padding-top: 3rem;
  }

  .hero-deco {
    display: none;
  }

  .features-inner {
    grid-template-columns: 1fr;
  }
}
</style>
