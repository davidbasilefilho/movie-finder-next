import z from "zod/v4";

export const findMovieRequestSchema = z.object({
  id: z.number().int(),
});

export type FindMovieByIdRequest = z.infer<typeof findMovieRequestSchema>;

export const findPopularMoviesRequestSchema = z.object({
  page: z.number().int().optional().default(1),
});

export type FindPopularMoviesRequest = z.infer<
  typeof findPopularMoviesRequestSchema
>;

export const searchSchema = z.object({
  query: z.string(),
  include_adult: z.boolean(),
  primary_release_year: z.string(),
  page: z.number().int().positive().default(1).nonoptional(),
  region: z.string(),
  year: z.string(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
