import { Footer } from "@/components/footer";
import { Search, Send } from "lucide-react";
import { QueryInput } from "@/components/query-input";
import { Clapperboard } from "lucide-react";
import { useAppForm } from "@/components/ui/tanstack-form";
import { zodValidator } from "@tanstack/zod-adapter";
import MovieCard from "@/components/movie-card";
import { popularMoviesQueryOptions } from "@/lib/query/options";
import { findPopularMoviesResponseSchema } from "@/lib/schema/res";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { searchSchema } from "@/lib/schema/req";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(popularMoviesQueryOptions(1));
  },
});

function Home() {
  const parentRef = useRef<HTMLDivElement>(null);
  const popularMoviesQuery = useSuspenseQuery(popularMoviesQueryOptions(1));
  const navigate = useNavigate();
  const form = useAppForm({
    validators: { onChange: searchSchema },
    onSubmit: ({ value }) => {
      const { query, include_adult, primary_release_year, page, region, year } =
        value;
      console.log("Form submitted with values:", value);
      navigate({
        to: "/search",
        search: {
          query,
          include_adult,
          primary_release_year,
          page,
          region,
          year,
        },
      });
    },

    defaultValues: {
      query: "",
      include_adult: false,
      primary_release_year: "",
      page: 1,
      region: "",
      year: "",
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );

  return (
    <main>
      <div className="p-8 md:p-12 lg:p-16 pb-6 md:pb-10 lg:pb-14">
        <div className="flex w-full items-center justify-center flex-col gap-8">
          <h1 className="text-center inline-block">
            Find{" "}
            <div className="inline-block">
              <Clapperboard className="md:w-10 md:h-10 w-8 h-8 leading-12 md:leading-14 lg:leading-14 align-top inline-block mr-0.5 stroke-foreground" />
              <AnimatedGradientText
                colorFrom="var(--primary)"
                colorTo="var(--destructive)"
              >
                Movies
              </AnimatedGradientText>
            </div>{" "}
            without a hassle
          </h1>
          <form.AppForm>
            <form onSubmit={handleSubmit} className="w-full max-w-96">
              <form.AppField
                name="query"
                children={(field) => (
                  <field.FormItem>
                    <field.FormControl>
                      <div className="relative">
                        <QueryInput
                          placeholder="Search through thousands of movies..."
                          className="w-full py-6 pl-10 pr-4 rounded outline-none bg-input transition-all duration-300"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      </div>
                    </field.FormControl>
                  </field.FormItem>
                )}
              />
            </form>
          </form.AppForm>
        </div>
      </div>

      <div
        ref={parentRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-0 container mx-auto"
      >
        {popularMoviesQuery.data.results.map((movie) => (
          <div key={movie.id}>{movie.id && <MovieCard movie={movie} />}</div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
