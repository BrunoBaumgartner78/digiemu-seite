import { getAllPagesMeta } from "@/lib/content";

export const metadata = {
  title: "Docs – DigiEmu",
  description: "Bedienanleitung und technische Dokumentation.",
};

export default function DocsIndexPage() {
  const pages = getAllPagesMeta("docs");

  return (
    <div>
      <h1>Docs</h1>
      <p>Bedienanleitung und technische Hinweise zu DigiEmu.</p>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {pages.map((p) => (
          <li key={p.slug} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 14 }}>
            <a href={`/docs/${p.slug}`} style={{ fontWeight: 700, textDecoration: "none" }}>{p.title}</a>
            <div style={{ opacity: 0.75, marginTop: 6 }}>{p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
