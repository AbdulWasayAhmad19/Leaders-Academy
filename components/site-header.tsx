"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  // Close the menu on navigation and lock scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  const close = () => setOpen(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-muted",
                  active ? "text-foreground underline decoration-accent decoration-2 underline-offset-8" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href="#book-trial" variant="cta" className="hidden sm:inline-flex">
            Book a free trial
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border transition-colors duration-200 hover:bg-muted md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id={menuId}
        hidden={!open}
        className="border-t border-border bg-background md:hidden"
      >
        <nav aria-label="Main mobile" className="container flex flex-col py-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="rounded-md px-3 py-3 text-base font-medium transition-colors duration-200 hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="#book-trial" size="lg" variant="cta" className="mt-3">
            Book a free trial
          </ButtonLink>
          <WhatsAppButton variant="outline" size="lg" className="mt-3" message="Hello Leaders Academy, I'd like to know more about tutoring." />
        </nav>
      </div>
    </header>
  );
}
