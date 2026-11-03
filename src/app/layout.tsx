import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ScrollTriggerSync } from "@/components/animations/ScrollTriggerSync";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const description = `${profile.fullName} is a multidisciplinary developer and designer in ${profile.location}, working across software, cybersecurity, AI and creative design. ${profile.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.fullName} — ${profile.tagline}`,
    template: `%s | ${profile.fullName}`,
  },
  description,
  applicationName: profile.fullName,
  authors: [{ name: profile.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.fullName,
    title: `${profile.fullName} — ${profile.tagline}`,
    description,
    url: "/",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.tagline}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      id="top"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available so the hero can pre-hide for its intro. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-paper text-ink">
        <a
          href="#main"
          className="fixed left-4 top-3 z-[80] -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <ScrollTriggerSync />
        <ScrollProgress />
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-1 pt-[var(--header-h)] outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
