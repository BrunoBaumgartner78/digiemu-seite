import { getAllPagesMeta } from "@/lib/content";

export const metadata = {
  title: "Use-Cases – DigiEmu",
  description: "Einsatzszenarien für Creator, Organisationen und Gemeinden.",
};

export default function UseCasesIndexPage() {
  const pages = getAllPagesMeta("use-cases");

  return (
    <div>
      <h1>Use-Cases</h1>
      <p>Einsatzszenarien für DigiEmu – von Creator bis Gemeinde.</p>

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
