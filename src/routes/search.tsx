import MovieCard from "@/components/movie-card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import { useAppForm } from "@/components/ui/tanstack-form";
import { createSearchQueryOptions } from "@/lib/query/options";
import { searchSchema } from "@/lib/schema/req";
import { Movie } from "@/lib/schema/res";
import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useCallback, useEffect } from "react";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
  errorComponent: ({ error }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const queryErrorResetBoundary = useQueryErrorResetBoundary();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      queryErrorResetBoundary.reset();
    }, [queryErrorResetBoundary]);

    return (
      <div className="container p-4 mx-auto">
        <Link to={"/"}>
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="min-h-[600px] max-h-dvh flex items-center justify-center">
          <Card>
            <CardHeader>
              <CardTitle>Error!</CardTitle>
              <CardDescription>{error.message}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size={"lg"}
                onClick={() => router.invalidate()}
              >
                Retry
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  },
  validateSearch: (search) => searchSchema(search),
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context: { queryClient }, deps: { search } }) => {
    return queryClient.ensureQueryData(createSearchQueryOptions(search));
  },
});

function SearchComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(createSearchQueryOptions(search));
  const form = useAppForm({
    validators: { onChange: searchSchema },
    onSubmit: ({ value }) =>
      navigate({
        to: "/search",
        search: {
          query: value.query,
          include_adult: value.include_adult,
          primary_release_year: value.primary_release_year,
          page: value.page,
          region: value.region,
          year: value.year,
        },
      }),
    defaultValues: { ...search, query: decodeURI(search.query ?? "") },
  });

  const currentPage = search.page || 1;
  const totalPages = data.total_pages;
  const pageRange = 6; // Number of page buttons to show

  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  if (endPage - startPage + 1 < pageRange) {
    startPage = Math.max(1, endPage - pageRange + 1);
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <div className="px-6 py-4 container mx-auto">
      <h2 className="text-xl md:text-2xl leading-7 font-bold inline-block *:inline-block w-full">
        <Link to="/" className="mr-2 *:inline-block ">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        Search results for "{decodeURI(search.query ?? "")}"
      </h2>

      <form.AppForm {...form}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap *:shrink *:grow gap-2 md:gap-4 mt-4 mb-8 items-end mx-auto bg-card border rounded p-6"
        >
          <form.AppField
            name="query"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel className="ml-2 mb-2">
                  Movie name
                </field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="Search through hundreds of movies..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />

          <form.AppField
            name="year"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel className="ml-2 mb-2">
                  Year of release
                </field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="2020, 1971, etc."
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />

          <form.AppField
            name="primary_release_year"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel className="ml-2 mb-2">
                  Primary release year
                </field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="2021, 1972, etc."
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />

          <form.AppField
            name="include_adult"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel className="ml-2 mb-2">
                  Include adult
                </field.FormLabel>
                <div className="flex flex-row items-center justify-between border rounded-md text-base min-h-9 px-3 py-1 shadow-xs">
                  <field.FormDescription className="mt-0 text-sm leading-4 text-wrap">
                    Include adult films, NSFW, 18+ content, etc.
                  </field.FormDescription>
                  <field.FormControl>
                    <Switch
                      checked={field.state.value}
                      onCheckedChange={(e) => field.handleChange(e)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                </div>
              </field.FormItem>
            )}
          />

          <Button
            type="submit"
            size={"lg"}
            className="*:inline-block mt-4 grow-0! shrink-0! w-fit!"
          >
            <Search className="w-6 h-6" />
            Search
          </Button>
        </form>
      </form.AppForm>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.results.map((movie: Movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>

      <Pagination>
        <PaginationContent className="flex flex-wrap items-center gap-2 m-6">
          <PaginationItem>
            <Link
              to="/search"
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "gap-1 pl-2.5",
              })}
              aria-label="Go to previous page"
              search={(prev) => ({
                ...prev,
                primary_release_year: prev.primary_release_year ?? "",
                region: prev.region || "",
                year: prev.year ?? "",
                query: prev.query!,
                include_adult: prev.include_adult ?? false,
                page: Math.max(1, prev.page ? prev.page - 1 : 1),
              })}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Link>
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <Link
                  to="/search"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  search={(prev) => ({
                    ...prev,
                    primary_release_year: prev.primary_release_year ?? "",
                    region: prev.region || "",
                    year: prev.year ?? "",
                    query: prev.query!,
                    include_adult: prev.include_adult ?? false,
                    page: 1,
                  })}
                >
                  1
                </Link>
              </PaginationItem>
              <PaginationItem key="start-ellipsis">
                <span className="px-2">...</span>
              </PaginationItem>
            </>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => i + startPage
          ).map((i) => (
            <PaginationItem key={i}>
              <Link
                to="/search"
                className={buttonVariants({
                  variant: currentPage === i ? "default" : "outline",
                  size: "icon",
                })}
                search={(prev) => ({
                  ...prev,
                  primary_release_year: prev.primary_release_year ?? "",
                  region: prev.region || "",
                  year: prev.year ?? "",
                  query: prev.query!,
                  include_adult: prev.include_adult ?? false,
                  page: i,
                })}
              >
                {i}
              </Link>
            </PaginationItem>
          ))}

          {endPage < totalPages && (
            <>
              <PaginationItem key="end-ellipsis">
                <span className="px-2">...</span>
              </PaginationItem>
              <PaginationItem>
                <Link
                  to="/search"
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                  search={(prev) => ({
                    ...prev,
                    primary_release_year: prev.primary_release_year ?? "",
                    region: prev.region || "",
                    year: prev.year ?? "",
                    query: prev.query!,
                    include_adult: prev.include_adult ?? false,
                    page: totalPages,
                  })}
                >
                  {totalPages}
                </Link>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <Link
              to="/search"
              search={(prev) => ({
                ...prev,
                primary_release_year: prev.primary_release_year ?? "",
                region: prev.region || "",
                year: prev.year ?? "",
                query: prev.query!,
                include_adult: prev.include_adult ?? false,
                page: Math.min(data.total_pages, (prev.page || 1) + 1),
              })}
              aria-label="Go to next page"
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "gap-1 pr-2.5",
              })}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
