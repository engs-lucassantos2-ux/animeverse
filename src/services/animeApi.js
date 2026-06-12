const BASE_URL = 'https://api.jikan.moe/v4'

async function fetchJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`)
  const data = await res.json()
  return data.data ?? []
}

export async function getTopAnimes() {
  return fetchJSON(`${BASE_URL}/top/anime?limit=20`)
}

export async function searchAnimes(query) {
  return fetchJSON(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=20`)
}

export async function getAnimesByGenre(genreId) {
  return fetchJSON(`${BASE_URL}/anime?genres=${genreId}&limit=20`)
}