import { getPage } from "@/lib/content";
import { getGitLastUpdated, formatDateCH } from "@/lib/git";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const page = await getPage("about", "index");
  if (!page) return {};
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${base}/about` },
    openGraph: { title: page.title, description: page.description, url: `${base}/about`, type: "article" },
  };
}

export default async function AboutPage() {
  const page = await getPage("about", "index");
  if (!page) return notFound();

  const rel = `content/about/index.md`;
  const lastIso = getGitLastUpdated(rel);
  const lastLabel = lastIso ? formatDateCH(lastIso) : null;

  return (
    <article className="pageContent">
      <header className="pageHeader">
        <p className="pageKicker">Über</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h1 className="pageTitle">{page.title}</h1>
          {lastLabel ? <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>Zuletzt aktualisiert: {lastLabel}</div> : null}
        </div>
        {page.description ? <p className="pageLead">{page.description}</p> : null}
      </header>

      <section className="section">
        <div className="card">
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </section>
    </article>
  );
}
