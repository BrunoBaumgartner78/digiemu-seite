import { getAllPagesMeta } from "@/lib/content";

export const metadata = {
  title: "Produkt – DigiEmu",
  description: "Produktbeschreibung, Funktionen und Betriebsmodi.",
};

export default function ProductIndexPage() {
  const pages = getAllPagesMeta("product");

  return (
    <div>
      <h1>Produkt</h1>
      <p>Übersicht über Funktionen, Betriebsmodi und Grundlagen von DigiEmu.</p>

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
        {pages.map((p) => (
          <li key={p.url} style={{ border: "1px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: 14 }}>
            <a href={p.url} style={{ fontWeight: 700, textDecoration: "none" }}>{p.title}</a>
            <div style={{ opacity: 0.75, marginTop: 6 }}>{p.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
