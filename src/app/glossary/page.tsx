import { getPage } from "@/lib/content";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
  return {
    title: "Glossar",
    description: "Begriffserklärungen rund um DigiEmu.",
    alternates: { canonical: `${base}/glossary` },
    openGraph: {
      title: "Glossar",
      description: "Begriffserklärungen rund um DigiEmu.",
      url: `${base}/glossary`,
      type: "article",
    },
  };
}

export default async function GlossaryPage() {
  // wenn dein Glossar in content/glossary.md liegt:
  // const page = await getPage("pages", "glossary");
  // wenn dein Glossar in content/glossary/index.md liegt:
  // const page = await getPage("glossary", "index");
  // ⚠️ DU musst hier nur den richtigen key/slug setzen wie bei dir üblich.
  const page = await getPage("glossary", "index");

  if (!page) return notFound();

  return (
    <main className="container pageShell">
      <header className="pageHeader">
        <p className="pageKicker">Glossar</p>
        <h1 className="pageTitle">{page.title}</h1>
        {page.description ? <p className="pageLead">{page.description}</p> : null}
      </header>

      <section className="pageContent">
        <div className="card">
          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />
        </div>
      </section>
    </main>
  );
}

