"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes resolves the theme on the client; render a neutral button until then
  // so server and client markup match.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors duration-200 hover:bg-muted",
        className,
      )}
    >
      {mounted ? (
        isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
