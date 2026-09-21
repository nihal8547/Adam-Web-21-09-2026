import type { Metadata, Viewport } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/content/site";
import WhatsAppWidget from "@/components/WhatsAppWidget";

/**
 * Self-hosted via next/font — no render-blocking Google Fonts request.
 * 2 families / 4 weights total to respect the performance budget.
 */
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Adam Technical Services | Fire Protection & MEP in Qatar",
    template: "%s | Adam Technical Services",
  },
  description: site.description,
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.group,
  formatDetection: { telephone: true, email: true, address: true },
  manifest: "/manifest.webmanifest",
  category: "Fire Protection & MEP Contractor",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "512x512" }],
    shortcut: [{ url: "/favicon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${sora.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
