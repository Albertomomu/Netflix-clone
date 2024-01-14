const key = import.meta.env.VITE_TMDB_KEY
const baseUrl = 'https://api.themoviedb.org/3'

const ENDPOINTS = {
  popular: `${baseUrl}/movie/popular?api_key=${key}`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}`,
  trending: `${baseUrl}/trending/all/day?api_key=${key}`,
  comedy: `${baseUrl}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`
}

export function createImageUrl(filename: string, size: string) {
  return `https://image.tmdb.org/t/p/${size}/${filename}`
}

export default ENDPOINTS;