const BASE_URL = 'https://api.jikan.moe/v4'

export async function getTopAnimes() {
  const res = await fetch(`${BASE_URL}/top/anime?limit=20`)
  const data = await res.json()
  return data.data
}

export async function searchAnimes(query) {
  const res = await fetch(`${BASE_URL}/anime?q=${query}&limit=20`)
  const data = await res.json()
  return data.data
}

export async function getAnimesByGenre(genreId) {
  const res = await fetch(`${BASE_URL}/anime?genres=${genreId}&limit=20`)
  const data = await res.json()
  return data.data
}