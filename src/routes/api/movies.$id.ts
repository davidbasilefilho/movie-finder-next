import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";

export const Route = createFileRoute("/api/movies/$id")({
  loader: async ({ params }) => {
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
        throw new Error(`Error fetching movie data: ${res.statusText}`);
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw new Error("Failed to fetch movie data");
    }
  },
});
