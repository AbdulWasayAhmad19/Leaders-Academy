"use client";

import { MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useState, type FormEvent } from "react";
import { classes, subjects } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Mode = "home" | "online" | "either";
type Fields = { level: string; subjects: string[]; mode: Mode; parent: string; notes: string };
type Errors = Partial<Record<"level" | "subjects" | "parent", string>>;

const inputClass =
  "mt-2 block h-12 w-full rounded-md border border-border bg-card px-4 text-base text-card-foreground placeholder:text-muted-foreground/70 transition-colors duration-200 focus:border-ring";

function validate(f: Fields, compact: boolean): Errors {
  const e: Errors = {};
  if (!f.level) e.level = "Choose the student's class.";
  if (f.subjects.length === 0) e.subjects = "Pick at least one subject.";
  if (!compact && !f.parent.trim()) e.parent = "Enter your name so we know who to address.";
  return e;
}

/** Composes the WhatsApp message from the form. This is the whole "backend". */
function composeMessage(f: Fields) {
  const level = classes.find((c) => c.slug === f.level);
  const subjectNames = f.subjects.map((s) => subjects.find((x) => x.slug === s)?.name ?? s).join(", ");
  const mode = f.mode === "home" ? "Home tutoring" : f.mode === "online" ? "Online classes" : "Home or online";
  const lines = [
    `Hello ${site.name}, I'd like to book a free trial class.`,
    `Class: ${level ? level.name + (level.detail ? ` (${level.detail})` : "") : f.level}`,
    `Subjects: ${subjectNames}`,
    `Mode: ${mode}`,
    f.parent && `Name: ${f.parent}`,
    f.notes && `Notes: ${f.notes}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function TrialForm({ compact = false }: { compact?: boolean }) {
  const params = useSearchParams();
  const id = useId();
  const presetLevel = params.get("class") ?? "";
  const presetSubject = params.get("subject") ?? "";

  const [fields, setFields] = useState<Fields>({
    level: classes.some((c) => c.slug === presetLevel) ? presetLevel : "",
    subjects: subjects.some((s) => s.slug === presetSubject) ? [presetSubject] : [],
    mode: "either",
    parent: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  // Course and subject tiles link here with ?class= / ?subject=; apply them whenever they change.
  useEffect(() => {
    setFields((f) => ({
      ...f,
      level: classes.some((c) => c.slug === presetLevel) ? presetLevel : f.level,
      subjects: subjects.some((s) => s.slug === presetSubject) && !f.subjects.includes(presetSubject) ? [...f.subjects, presetSubject] : f.subjects,
    }));
  }, [presetLevel, presetSubject]);

  const update = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (k in errors) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const toggleSubject = (slug: string) =>
    update("subjects", fields.subjects.includes(slug) ? fields.subjects.filter((s) => s !== slug) : [...fields.subjects, slug]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate(fields, compact);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    window.open(whatsappLink(composeMessage(fields)), "_blank", "noopener,noreferrer");
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form onSubmit={onSubmit} noValidate className={cn("grid", compact ? "gap-5" : "gap-6")}>
      {errorCount > 0 && (
        <div role="alert" className="rounded-md border-l-4 border-destructive bg-destructive/5 px-4 py-3 text-sm">
          {errorCount === 1 ? "One field needs attention." : `${errorCount} fields need attention.`} They&rsquo;re marked below.
        </div>
      )}

      {/* Class */}
      <div>
        <label htmlFor={`${id}-level`} className="text-sm font-semibold">Student&rsquo;s class</label>
        <select
          id={`${id}-level`}
          name="level"
          value={fields.level}
          onChange={(e) => update("level", e.target.value)}
          aria-invalid={!!errors.level}
          aria-describedby={errors.level ? `${id}-level-error` : undefined}
          className={cn(inputClass, "appearance-none", errors.level && "border-destructive")}
        >
          <option value="">Select a class</option>
          {classes.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}{c.detail ? ` — ${c.detail}` : ""}</option>
          ))}
        </select>
        {errors.level && <p id={`${id}-level-error`} className="mt-2 text-sm font-semibold text-destructive">{errors.level}</p>}
      </div>

      {/* Subjects */}
      <fieldset>
        <legend id={`${id}-subjects`} tabIndex={-1} className="text-sm font-semibold">Subjects</legend>
        <div className="mt-2 flex flex-wrap gap-2" aria-describedby={errors.subjects ? `${id}-subjects-error` : undefined}>
          {subjects.map((s) => {
            const on = fields.subjects.includes(s.slug);
            return (
              <label
                key={s.slug}
                className={cn(
                  "inline-flex h-10 cursor-pointer select-none items-center rounded-md border px-3.5 text-sm font-semibold transition-colors duration-200",
                  on ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card text-card-foreground hover:bg-muted",
                )}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleSubject(s.slug)} name="subjects" value={s.slug} />
                {s.name}
              </label>
            );
          })}
        </div>
        {errors.subjects && <p id={`${id}-subjects-error`} className="mt-2 text-sm font-semibold text-destructive">{errors.subjects}</p>}
      </fieldset>

      {/* Mode */}
      <fieldset>
        <legend className="text-sm font-semibold">Where should classes happen?</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {([
            { value: "home", label: "At home" },
            { value: "online", label: "Online" },
            { value: "either", label: "Either" },
          ] as { value: Mode; label: string }[]).map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex h-11 cursor-pointer items-center justify-center rounded-md border text-sm font-semibold transition-colors duration-200",
                fields.mode === opt.value ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-card hover:bg-muted",
              )}
            >
              <input type="radio" name="mode" value={opt.value} className="sr-only" checked={fields.mode === opt.value} onChange={() => update("mode", opt.value)} />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      {!compact && (
        <>
          <div>
            <label htmlFor={`${id}-parent`} className="text-sm font-semibold">Your name</label>
            <input
              id={`${id}-parent`}
              name="parent"
              type="text"
              autoComplete="name"
              value={fields.parent}
              onChange={(e) => update("parent", e.target.value)}
              aria-invalid={!!errors.parent}
              aria-describedby={errors.parent ? `${id}-parent-error` : undefined}
              className={cn(inputClass, errors.parent && "border-destructive")}
            />
            {errors.parent && <p id={`${id}-parent-error`} className="mt-2 text-sm font-semibold text-destructive">{errors.parent}</p>}
          </div>
          <div>
            <label htmlFor={`${id}-notes`} className="text-sm font-semibold">
              Anything we should know? <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <textarea
              id={`${id}-notes`}
              name="notes"
              rows={4}
              placeholder="Exam dates, topics that are hard right now, preferred timings"
              value={fields.notes}
              onChange={(e) => update("notes", e.target.value)}
              className={cn(inputClass, "h-auto py-3 leading-relaxed")}
            />
          </div>
        </>
      )}

      <div className={cn("flex flex-col gap-3", !compact && "sm:flex-row sm:items-center sm:justify-between")}>
        <button
          type="submit"
          className={cn(
            "group inline-flex h-12 cursor-pointer touch-manipulation select-none items-center justify-center gap-2 rounded-md bg-cta px-7 text-base font-semibold text-cta-foreground shadow-[0_8px_20px_-10px_rgb(var(--cta))] transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cta/90 hover:shadow-[0_14px_28px_-12px_rgb(var(--cta))] active:translate-y-0 active:scale-[0.97] active:shadow-none",
            compact && "w-full",
          )}
        >
          Submit
          <MessageCircle className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
        <p className="text-sm text-muted-foreground">Submitting opens WhatsApp with your request ready to send.</p>
      </div>
    </form>
  );
}
