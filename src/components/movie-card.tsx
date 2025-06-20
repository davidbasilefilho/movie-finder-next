import { StarFilledIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { formatDate, parse as parseDate } from "date-fns";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Movie } from "@/lib/schema/res";
import { getLanguageName } from "@/lib/utils";

export default function MovieCard({ movie }: { movie: Movie }) {
	const [isHovered, setIsHovered] = useState(false);
	const maxOverviewLength = 150;

	return (
		<div
			className="rounded-3xl bg-card border text-card-foreground shadow h-full overflow-hidden flex flex-col"
			key={movie!.id}
		>
			<Link
				to="/movie/$id"
				params={{ id: movie!.id! }}
				className="aspect-[2/3] *:aspect-[2/3] w-full mb-4 overflow-hidden **:overflow-hidden"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="relative">
					<AnimatePresence>
						<motion.div
							key={`${movie.id}-poster`}
							className="w-full h-full overflow-hidden"
							initial={{ scale: 1 }}
							animate={{
								scale: isHovered ? 1.05 : 1,
								transition: { duration: 0.3, ease: "easeInOut" },
							}}
						>
							<img
								src={
									movie!.poster_path
										? `https://image.tmdb.org/t/p/w500/${movie!.poster_path}`
										: "/no-poster.png"
								}
								alt={`Poster of "${movie!.title}"`}
								className="w-full h-full object-cover"
							/>
						</motion.div>

						{isHovered && (
							<motion.div
								key={`${movie.id}-overlay`}
								className="absolute inset-0 bg-black/80 hover:backdrop-blur-sm p-6 text-foreground flex flex-col"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.3, ease: "circInOut" }}
							>
								<motion.p
									className="text-lg font-semibold line-clamp-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2, duration: 0.3, ease: "circInOut" }}
								>
									{movie!.title}
								</motion.p>
								<motion.p
									className="text-sm font-normal leading-relaxed mt-2 h-3/5 overflow-y-auto pr-1"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4, duration: 0.3, ease: "circInOut" }}
								>
									{movie!.overview!.length > maxOverviewLength
										? `${movie!.overview!.slice(0, maxOverviewLength)}...`
										: movie!.overview}
								</motion.p>
								<motion.p
									className="text-base font-medium mt-auto"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.6, duration: 0.3, ease: "circInOut" }}
								>
									See details
								</motion.p>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</Link>

			<div className="flex flex-col justify-center space-y-1.5 flex-grow px-5 pb-5">
				<h3 className="text-xl font-semibold line-clamp-2 leading-tight">
					{movie!.title}
				</h3>
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
					<span className="inline-flex items-center space-x-0.5">
						<motion.div
							transition={{ type: "spring", duration: 2 }}
							whileHover={{ scale: 1.1 }}
							whileTap={{ rotate: 1080, scale: 0.9 }}
						>
							<StarFilledIcon className="w-4 h-4 text-amber-400" />
						</motion.div>
						<span className="font-semibold">
							{movie!.vote_average ? movie!.vote_average.toFixed(1) : "N/A"}
						</span>
					</span>

					<span>•</span>

					<span className="text-muted-foreground">
						{getLanguageName(movie!.original_language ?? "en")}
					</span>

					{movie!.release_date && (
						<>
							<span>•</span>
							<span className="text-muted-foreground">
								{formatDate(
									parseDate(movie!.release_date, "y-MM-d", new Date()),
									"MM/d/y",
								)}
							</span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
