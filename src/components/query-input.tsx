import * as React from "react";

import { cn } from "@/lib/utils";
import { Divide } from "lucide-react";

function QueryInput({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "flex flex-row justify-between p-3 gap-2 h-fit items-center w-full rounded border border-input bg-background shadow-sm transition-colors file:border-0 file:bg-transparent focus-within:ring-[1.5px] focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
    >
      <input
        type={type}
        data-slot="input"
        className={cn(
          "text-sm md:text-base placeholder:text-sm md:placeholder:text-base bg-transparent ml-2 w-full h-10 rounded file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none",
        )}
        {...props}
      />
    </div>
  );
}

export { QueryInput };
