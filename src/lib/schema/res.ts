import { scope } from "arktype";

export const movieScope = scope({
  Movie: {
    adult: "boolean | null | undefined",
    backdrop_path: "string | null | undefined",
    genre_ids: "number[] | null | undefined",
    id: "number.integer >= 0 | null | undefined",
    original_language: "string | null | undefined",
    original_title: "string | null | undefined",
    overview: "string | null | undefined",
    popularity: "number | null | undefined",
    poster_path: "string | null | undefined",
    release_date: "string | null | undefined",
    title: "string | null | undefined",
    video: "boolean | null | undefined",
    vote_average: "number | null | undefined",
    vote_count: "number.integer >= 0 | null | undefined",
  },
});

export const movieSchema = movieScope.type("Movie").configure({
  message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type Movie = typeof movieSchema.infer;

export const findPopularMoviesResponseSchema = movieScope
  .type({
    movie_results: "Movie[] | null | undefined",
  })
  .configure({
    message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
  });

export type FindPopularMoviesResponse =
  typeof findPopularMoviesResponseSchema.infer;

export const findTrendingMoviesResponseSchema =
  findPopularMoviesResponseSchema.or("undefined");
export type FindTrendingMoviesResponse =
  typeof findTrendingMoviesResponseSchema.infer;

export const searchMoviesResponseSchema = movieScope
  .type({
    results: "Movie[] | null | undefined",
    total_pages: "number.integer >= 1 | null | undefined",
    total_results: "number.integer >= 0 | null | undefined",
    page: "number.integer >= 1 | null | undefined",
  })
  .configure({
    message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
  });

export type SearchMoviesResponse = typeof searchMoviesResponseSchema.infer;
