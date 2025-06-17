import type { Movie } from "@/lib/schema/res";
import { ErrorComponent, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";

export function TrendingMovies({
  movie,
  index,
}: {
  movie: Movie;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (!movie) {
    return <ErrorComponent error={"Movie is not valid"}></ErrorComponent>; // Handle the case where movie is undefined or null
  }

  return (
    <li
      key={movie.id}
      className="min-w-[140px] md:min-w-[180px] flex flex-row items-center"
    >
      <p className="fancy-text mt-[22px] text-nowrap select-none pointer-events-none -ml-2 md:-ml-3">
        {index + 1}
      </p>
      <div className="relative rounded">
        <Link
          to="/movie/$id"
          params={{ id: movie.id!.toString() }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path || "no-poster.png"})`,
            }}
            className={`h-full w-[127px] aspect-[3/4] object-cover bg bg-cover bg-center rounded-lg overflow-hidden`}
            initial={{ scale: 1.0 }}
            animate={{ scale: isHovered ? 1.1 : 1.0 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-white hover:backdrop-blur-xs transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
          >
            <motion.h3
              className="text-base font-semibold text-center"
              initial={{ y: 10 }}
              animate={{ y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, ease: "circInOut" }}
            >
              {movie.title}
            </motion.h3>
          </motion.div>
        </Link>
      </div>
    </li>
  );
}
