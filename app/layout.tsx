import type { Metadata, Viewport } from "next";
import { display, sans } from "@/app/fonts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Preloader } from "@/components/preloader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { Suspense } from "react";
import { site } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Home & online tutors for all classes`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    url: site.url,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F3A" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes sets the class on <html> before hydration.
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Suspense fallback={null}>
            <MotionProvider>
              <Preloader />
              <SiteHeader />
              <main id="main" className="flex-1">
                {children}
              </main>
              <SiteFooter />
              <WhatsAppFloat />
            </MotionProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
