import { API_BASE_URL, GET_API_OPTIONS } from "@/lib/const";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import z from "zod/v4";
import { SearchSchema, searchSchema } from "../schema/req";

const fetchPopularMovies = createServerFn({ method: "GET" })
  .validator((page) => {
    return z.number().int().parse(page);
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
  .validator((movieId) =>
    z
      .number()
      .int()
      .parse(parseInt(movieId as string, 10)),
  )
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
    refetchOnWindowFocus: false,
    queryFn: async () => movieServerFn({ data: movieId }),
  });

export const searchServerFn = createServerFn({ method: "GET" })
  .validator((search) => {
    return searchSchema.parse(search);
  })
  .handler(async (ctx) => {
    const search = ctx.data as SearchSchema;
    const params = new URLSearchParams({
      ...search,
      include_adult: search.include_adult ? "true" : "false",
      page: search.page.toString(),
    });
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
    refetchOnWindowFocus: false,
    queryFn: async () => searchServerFn({ data: search }),
  });
