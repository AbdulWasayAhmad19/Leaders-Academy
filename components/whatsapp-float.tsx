"use client";

import Image from "next/image";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const quickReplies = [
  { label: "Book a free trial", message: "Hello Leaders Academy, I'd like to book a free trial class." },
  { label: "Home tutoring", message: "Hello Leaders Academy, I'm interested in home tutoring. Which areas do you cover?" },
  { label: "Online classes", message: "Hello Leaders Academy, I'd like to know about online classes and timings." },
  { label: "Fees and 25% offer", message: "Hello Leaders Academy, could you share your fees and how the 25% offer works?" },
];

/* WhatsApp chat widget: a floating button (bottom-left, every page) that opens a small chat panel with a greeting,
   quick replies and a message box. Anything sent opens WhatsApp with the text ready. */
export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [nudge, setNudge] = useState(false);
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  // A gentle hint bubble after a few seconds on first visit, cleared once the widget is used.
  useEffect(() => {
    if (sessionStorage.getItem("la-chat-seen")) return;
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (open) {
      setNudge(false);
      sessionStorage.setItem("la-chat-seen", "1");
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const send = (message: string) => {
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const m = text.trim();
    if (!m) return;
    send(`Hello Leaders Academy, ${m}`);
    setText("");
  };

  return (
    <>
      {/* Chat panel */}
      <div
        id={panelId}
        role="dialog"
        aria-label="Chat with Leaders Academy on WhatsApp"
        aria-hidden={!open}
        className={cn(
          "fixed bottom-24 left-4 z-50 w-[min(24rem,calc(100vw-2rem))] origin-bottom-left overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/25 transition-[opacity,transform] duration-300 ease-out",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white">
            <Image src="/logo-mark.png" alt="" width={176} height={302} className="h-8 w-auto" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold">{site.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full bg-whatsapp" aria-hidden="true" />
              Online · replies within minutes
            </p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/15">
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3 bg-[#ECE5DD] p-4 dark:bg-[#0F1B2D]">
          <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-[#0B1F3A] shadow-sm dark:bg-card dark:text-card-foreground">
            <p className="font-semibold">Hi there 👋</p>
            <p className="mt-1">Welcome to Leaders Academy. Looking for a home or online tutor? Pick an option or type a message and we&rsquo;ll continue on WhatsApp.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => send(q.message)}
                className="cursor-pointer touch-manipulation rounded-full border border-[#075E54]/30 bg-white px-3.5 py-2 text-sm font-semibold text-[#075E54] transition-[transform,background-color] duration-200 hover:bg-[#075E54] hover:text-white active:scale-95 dark:border-whatsapp/40 dark:bg-card dark:text-whatsapp dark:hover:bg-whatsapp dark:hover:text-whatsapp-foreground"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
          <label htmlFor={`${panelId}-msg`} className="sr-only">Your message</label>
          <input
            id={`${panelId}-msg`}
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message"
            className="h-11 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-ring"
          />
          <button
            type="submit"
            aria-label="Send on WhatsApp"
            className="flex h-11 w-11 shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <SendHorizontal className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Nudge bubble */}
      <div
        className={cn(
          "fixed bottom-7 left-24 z-50 max-w-[14rem] rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground shadow-lg transition-[opacity,transform] duration-300",
          nudge && !open ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-2 opacity-0",
        )}
        aria-hidden={!(nudge && !open)}
      >
        Questions? Chat with us on WhatsApp
      </div>

      {/* Floating button */}
      <Magnetic className="fixed bottom-5 left-5 z-50 inline-flex" strength={0.2}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close WhatsApp chat" : `Chat with Leaders Academy on WhatsApp, ${site.whatsappDisplay}`}
          className="group relative flex h-14 w-14 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg shadow-black/25 transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-whatsapp/90 active:scale-95"
        >
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.4s] motion-reduce:hidden" aria-hidden="true" />
          {open ? <X className="h-7 w-7" aria-hidden="true" /> : <MessageCircle className="h-7 w-7" aria-hidden="true" />}
        </button>
      </Magnetic>
    </>
  );
}
