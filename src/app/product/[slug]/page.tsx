import { getPage, getAllPagesMeta } from "@/lib/content";
import { notFound } from "next/navigation";

type Params = { slug: string };

export async function generateStaticParams() {
  const pages = getAllPagesMeta("product");
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getPage("product", slug);
  if (!page) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${base}/product/${slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${base}/product/${slug}`,
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = await getPage("product", slug);
  if (!page) return notFound();

  return (
    <main className="container pageShell">
      <header className="pageHeader">
        <p className="pageKicker">Produkt</p>
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
