# Movie Finder Next

A movie discovery application built with React, Vite, TanStack Router, and The Movie Database (TMDB) API. Search for movies, explore trending and popular titles, and view detailed information.

## Features

- Search for movies by title with filters (year, region, adult content)
- Browse popular and trending movies
- View detailed information for each movie (overview, release date, rating)
- Responsive, modern UI built with Radix UI and Tailwind CSS
- Robust data fetching and caching with React Query
- Type-safe server functions using ArkType and TanStack React Start

## Tech Stack
This tech stack is focused on performance and developer experience (full stack type-safety, convenient server functions, and modern tooling).

- **Framework:** Tanstack Start, Vite, React, TypeScript, Bun
- **Routing:** TanStack React Router
- **Data Fetching:** React Query (@tanstack/react-query)
- **Styling:** Tailwind CSS, Radix UI components, clsx
- **Animations:** Motion
- **Other libraries:** Biome for linting and formatting, husky for git hooks, ArkType for schema validation

## Roadmap

This section lists features planned for future releases. Some enhancements are not currently possible due to third-party library limitations.

- **React Compiler support**: Enable React Compiler for improved performance. This is currently blocked because `@motion/react` is not yet compatible with the React Compiler.

## Prerequisites

- Bun (>= 1.2)
- TMDB API Key

## Getting Started

1. Clone the repository:

   ```powershell
   git clone https://github.com/davidbasilefilhoo/movie-finder-next.git
   cd movie-finder-next
   ```

2. Install dependencies:

   ```powershell
   bun i
   ```

3. Create a `.env.local` file in the project root with the following content:

   ```env
   TMDB_API_KEY=your_tmdb_api_key
   ```

4. Start the development server:

   ```powershell
   bun dev
   ```

   The app will be available at `http://localhost:3000`.

## Available Scripts

- `bun dev` - Start the development server
- `bun run build` - Build the app for production
- `bun generate` - Generate route tree (used by TanStack Router)
- `bun watch` - Watch for route tree changes

## Project Structure

```
├── public/               Static assets (e.g., images)
├── src/
│   ├── components/       Reusable UI components and boundaries
│   ├── lib/              API utilities, schema definitions, server functions
│   ├── routes/           Page-level route components
│   ├── router.tsx        Router configuration
│   └── styles/           Global and component CSS
├── tests/                Component and UI tests
├── vitest.config.ts      Test configuration (if applicable)
├── tsconfig.json         TypeScript configuration
└── package.json          Project metadata and scripts
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for bug fixes and new features.

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.