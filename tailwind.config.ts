import type { Config } from "tailwindcss";

// Semantic tokens come from CSS variables in app/globals.css so light and dark
// themes swap without touching components. Channels are stored as "r g b" so
// Tailwind opacity modifiers (bg-primary/10) keep working.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("secondary-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        card: { DEFAULT: token("card"), foreground: token("card-foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        border: token("border"),
        ring: token("ring"),
        cta: { DEFAULT: token("cta"), foreground: token("cta-foreground") },
        whatsapp: { DEFAULT: token("whatsapp"), foreground: token("whatsapp-foreground") },
        destructive: { DEFAULT: token("destructive"), foreground: token("destructive-foreground") },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Type scale (major third) tuned for a serif display face
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.5rem", { lineHeight: "1.25" }],
      },
      maxWidth: { prose: "68ch" },
      transitionDuration: { 200: "200ms", 250: "250ms" },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 500ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
