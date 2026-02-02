import { getPage } from "@/lib/content";
import { getPrevNext } from "@/lib/docs";
import { getGitLastUpdated, formatDateCH } from "@/lib/git";
import { notFound } from "next/navigation";

type Params = { slug: string };

export async function generateStaticParams() {
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

  // Last-updated (best effort)
  const rel = `content/docs/${slug}.md`;
  const lastIso = getGitLastUpdated(rel);
  const lastLabel = lastIso ? formatDateCH(lastIso) : null;

  return (
    <article className="pageContent">
      <header className="pageHeader">
        <p className="pageKicker">
          <a href="/docs" className="link">Docs</a>
          <span style={{ opacity: 0.6 }}> › </span>
          {page.title}
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h1 className="pageTitle">{page.title}</h1>
          {lastLabel ? (
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
              Zuletzt aktualisiert: {lastLabel}
            </div>
          ) : null}
        </div>

        {page.description ? <p className="pageLead">{page.description}</p> : null}
      </header>

      <section className="section">
        <div className="card">
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </section>

      {(prev || next) && (
        <section className="section">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              {prev ? (
                <a href={`/docs/${prev.slug}`} className="card" style={{ display: "block", textDecoration: "none" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>← Zurück</div>
                  <div style={{ fontWeight: 900 }}>{prev.title}</div>
                  {prev.description ? (
                    <div style={{ marginTop: 6, color: "var(--muted)" }}>{prev.description}</div>
                  ) : null}
                </a>
              ) : (
                <div />
              )}
            </div>

            <div>
              {next ? (
                <a href={`/docs/${next.slug}`} className="card" style={{ display: "block", textDecoration: "none", textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Weiter →</div>
                  <div style={{ fontWeight: 900 }}>{next.title}</div>
                  {next.description ? (
                    <div style={{ marginTop: 6, color: "var(--muted)" }}>{next.description}</div>
                  ) : null}
                </a>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
