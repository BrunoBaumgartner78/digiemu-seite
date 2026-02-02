"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export type DocsNavItem = {
  href: string;
  title: string;
  description?: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/docs") return pathname === "/docs" || pathname.startsWith("/docs/");
  return pathname === href || pathname.startsWith(href + "/");
}

export default function DocsLayoutClient({
  title = "Docs",
  kicker = "Kapitelübersicht",
  hint = 'Tippe auf „Kapitel“, um zwischen den Docs-Seiten zu wechseln.',
  items,
  children,
}: {
  title?: string;
  kicker?: string;
  hint?: string;
  items: DocsNavItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/docs";

  const current = useMemo(
    () => items.find((i) => isActive(pathname, i.href)) ?? items[0],
    [items, pathname]
  );

  const [open, setOpen] = useState(false);

  // Optional: Menü automatisch schließen, wenn man navigiert
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="docsLayout">
      {/* MOBILE: dropdown only */}
      <div className="docsMobile">
        <header className="pageHeader">
          <p className="pageKicker">{kicker}</p>
          <p className="pageLead">{hint}</p>

          <button
            className="btn"
            type="button"
            aria-expanded={open}
            aria-controls="docs-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            Kapitel: {current?.title ?? "Auswählen"}
            <span aria-hidden style={{ marginLeft: 6, opacity: 0.7 }}>
              ▾
            </span>
          </button>

          {open && (
            <div id="docs-mobile-menu" className="docsMobileMenu card" role="menu">
              <div className="stack">
                {items.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={active ? "docsLink active" : "docsLink"}
                      role="menuitem"
                    >
                      <div className="docsLinkTitle">{item.title}</div>
                      {item.description ? (
                        <div className="docsLinkDesc">{item.description}</div>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        <section className="section">{children}</section>
      </div>

      {/* DESKTOP: sidebar + content */}
      <div className="docsDesktop">
        <aside className="docsSidebar card">
          <div className="docsSidebarHead">
            <div className="docsSidebarTitle">{title}</div>
            <div className="docsSidebarHint">{kicker}</div>
          </div>

          <nav className="docsNav" aria-label="Docs Navigation">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "docsNavItem active" : "docsNavItem"}
                  aria-current={active ? "page" : undefined}
                >
                  <div className="docsNavTitle">{item.title}</div>
                  {item.description ? (
                    <div className="docsNavDesc">{item.description}</div>
                  ) : null}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="docsMain">{children}</main>
      </div>
    </div>
  );
}
