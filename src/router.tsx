import {
  dehydrate,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { DefaultCatchBoundary } from "./components/default-catch-boundary";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  const queryClient = new QueryClient();

  return routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      scrollRestoration: true,
      defaultViewTransition: true,
      defaultPreload: "intent",
      defaultSsr: true,
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      context: {
        queryClient,
      },

      dehydrate: () => {
        return {
          queryClientState: dehydrate(queryClient),
        };
      },
      // On the client, hydrate the loader client with the data
      // we dehydrated on the server
      hydrate: (dehydrated) => {
        hydrate(queryClient, dehydrated.queryClientState);
      },
      // Optionally, we can use `Wrap` to wrap our router in the loader client provider
      Wrap: ({ children }) => {
        return (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        );
      },
    }),
    queryClient,
  );
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
