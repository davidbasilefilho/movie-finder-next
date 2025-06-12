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
