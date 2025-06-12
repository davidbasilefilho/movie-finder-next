// src/routes/index.tsx
import MovieCard from "@/components/movie-card";
import { Card, CardFooter } from "@/components/ui/card";
import { popularMoviesQueryOptions } from "@/lib/query/options";
import { findPopularMoviesResponseSchema } from "@/lib/schema/res";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search) => findPopularMoviesResponseSchema.parse(search),
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(popularMoviesQueryOptions(1));
  },
});

function Home() {
  const parentRef = useRef<HTMLDivElement>(null);
  const popularMoviesQuery = useSuspenseQuery(popularMoviesQueryOptions(1));

  return (
    <main>
      <div
        ref={parentRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 container mx-auto"
      >
        {popularMoviesQuery.data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
