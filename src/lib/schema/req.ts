import { type } from "arktype";

export const findMovieByIdRequestSchema = type("number.integer > 0").configure({
	message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type FindMovieByIdRequest = typeof findMovieByIdRequestSchema.infer;

export const findPopularMoviesRequestSchema = type(
	"number.integer > 0",
).configure({
	message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type FindMoviePopularMoviesRequest =
	typeof findPopularMoviesRequestSchema.infer;

export const searchSchema = type({
	query: "string >= 1",
	include_adult: "boolean",
	primary_release_year: "string",
	page: "number.integer > 0",
	region: "string",
	year: "string",
}).configure({
	message: (ctx) => `${ctx.propString || "(root)"} isn't ${ctx.expected}`,
});

export type SearchSchema = typeof searchSchema.infer;
