import { getAllPagesMeta } from "@/lib/content";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pages = getAllPagesMeta("docs");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
      <aside
        style={{
          position: "sticky",
          top: 16,
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 14,
          padding: 14,
          height: "fit-content",
        }}
      >
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Docs</div>

        <nav style={{ display: "grid", gap: 8 }}>
          <a href="/docs" style={{ fontWeight: 600, textDecoration: "none" }}>Übersicht</a>
          <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "8px 0" }} />
          {pages.map((p) => (
            <a key={p.slug} href={`/docs/${p.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ fontSize: 13, opacity: 0.7, lineHeight: 1.3 }}>{p.description}</div>
            </a>
          ))}
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
