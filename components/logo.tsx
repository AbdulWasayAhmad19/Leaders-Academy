import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return <Image src="/logo-mark.png" alt="" width={408} height={554} priority className={cn("h-11 w-auto", className)} />;
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3 rounded-md", className)} aria-label="Leaders Academy home">
      <LogoMark />
      <span className="leading-none">
        <span className="block font-display text-lg font-bold uppercase tracking-wide text-primary dark:text-foreground">
          Leaders Academy
        </span>
        <span className="mt-1 hidden text-[0.72rem] font-semibold text-muted-foreground sm:block">{site.taglineLine}</span>
      </span>
    </Link>
  );
}
