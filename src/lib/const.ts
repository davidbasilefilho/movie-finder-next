export const API_BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = process.env.TMDB_API_KEY;
export const GET_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
