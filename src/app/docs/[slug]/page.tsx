import { getPage } from "@/lib/content";
import { getPrevNext } from "@/lib/docs";
import { getGitLastUpdated, formatDateCH } from "@/lib/git";
import { notFound } from "next/navigation";

type Params = { slug: string };

export async function generateStaticParams() {
  // docs slugs are derived from content/docs/*.md
  const { getDocsNav } = await import("@/lib/docs");
  return getDocsNav().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getPage("docs", slug);
  if (!page) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${base}/docs/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${base}/docs/${slug}`,
      type: "article",
    },
  };
}

export default async function DocPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  const page = await getPage("docs", slug);
  if (!page) return notFound();

  const { prev, next } = getPrevNext(slug);
  // Last-updated (best effort) and edit link
  const rel = `content/docs/${slug}.md`;
  const lastIso = getGitLastUpdated(rel);
  const lastLabel = lastIso ? formatDateCH(lastIso) : null;

  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
  const branch = process.env.NEXT_PUBLIC_GITHUB_BRANCH || "main";
  const editUrl = repo ? `https://github.com/${repo}/edit/${branch}/content/docs/${slug}.md` : null;

  return (
    <article style={{ maxWidth: 980, margin: "0 auto" }}>
      {/* Breadcrumb + meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.75 }}>
          <a href="/docs" style={{ textDecoration: "none" }}>Docs</a>
          <span style={{ padding: "0 6px" }}>›</span>
          <span>{page.title}</span>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 13, opacity: 0.8 }}>
          {lastLabel ? <span>Last updated: {lastLabel}</span> : null}
          {editUrl ? (
            <a href={editUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              Edit this page
            </a>
          ) : null}
        </div>
      </div>

      <h1 style={{ marginTop: 0 }}>{page.title}</h1>
      <p style={{ opacity: 0.75 }}>{page.description}</p>

      <div dangerouslySetInnerHTML={{ __html: page.html }} />

      {/* Prev / Next */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginTop: 32,
          paddingTop: 18,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div>
          {prev ? (
            <a
              href={`/docs/${prev.slug}`}
              style={{
                display: "block",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
                padding: 14,
                textDecoration: "none",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>← Zurück</div>
              <div style={{ fontWeight: 800 }}>{prev.title}</div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>{prev.description}</div>
            </a>
          ) : (
            <div />
          )}
        </div>

        <div>
          {next ? (
            <a
              href={`/docs/${next.slug}`}
              style={{
                display: "block",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 12,
                padding: 14,
                textDecoration: "none",
                textAlign: "right",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 6 }}>Weiter →</div>
              <div style={{ fontWeight: 800 }}>{next.title}</div>
              <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>{next.description}</div>
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
