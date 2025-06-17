import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
  "/api/movies/popular/$page",
).methods({
  GET: async ({ params }) => {
    const { page } = params;
    const pageNumber = page ? parseInt(page, 10) : 1;

    console.info(`Fetching popular movies for page=${pageNumber}...`);
    const url = `https://api.themoviedb.org/3/movie/popular?page=${pageNumber}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    const res = await fetch(url, options);
    if (!res.ok) {
      return new Response(`Error fetching popular movies: ${res.statusText}`, {
        status: res.status,
      });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  },
});
