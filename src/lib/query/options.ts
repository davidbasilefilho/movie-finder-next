import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod/v4";

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
