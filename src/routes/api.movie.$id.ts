import { createServerFileRoute } from "@tanstack/react-start/server";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute("/api/movie/$id").methods({
  GET: async ({ params }) => {
    const { id } = params;

    console.info(`Fetching movie by id=${id}...`);
    const url = `https://api.themoviedb.org/3/find/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    };

    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        return new Response(`Error fetching movie data: ${res.statusText}`, {
          status: res.status,
        });
      }
      const data = await res.json();
      return json(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return new Response("Failed to fetch movie data", {
        status: 500,
      });
    }
  },
});
