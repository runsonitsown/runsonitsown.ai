import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GateMotion } from "@/components/gate-motion";
import { SpotlightMotion } from "@/components/spotlight-motion";
import { SITE_NAME, SITE_URL } from "@/config/site";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const archivo = Archivo({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: "500",
  subsets: ["latin"],
  variable: "--font-utility",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Find the work AI could already be doing`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Find where your business is leaking time, then get the right AI tools set up without the homework.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Analytics />
        <GateMotion />
        <SpotlightMotion />
      </body>
    </html>
  );
}
