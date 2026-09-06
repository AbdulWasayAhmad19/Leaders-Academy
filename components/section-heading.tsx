import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  lede?: string;
  id?: string;
  action?: ReactNode;
  className?: string;
};

/* Section header: rule above, title left, optional lede or action right. Swiss grid, no eyebrows. */
export function SectionHeading({ title, lede, id, action, className }: Props) {
  return (
    <div data-reveal className={cn("rule pt-8 md:pt-10", className)}>
      <div className="grid gap-6 md:grid-cols-12 md:items-start">
        <h2 id={id} className="text-display-md md:col-span-6 lg:col-span-5">
          {title}
        </h2>
        {(lede || action) && (
          <div className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
            {lede && <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">{lede}</p>}
            {action && <div className="mt-4">{action}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
