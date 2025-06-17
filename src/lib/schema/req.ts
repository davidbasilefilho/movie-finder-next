import z from "zod/v4";

export const findMovieRequestSchema = z.object({
  id: z.number({ error: "Invalid number" }).int({ error: "Not an integer" }),
});

export type FindMovieByIdRequest = z.infer<typeof findMovieRequestSchema>;

export const findPopularMoviesRequestSchema = z.object({
  page: z
    .number({ error: "Invalid number" })
    .int({ error: "Not an integer" })
    .optional()
    .default(1),
});

export type FindPopularMoviesRequest = z.infer<
  typeof findPopularMoviesRequestSchema
>;

export const searchSchema = z.object({
  query: z.string({ error: "Invalid string" }),
  include_adult: z.boolean({ error: "Invalid boolean" }),
  primary_release_year: z.string({ error: "Invalid string" }),
  page: z
    .number({ error: "Invalid number" })
    .int({ error: "Not an integer" })
    .positive({ error: "Must be a positive integer" })
    .default(1)
    .nonoptional(),
  region: z.string({ error: "Invalid string" }),
  year: z.string({ error: "Invalid string" }),
});

export type SearchSchema = z.infer<typeof searchSchema>;
