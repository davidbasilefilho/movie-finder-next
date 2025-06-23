import type React from "react";
import ReactDOMServer from "react-dom/server";
import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";

type IconComponent = React.ComponentType<LucideProps>;

export function AnimatedGradientIcon({
	icon: Icon,
	className,
	colors = ["#a855f7", "#60a5fa"],
	duration = "3s",
	strokeWidth = 2.5,
	applyTo = "stroke",
}: {
	icon: IconComponent;
	className?: string;
	colors?: string[];
	duration?: string;
	strokeWidth?: number;
	applyTo?: "fill" | "stroke";
}) {
	const iconSvgString = ReactDOMServer.renderToStaticMarkup(
		<Icon
			color="black"
			strokeWidth={strokeWidth}
			fill={applyTo === "fill" ? "black" : "none"}
		/>,
	);

	const maskUrl = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
		iconSvgString,
	)}")`;

	const style = {
		maskImage: maskUrl,
		WebkitMaskImage: maskUrl,
		maskSize: "100% 100%",
		WebkitMaskSize: "100% 100%",
		"--gradient-color-1": colors[0],
		"--gradient-color-2": colors[1] || colors[0],
		"--animation-duration": duration,
	} as React.CSSProperties;

	return (
		<span
			style={style}
			className={cn(
				"inline-block",
				"bg-[length:200%_200%] bg-[linear-gradient(90deg,var(--gradient-color-1),var(--gradient-color-2),var(--gradient-color-1))]",
				"animate-[animated-gradient-scroll_var(--animation-duration)_linear_infinite]",
				className,
			)}
		/>
	);
}
