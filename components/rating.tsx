import { Star } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* Five gold stars with the rating and source. `tone` picks colours for dark photo backgrounds. */
export function Rating({ className, tone = "default", size = "md" }: { className?: string; tone?: "default" | "onDark"; size?: "sm" | "md" }) {
  const { value, stars, source } = site.rating;
  return (
    <a
      href={site.location.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${value} out of 5 stars on ${source}, opens Google Maps`}
      className={cn("inline-flex items-center gap-2 rounded-md", className)}
    >
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5", "fill-accent text-accent")} />
        ))}
      </span>
      <span className={cn("text-sm font-bold", size === "sm" && "text-xs", tone === "onDark" ? "text-white" : "text-foreground")}>{value}</span>
      <span className={cn("text-sm", size === "sm" && "text-xs", tone === "onDark" ? "text-white/80" : "text-muted-foreground")}>on {source}</span>
    </a>
  );
}
