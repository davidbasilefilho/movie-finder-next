import { Spinner } from "./ui/loading-spinner";

export function Loading() {
  return (
    <div className="fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center bg-background/50 z-50">
      <Spinner size={"large"} />
    </div>
  );
}
