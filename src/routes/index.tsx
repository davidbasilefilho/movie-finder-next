// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => "test",
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return <></>;
}
