import { API_BASE_URL, GET_API_OPTIONS } from "@/lib/const";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import {
  findMovieByIdRequestSchema,
  findMoviePopularMoviesRequestSchema,
  SearchSchema,
  searchSchema,
} from "../schema/req";

const fetchPopularMovies = createServerFn({ method: "GET" })
  .validator((page) => {
    return findMoviePopularMoviesRequestSchema(page);
  })
  .handler(async (ctx) => {
    const url = `/api/movies/popular/${ctx.data}`;
    const options = {
      headers: {
        accept: "application/json",
      },
    };
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Error fetching popular movies: ${res.statusText}`);
    }
    return res.json();
  });

export const popularMoviesQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies({ data: page }),
  });

export const movieServerFn = createServerFn({ method: "GET" })
  .validator((movieId) => findMovieByIdRequestSchema(movieId))
  .handler(async (ctx) => {
    const response = await fetch(
      `${API_BASE_URL}/movie/${ctx.data}`,
      GET_API_OPTIONS,
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch movie with id ${ctx.data}: ${response.statusText}`,
      );

    return response.json();
  });

export const createMovieQueryOptions = ({ movieId }: { movieId: string }) =>
  queryOptions({
    queryKey: ["movie", movieId],
    queryFn: async () => movieServerFn({ data: movieId }),
  });

export const searchServerFn = createServerFn({ method: "GET" })
  .validator((search) => {
    return searchSchema(search);
  })
  .handler(async (ctx) => {
    const search = ctx.data as SearchSchema;
    const params = new URLSearchParams();
    params.append("query", search.query || "");
    params.append("include_adult", String(search.include_adult ?? false));
    params.append("primary_release_year", search.primary_release_year ?? "");
    params.append("page", search.page ? search.page?.toString() : "1");
    params.append("region", search.region ?? "");
    params.append("year", search.year ?? "");

    const url = `${API_BASE_URL}/search/movie?${params.toString()}`;

    const response = await fetch(url, GET_API_OPTIONS);
    if (!response.ok) {
      throw new Error(`Error fetching search results: ${response.statusText}`);
    }
    return response.json();
  });

export const createSearchQueryOptions = (search: SearchSchema) =>
  queryOptions({
    queryKey: ["search", search],
    queryFn: async () => searchServerFn({ data: search }),
  });

const fetchTrendingMovies = createServerFn({ method: "GET" }).handler(
  async () => {
    const response = await fetch("/api/movies/trending");

    if (!response.ok)
      throw new Error(
        `Failed to fetch trending movies: ${response.statusText}`,
      );

    return response.json();
  },
);

export const trendingMoviesQueryOptions = () =>
  queryOptions({
    queryKey: ["trendingMovies"],
    queryFn: () => fetchTrendingMovies(),
  });
