import { getPage, getAllPagesMeta } from "@/lib/content";
import { notFound } from "next/navigation";

type Params = { slug: string };

export async function generateStaticParams() {
  const pages = getAllPagesMeta("use-cases");
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getPage("use-cases", slug);
  if (!page) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${base}/use-cases/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${base}/use-cases/${slug}`,
      type: "article",
    },
  };
}

export default async function UseCasePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getPage("use-cases", slug);
  if (!page) return notFound();

  return (
    <main className="container pageShell">
      <header className="pageHeader">
        <p className="pageKicker">Use-Cases</p>
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
