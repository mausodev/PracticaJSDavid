const BASE = "https://api.themoviedb.org/3";

async function tmdb(path, params = {}) {
  const url = new URL(BASE + path);
  url.searchParams.set("language", "es-MX");
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, v);
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB ${res.status} en ${path}: ${await res.text()}`);
  }
  return res.json();
}

export function buscarPeliculas(query, page = 1) {
  return tmdb("/search/movie", { query, page, include_adult: "false" });
}

export function obtenerPelicula(id) {
  return tmdb(`/movie/${id}`);
}

// /recommendations en vez de /similar: TMDB arma este listado con datos de
// usuarios y acierta mucho más que el de keywords + géneros.
export function obtenerSimilares(id, page = 1) {
  return tmdb(`/movie/${id}/recommendations`, { page });
}

export function obtenerPopulares(page = 1) {
  return tmdb("/movie/popular", { page });
}

export const imagen = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
