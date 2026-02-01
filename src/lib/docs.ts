import { getAllPagesMeta, PageMeta } from "@/lib/content";

export function getDocsNav(): PageMeta[] {
  return getAllPagesMeta("docs");
}

export function getPrevNext(slug: string): { prev: PageMeta | null; next: PageMeta | null } {
  const docs = getDocsNav();
  const idx = docs.findIndex((d) => d.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? docs[idx - 1] : null,
    next: idx < docs.length - 1 ? docs[idx + 1] : null,
  };
}
