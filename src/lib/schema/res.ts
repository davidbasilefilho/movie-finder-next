import z from "zod/v4";

export const movieSchema = z
  .object({
    adult: z.boolean({ error: "Invalid boolean" }).optional().nullable(),
    backdrop_path: z.string({ error: "Invalid string" }).nullable().optional(),
    genre_ids: z
      .array(
        z.number({ error: "Invalid number" }).int({ error: "Not an integer" }),
        { error: "Invalid array of numbers" },
      )
      .optional()
      .nullable(),
    id: z
      .number({ error: "Invalid number" })
      .int({ error: "Not an integer" })
      .optional()
      .nullable(),
    original_language: z
      .string({ error: "Invalid string" })
      .nullable()
      .optional(),
    original_title: z.string({ error: "Invalid string" }).nullable().optional(),
    overview: z.string({ error: "Invalid string" }).nullable().optional(),
    popularity: z.number({ error: "Invalid number" }).optional().nullable(),
    poster_path: z.string({ error: "Invalid string" }).nullable().optional(),
    release_date: z.string({ error: "Invalid string" }).nullable().optional(),
    title: z.string({ error: "Invalid string" }).nullable().optional(),
    video: z.boolean({ error: "Invalid boolean" }).optional().nullable(),
    vote_average: z.number({ error: "Invalid number" }).optional().nullable(),
    vote_count: z
      .number({ error: "Invalid number" })
      .int({ error: "Not an integer" })
      .optional()
      .nullable(),
  })
  .optional()
  .nullable();

export type Movie = z.infer<typeof movieSchema>;

export const findMovieByIdResponseSchema = z.object({
  movie_results: z
    .array(movieSchema, { error: "Invalid array of movies" })
    .optional()
    .nullable(),
});

export type FindMovieByIdResponse = z.infer<typeof findMovieByIdResponseSchema>;

export const findPopularMoviesResponseSchema = z.object({
  page: z
    .number({ error: "Invalid number" })
    .int({ error: "Not an integer" })
    .optional()
    .nullable(),
  results: z
    .array(movieSchema, { error: "Invalid array of movies" })
    .nullable()
    .optional(),
  total_pages: z
    .number({ error: "Invalid number" })
    .int({ error: "Not an integer" })
    .optional()
    .nullable(),
  total_results: z
    .number({ error: "Invalid number" })
    .int({ error: "Not an integer" })
    .optional()
    .nullable(),
});

export type FindPopularMoviesResponse = z.infer<
  typeof findPopularMoviesResponseSchema
>;
