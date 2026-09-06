import {
  Atom, BookOpen, Calculator, ClipboardCheck, Code2, Dna, FileText, FlaskConical, Gift, Laptop, Lightbulb,
  MessageSquare, Microscope, Target, TrendingUp, Trophy, type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

/* Central icon map so data files stay serialisable strings. */
export const icons: Record<string, ComponentType<LucideProps>> = {
  calculator: Calculator,
  atom: Atom,
  flask: FlaskConical,
  dna: Dna,
  code: Code2,
  book: BookOpen,
  microscope: Microscope,
  lightbulb: Lightbulb,
  target: Target,
  clipboard: ClipboardCheck,
  file: FileText,
  trending: TrendingUp,
  message: MessageSquare,
  trophy: Trophy,
  laptop: Laptop,
  gift: Gift,
};
