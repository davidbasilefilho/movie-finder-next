import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "./ui/button";

export function NotFound({ children }: { children }) {
	const navigate = useNavigate();

	return (
		<div className="space-y-2 p-2">
			<div className="text-gray-600 dark:text-gray-400">
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p className="flex items-center gap-2 flex-wrap">
				<Button
					type="button"
					onClick={() => navigate({ to: ".." })}
					className="bg-emerald-500 text-foreground px-2 py-1 rounded uppercase font-black text-sm"
				>
					Go back
				</Button>
				<Link
					to="/"
					className="bg-cyan-600 text-foreground px-2 py-1 rounded uppercase font-black text-sm"
				>
					Start Over
				</Link>
			</p>
		</div>
	);
}
