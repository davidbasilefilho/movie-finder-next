import { queryOptions } from "@tanstack/react-query";
import type { SearchSchema } from "./schema/req";
import {
	fetchPopularMovies,
	fetchTrendingMovies,
	movieServerFn,
	searchServerFn,
} from "./server";

export const popularMoviesQueryOptions = (page: number) =>
	queryOptions({
		queryKey: ["popularMovies", page],
		queryFn: () => fetchPopularMovies({ data: page }),
		refetchOnWindowFocus: false,
	});

export const createMovieQueryOptions = ({ movieId }: { movieId: number }) =>
	queryOptions({
		queryKey: ["movie", movieId],
		queryFn: async () => movieServerFn({ data: movieId }),
		refetchOnWindowFocus: false,
	});

export const createSearchQueryOptions = (search: SearchSchema) =>
	queryOptions({
		queryKey: ["search", search],
		queryFn: async () => searchServerFn({ data: search }),
		refetchOnWindowFocus: false,
	});

export const trendingMoviesQueryOptions = () =>
	queryOptions({
		queryKey: ["trendingMovies"],
		queryFn: () => fetchTrendingMovies(),
		refetchOnWindowFocus: false,
	});
