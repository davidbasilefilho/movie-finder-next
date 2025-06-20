import {
	createMiddleware,
	registerGlobalMiddleware,
} from "@tanstack/react-start";

export const authMiddleware = createMiddleware({ type: "function" }).client(
	async ({ next }) => {
		return next({
			headers: {
				Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
			},
		});
	},
);

registerGlobalMiddleware({
	middleware: [authMiddleware],
});
