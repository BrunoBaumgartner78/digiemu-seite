import type { MetadataRoute } from "next";
import { getAllPagesMeta } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";

function url(path: string) {
  if (path.startsWith("/")) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ✅ Statische Kernseiten (Marketing/Info)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    { url: url("/municipalities"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/product"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/use-cases"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/docs"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/glossary"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    { url: url("/faq/municipalities"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact/municipalities"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },

    // Rechtliches
    { url: url("/legal/impressum"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/legal/datenschutz"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: url("/legal/agb"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // ✅ Dynamische Content-Routen aus /content/*
  // product: /product/[slug]
  const productPages = getAllPagesMeta("product")
    .filter((p) => p.slug && p.slug !== "index") // index -> /product
    .map<MetadataRoute.Sitemap[number]>((p) => ({
      url: url(`/product/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // use-cases: /use-cases/[slug]
  const useCasePages = getAllPagesMeta("use-cases")
    .filter((p) => p.slug && p.slug !== "index") // index -> /use-cases
    .map<MetadataRoute.Sitemap[number]>((p) => ({
      url: url(`/use-cases/${p.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  // docs: /docs/[slug] via lib/docs getDocsNav()
  let docsPages: MetadataRoute.Sitemap = [];
  try {
    const { getDocsNav } = await import("@/lib/docs");
    const docs = getDocsNav()
      .filter((d: any) => d?.slug) // defensive
      .map<MetadataRoute.Sitemap[number]>((d: any) => ({
        url: url(`/docs/${d.slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));

    docsPages = docs;
  } catch {
    // falls lib/docs nicht verfügbar ist (z.B. in einem Teil-Setup), einfach ohne docs-slugs weiter
    docsPages = [];
  }

  // Duplikate entfernen (falls etwas doppelt reinkommt)
  const all = [...staticRoutes, ...productPages, ...useCasePages, ...docsPages];
  const seen = new Set<string>();
  const deduped = all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return deduped;
}
