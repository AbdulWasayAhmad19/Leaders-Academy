import { Nunito_Sans, Outfit } from "next/font/google";

// Display: geometric, confident — echoes the bold caps of the Leaders Academy wordmark.
export const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body: warm, highly legible on phones — most parents will read this on WhatsApp-adjacent screens.
export const sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
