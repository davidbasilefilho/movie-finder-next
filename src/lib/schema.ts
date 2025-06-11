import { z } from "zod/v4";

export const findMovieRequestSchema = z.object({
  id: z.string(),
});

export type FindMovieRequest = z.infer<typeof findMovieRequestSchema>;

export const findMovieResponseSchema = z.object({
  movie_results: z.array(
    z.object({
      id: z.number().int(),
      adult: z.boolean(),
      backdrop_path: z.string().nullable().optional(),
      title: z.string().nullable().optional(),
      original_title: z.string().nullable().optional(),
      original_language: z.string().nullable().optional(),
      overview: z.string().nullable().optional(),
      poster_path: z.string().nullable().optional(),
      media_type: z.string().nullable().optional(),
      genre_ids: z.array(z.number().int()).optional().nullable(),
      popularity: z.number().optional().nullable(),
      release_date: z.string().nullable().optional(),
      video: z.boolean().optional().nullable(),
      vote_average: z.number().optional().nullable(),
      vote_count: z.number().int().optional().nullable(),
    }),
  ),
});
