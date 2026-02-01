import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
  const now = new Date();

  const contentUrls = getAllSlugs().map(({ section, slug }) => ({
    url: `${base}/${section}/${slug}`,
    lastModified: now,
  }));

  return [
    { url: base, lastModified: now },
    ...contentUrls,
  ];
}
