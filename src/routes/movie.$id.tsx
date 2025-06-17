import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { createMovieQueryOptions } from "@/lib/query/options";
import { getLanguageName } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { formatDate, parse as parseDate } from "date-fns";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Globe,
  Star,
  TrendingUp,
} from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

const formatReleaseDate = (date: string | undefined) => {
  return date
    ? formatDate(parseDate(date, "y-MM-d", new Date()), "y/MM/d")
    : "N/A";
};

export const Route = createFileRoute("/movie/$id")({
  component: Movie,
  loader: async ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(
      createMovieQueryOptions({ movieId: params.id }),
    );
  },
});

function Movie() {
  const { id } = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {
    data: movie,
    error: movieError,
    isLoading,
    isError,
  } = useSuspenseQuery(createMovieQueryOptions({ movieId: id }));

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {movieError.message}</div>;

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-[50vh]">
        <motion.img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="object-cover w-full h-full shadow-2xl z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent p-4 md:p-8">
          {canGoBack && (
            <div className="bg-muted rounded-full p-2 w-fit hover:scale-[110%] transition-transform duration-200">
              <ArrowLeft
                className="w-6 h-6 text-foreground pointer-events-auto cursor-pointer"
                onClick={() => router.history.back()}
              />
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 py-8 -mt-32 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2 space-y-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-left!">
                {movie.title}
              </h1>
              <p className="text-xl text-gray-300 italic">{movie.tagline}</p>
            </motion.div>

            <motion.div
              className="bg-card border rounded p-4 space-y-4 block md:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="text-yellow-400" />
                  </motion.div>
                  <span className="text-2xl font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {movie.vote_count} votes
                </span>
              </div>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Progress value={movie.vote_average * 10} className="h-2" />
              </motion.div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className=" text-base">{movie.overview}</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Calendar className="text-primary" />
                  </motion.div>
                  <span>{formatReleaseDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Globe className="text-primary" />
                  </motion.div>
                  <span>{getLanguageName(movie.original_language)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="text-primary" />
                  </motion.div>
                  <span>Popularity: {movie.popularity.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <DollarSign className="text-primary" />
                  </motion.div>
                  <span>Budget: {formatCurrency(movie.budget)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <DollarSign className="text-primary" />
                  </motion.div>
                  <span>Revenue: {formatCurrency(movie.revenue)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {movie.adult && (
                    <motion.div>
                      <Badge variant="destructive">Adult film</Badge>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-2xl font-semibold mb-4">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <motion.div
                    key={genre.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Badge variant="secondary" className="text-sm py-1 px-3">
                      {genre.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Building2 className="text-primary" />
                    </motion.div>
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6 w-fit hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="relative h-[400px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="object-cover h-full rounded border select-none"
              />
            </motion.div>

            <motion.div
              className="bg-card border rounded p-4 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star className="text-yellow-400" />
                  </motion.div>
                  <span className="text-2xl font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  {movie.vote_count} votes
                </span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Progress value={movie.vote_average * 10} className="h-2" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
