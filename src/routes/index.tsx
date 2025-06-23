import { AnimatedGradientIcon } from "@/components/animated-gradient-icon";
import { Footer } from "@/components/footer";
import { Loading } from "@/components/loading";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import MovieCard from "@/components/movie-card";
import { QueryInput } from "@/components/query-input";
import { TrendingMovies } from "@/components/trending-movies";
import { useAppForm } from "@/components/ui/tanstack-form";
import {
	popularMoviesQueryOptions,
	trendingMoviesQueryOptions,
} from "@/lib/options";
import { searchSchema } from "@/lib/schema/req";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clapperboard, Search } from "lucide-react";
import { useCallback, useRef } from "react";

export const Route = createFileRoute("/")({
	component: Home,
	loader: ({ context: { queryClient } }) => {
		return [
			queryClient.ensureQueryData(trendingMoviesQueryOptions()),
			queryClient.ensureQueryData(popularMoviesQueryOptions(1)),
		];
	},
	pendingComponent: () => <Loading />,
});

function Home() {
	const parentRef = useRef<HTMLDivElement>(null);
	const popularMoviesQuery = useSuspenseQuery(popularMoviesQueryOptions(1));
	const trendingMoviesQuery = useSuspenseQuery(trendingMoviesQueryOptions());
	const navigate = useNavigate();
	const form = useAppForm({
		validators: { onChange: searchSchema },
		onSubmit: ({ value }) => {
			console.log("Form submitted with values:", value);
			navigate({
				to: "/search",
				search: value,
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
					<h1 className="text-center inline-block text-4xl md:text-5xl">
						Find{" "}
						<div className="inline-block">
							<AnimatedGradientIcon
								colors={["var(--primary)", "var(--destructive)"]}
								className="md:w-9 md:h-9 w-7 h-7 leading-10 align-baseline inline-block ml-1.5 mr-1"
								duration="4s"
								strokeWidth={2.5}
								icon={Clapperboard}
							/>
							<AnimatedGradientText
								colorFrom="var(--primary)"
								colorTo="var(--destructive)"
							>
								Movies
							</AnimatedGradientText>
						</div>
						<br />
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
										<field.FormMessage />
									</field.FormItem>
								)}
							/>
						</form>
					</form.AppForm>
				</div>
			</div>

			<section>
				<div className="trending px-4 container mx-auto">
					<h2>Trending weekly</h2>
					<ul className="flex flex-row w-full mx-auto px-1 gap-5 md:gap-1 pb-4">
						{trendingMoviesQuery?.data?.results
							?.slice(0, 8)
							.map((movie, index) => (
								<TrendingMovies key={movie.id} movie={movie} index={index} />
							))}
					</ul>
				</div>
			</section>

			<section ref={parentRef} className="p-4 pt-0 container mx-auto">
				<h2 className="mb-4">Popular movies</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{popularMoviesQuery.data.results.map((movie) => (
						<div key={movie.id}>{movie.id && <MovieCard movie={movie} />}</div>
					))}
				</div>
			</section>
			<Footer />
		</main>
	);
}
