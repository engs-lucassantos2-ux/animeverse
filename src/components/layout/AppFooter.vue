<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="logo-jp">アニメバース</span>
        <p>Seu portal de animes favoritos</p>
      </div>
      <div class="footer-links">
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
      </div>
      <div class="footer-info">
        <p>Dados fornecidos por <a href="https://jikan.moe" target="_blank">Jikan API</a></p>
        <p class="copy">&copy; {{ year }} AnimeVerse</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>制作：AnimeVerse チーム</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.app-footer {
  background: var(--color-bg-dark);
  border-top: 3px solid var(--color-accent);
  margin-top: 4rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer-brand .logo-jp {
  font-family: var(--font-jp);
  font-size: 1.2rem;
  color: var(--color-accent);
  letter-spacing: 3px;
  display: block;
  margin-bottom: 0.5rem;
}

.footer-brand p {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-info p {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.footer-info a {
  color: var(--color-accent);
  text-decoration: none;
}

.copy {
  margin-top: 0.5rem;
}

.footer-bottom {
  text-align: center;
  padding: 0.8rem;
  background: rgba(0,0,0,0.3);
  color: var(--color-text-muted);
  font-family: var(--font-jp);
  font-size: 0.8rem;
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
