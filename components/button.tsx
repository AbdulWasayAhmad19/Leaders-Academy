import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "cta" | "outline" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  cta: "bg-cta text-cta-foreground font-semibold hover:bg-cta/90",
  white: "bg-white text-[#0B2D5B] font-semibold hover:bg-white/90",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

type SharedProps = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: SharedProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: SharedProps & { href: string } & Omit<ComponentProps<typeof Link>, "className" | "children" | "href">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </Link>
  );
}
