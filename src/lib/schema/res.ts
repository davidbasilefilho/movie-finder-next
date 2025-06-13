import z from "zod/v4";

export const movieSchema = z
  .object({
    adult: z.boolean().optional().nullable(),
    backdrop_path: z.string().nullable().optional(),
    genre_ids: z.array(z.number().int()).optional().nullable(),
    id: z.number().int().optional().nullable(),
    original_language: z.string().nullable().optional(),
    original_title: z.string().nullable().optional(),
    overview: z.string().nullable().optional(),
    popularity: z.number().optional().nullable(),
    poster_path: z.string().nullable().optional(),
    release_date: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    video: z.boolean().optional().nullable(),
    vote_average: z.number().optional().nullable(),
    vote_count: z.number().int().optional().nullable(),
  })
  .optional()
  .nullable();

export type Movie = z.infer<typeof movieSchema>;

export const findMovieByIdResponseSchema = z.object({
  movie_results: z.array(movieSchema).optional().nullable(),
});

export type FindMovieByIdResponse = z.infer<typeof findMovieByIdResponseSchema>;

export const findPopularMoviesResponseSchema = z.object({
  page: z.number().int().optional().nullable(),
  results: z.array(movieSchema).nullable().optional(),
  total_pages: z.number().int().optional().nullable(),
  total_results: z.number().int().optional().nullable(),
});

export type FindPopularMoviesResponse = z.infer<
  typeof findPopularMoviesResponseSchema
>;
