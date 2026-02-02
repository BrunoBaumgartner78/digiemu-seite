"use client";

import { usePathname } from "next/navigation";

type Item = { slug: string; title: string; description?: string };

export default function DocsSidebarClient({ pages }: { pages: Item[] }) {
  const pathname = usePathname() || "/docs";

  return (
    <aside
      style={{
        position: "sticky",
        top: 16,
        border: "1px solid rgba(15,23,42,0.10)",
        borderRadius: 14,
        padding: 14,
        height: "fit-content",
        background: "rgba(255,255,255,0.78)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>Docs</div>

      <nav style={{ display: "grid", gap: 8 }}>
        <a
          href="/docs"
          style={{
            textDecoration: "none",
            fontWeight: pathname === "/docs" ? 900 : 700,
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid",
            borderColor: pathname === "/docs" ? "rgba(37,99,235,0.35)" : "transparent",
            background: pathname === "/docs" ? "rgba(37,99,235,0.08)" : "transparent",
          }}
        >
          Übersicht
        </a>

        <div style={{ height: 1, background: "rgba(0,0,0,0.08)", margin: "8px 0" }} />

        {pages.map((p) => {
          const href = `/docs/${p.slug}`;
          const active = pathname === href;
          return (
            <a
              key={p.slug}
              href={href}
              style={{
                textDecoration: "none",
                padding: "8px 10px",
                borderRadius: 10,
                border: "1px solid",
                borderColor: active ? "rgba(37,99,235,0.35)" : "transparent",
                background: active ? "rgba(37,99,235,0.08)" : "transparent",
                display: "block",
              }}
            >
              <div style={{ fontWeight: active ? 900 : 700 }}>{p.title}</div>
              <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.3 }}>{p.description}</div>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
