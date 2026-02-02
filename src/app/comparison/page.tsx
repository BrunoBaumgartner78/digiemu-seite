import { getPage } from "@/lib/content";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Vergleich – DigiEmu",
  description:
    "Sachlicher Vergleich zwischen DigiEmu, CMS, SharePoint und PDF-Websites für Gemeinden.",
};

export default async function ComparisonPage() {
  const page = await getPage("comparison", "index");
  if (!page) return notFound();

  return (
    <main className="container">
      <article>
        <h1>{page.title}</h1>
        <p style={{ opacity: 0.75 }}>{page.description}</p>
        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </article>
    </main>
  );
}
