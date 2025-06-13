export function Footer() {
  return (
    <footer className="text-foreground py-8 text-right flex justify-center border-t mt-8">
      <div className="container px-4">
        <p>
          &copy; {new Date().getFullYear()} Basile Movie Finder. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
