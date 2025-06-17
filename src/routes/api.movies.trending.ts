import { GET_API_OPTIONS } from "@/lib/const";
import { createServerFileRoute } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute(
  "/api/movies/trending",
).methods({
  GET: async () => {
    console.info(`Fetching trending movies...`);
    const url = `https://api.themoviedb.org/3/movie/trending/week?language=en-US`;

    const res = await fetch(url, GET_API_OPTIONS);
    if (!res.ok) {
      return new Response(`Error fetching trending movies: ${res.statusText}`, {
        status: res.status,
      });
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  },
});
