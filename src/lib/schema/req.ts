import { type } from "arktype";

export const findMovieByIdRequestSchema = type("string > 0").configure({
  message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type FindMovieByIdRequest = typeof findMovieByIdRequestSchema.infer;

export const findMoviePopularMoviesRequestSchema = type(
  "number.integer > 0"
).configure({
  message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type FindMoviePopularMoviesRequest =
  typeof findMoviePopularMoviesRequestSchema.infer;

export const searchSchema = type({
  query: "string >= 1 | undefined",
  include_adult: "boolean",
  primary_release_year: "string >= 4 | undefined",
  page: "number.integer > 0",
  region: "string | undefined",
  year: "string >= 4 | undefined",
}).configure({
  message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type SearchSchema = typeof searchSchema.infer;
