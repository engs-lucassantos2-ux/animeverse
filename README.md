# アニメバース · AnimeVerse

Plataforma para descobrir, explorar e salvar seus animes favoritos, construída com Vue 3, Pinia e Vite. Os dados são fornecidos pela [Jikan API](https://jikan.moe) (API não oficial do MyAnimeList).

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado na sua máquina:

- [Node.js](https://nodejs.org) — versão 18 ou superior
- [Git](https://git-scm.com)

---

## Como baixar e rodar

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/animeverse.git
```

**2. Entre na pasta do projeto**
```bash
cd animeverse
```

**3. Instale as dependências**
```bash
npm install
```

**4. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

**5. Acesse no navegador**
```
http://localhost:5173
```

---

## Estrutura do projeto

```
src/
├── assets/
│   └── css/
│       └── global.css       # Estilos globais e variáveis CSS
├── components/
│   ├── anime/
│   │   ├── AnimeCard.vue    # Card de cada anime
│   │   ├── SearchBar.vue    # Barra de pesquisa
│   │   └── FilterBar.vue    # Filtro por gênero
│   └── layout/
│       ├── AppHeader.vue    # Cabeçalho e navegação
│       └── AppFooter.vue    # Rodapé
├── views/
│   ├── HomeView.vue         # Página inicial
│   ├── CatalogView.vue      # Catálogo de animes
│   ├── AnimeDetailView.vue  # Detalhes de um anime
│   ├── FavoritesView.vue    # Lista de favoritos
│   ├── loginView.vue        # Login
│   └── RegisterView.vue     # Cadastro
├── store/
│   ├── auth.js              # Autenticação (Pinia)
│   └── favorites.js         # Favoritos (Pinia)
├── services/
│   └── animeApi.js          # Integração com a Jikan API
└── router/
    └── index.js             # Rotas da aplicação
```

---

## Funcionalidades

- Explorar o top 20 animes mais populares
- Buscar animes por nome em tempo real
- Filtrar por gênero (Ação, Comédia, Mistério, Romance, Sobrenatural, Isekai)
- Criar conta e fazer login (dados salvos no localStorage)
- Adicionar e remover animes dos favoritos
- Ordenar favoritos por título, nota ou ano
- Design responsivo para mobile e desktop

---

## Pontos a considerar

**Rate limit da Jikan API**
A Jikan API é gratuita e possui limite de requisições (3 por segundo). Se você trocar de filtro ou buscar muito rápido, pode receber um erro temporário. Aguarde alguns segundos e tente novamente.

**Dados salvos localmente**
O login, cadastro e favoritos são salvos no `localStorage` do navegador. Isso significa que os dados ficam apenas no seu computador e são perdidos se você limpar o cache do navegador.

**Sem backend**
O projeto não possui servidor ou banco de dados. Toda a lógica de autenticação é feita no frontend, sendo adequado apenas para fins de estudo.

---

## Como fazer build para produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/` e podem ser hospedados em qualquer serviço estático (Vercel, Netlify, GitHub Pages etc).

---

## Tecnologias utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| Vue 3 | ^3.x | Framework principal |
| Vite | ^8.x | Bundler e dev server |
| Pinia | ^2.x | Gerenciamento de estado |
| Vue Router | ^4.x | Roteamento |
| Jikan API | v4 | Dados dos animes |