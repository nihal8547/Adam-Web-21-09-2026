import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/seo";
import { site } from "@/content/site";
import WhatsAppWidget from "@/components/WhatsAppWidget";

/**
 * The site uses the standard system font stack everywhere (set in globals.css)
 * — no render-blocking webfont request. Nunito is loaded only for the welcome
 * splash screen shown on load.
 */
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nunito",
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
      { url: "/LogoBT.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/LogoBT.png", sizes: "180x180", type: "image/png" }],
    shortcut: [{ url: "/LogoBT.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={nunito.variable}>
      <body>
        <JsonLd data={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
        <SplashScreen />
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
