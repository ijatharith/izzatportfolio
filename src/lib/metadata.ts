import type { Metadata } from "next";
import { profile } from "@/data/profile";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Social preview image. Defaults to the site-wide card (app/opengraph-image). */
  image?: { url: string; width: number; height: number; alt: string };
}

/** The generated site-wide social card (app/opengraph-image.tsx). */
const defaultImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.fullName} — ${profile.tagline}`,
};

/**
 * Builds per-page metadata with canonical URL, Open Graph and Twitter tags.
 * A page's `openGraph` replaces the root one entirely, so the preview image
 * must be set here — otherwise shared links show no picture.
 */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const img = image ?? defaultImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${profile.fullName}`,
      description,
      url: path,
      siteName: profile.fullName,
      type: "website",
      locale: "en_MY",
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${profile.fullName}`,
      description,
      images: [img.url],
    },
  };
}
