import { createServerFn } from "@tanstack/react-start";
import { TMDB_BASE_URL, GET_API_OPTIONS } from "./const";
import {
  findMovieByIdRequestSchema,
  findPopularMoviesRequestSchema,
  SearchSchema,
  searchSchema,
} from "./schema/req";
import { type } from "arktype";

export const fetchPopularMovies = createServerFn({ method: "GET" })
  .validator(findPopularMoviesRequestSchema)
  .handler(async (ctx) => {
    const url = `${TMDB_BASE_URL}/movie/popular?page=${ctx.data}&language=en-US`;
    const res = await fetch(url, GET_API_OPTIONS);
    if (!res.ok) {
      throw new Error(`Error fetching popular movies: ${res.statusText}`);
    }
    return res.json();
  });

export const movieServerFn = createServerFn({ method: "GET" })
  .validator((movieId) => findMovieByIdRequestSchema(movieId))
  .handler(async (ctx) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${ctx.data}`,
      GET_API_OPTIONS,
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch movie with id ${ctx.data}: ${response.statusText}`,
      );

    return response.json();
  });

export const searchServerFn = createServerFn({ method: "GET" })
  .validator(searchSchema)
  .handler(async (ctx) => {
    const search = ctx.data;
    if (
      search instanceof type.errors ||
      !search.query ||
      "byPath" in search ||
      "flatByPath" in search ||
      typeof search !== "object"
    ) {
      throw new Error(
        `Invalid search parameters: ${search || "Unknown error"}`,
      );
    }

    const params = new URLSearchParams({
      include_adult: search.include_adult ? "true" : "false",
      region: search.region || "",
      primary_release_year: search.primary_release_year || "",
      year: search.year || "",
      page: search.page ? search.page.toString() : "1",
    });
    params.append("query", search.query || "");
    params.append("include_adult", String(search.include_adult ?? false));
    params.append("primary_release_year", search.primary_release_year ?? "");
    params.append("page", search.page ? search.page?.toString() : "1");
    params.append("region", search.region ?? "");
    params.append("year", search.year ?? "");

    const url = `${TMDB_BASE_URL}/search/movie?${params.toString()}`;

    const response = await fetch(url, GET_API_OPTIONS);
    if (!response.ok) {
      throw new Error(`Error fetching search results: ${response.statusText}`);
    }
    return response.json();
  });

export const fetchTrendingMovies = createServerFn({ method: "GET" }).handler(
  async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/week`,
      GET_API_OPTIONS,
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch trending movies: Error ${response.status} ${response.statusText}`,
      );

    return response.json();
  },
);
