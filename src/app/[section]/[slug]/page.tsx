import { getAllSlugs, getPage } from "@/lib/content";
import { notFound } from "next/navigation";

type Params = { section: string; slug: string };

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { section, slug } = await params;
  const page = await getPage(section, slug);
  if (!page) return {};

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `${base}${page.url}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${base}${page.url}`,
      type: "article",
    },
  };
}

export default async function ContentPage({ params }: { params: Promise<Params> }) {
  const { section, slug } = await params;
  const page = await getPage(section, slug);
  if (!page) return notFound();

  return (
    <article style={{ maxWidth: 980, margin: "0 auto", padding: 24 }}>
      <h1>{page.title}</h1>
      <p style={{ opacity: 0.75 }}>{page.description}</p>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </article>
  );
}
