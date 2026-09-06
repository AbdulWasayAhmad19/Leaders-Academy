import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { message?: string; children?: ReactNode; className?: string; size?: "md" | "lg"; variant?: "accent" | "outline" };

/* The primary conversion action across the site: opens a WhatsApp chat with a pre-filled message. */
export function WhatsAppButton({ message, children = "Chat on WhatsApp", className, size = "md", variant = "accent" }: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200",
        variant === "accent" ? "bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90" : "border border-border text-foreground hover:bg-muted",
        size === "lg" ? "h-12 px-6 text-base" : "h-11 px-5 text-sm",
        className,
      )}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {children}
    </a>
  );
}
