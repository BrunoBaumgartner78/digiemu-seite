import Link from "next/link";
import styles from "./DocsLayout.module.css";

export type DocsNavItem = { href: string; title: string; desc?: string };

export default function DocsLayout({
  title = "Docs",
  kicker = "Kapitelübersicht",
  items,
  currentPath,
  children,
}: {
  title?: string;
  kicker?: string;
  items: DocsNavItem[];
  currentPath: string;
  children: React.ReactNode;
}) {
  const current =
    items.find((i) => i.href === currentPath) ??
    items.find((i) => currentPath.startsWith(i.href));

  return (
    <div className={styles.shell}>
      {/* Desktop Sidebar */}
      <aside className={styles.sidebar} aria-label="Docs Navigation">
        <div className={styles.sideHeader}>
          <div className={styles.kicker}>{kicker}</div>
          <div className={styles.sideTitle}>{title}</div>
          <div className={styles.sideHint}>
            Tippe auf „Kapitel“, um zwischen den Docs-Seiten zu wechseln.
          </div>
        </div>

        <nav className={styles.sideNav}>
          {items.map((it) => {
            const active = it.href === current?.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
              >
                <div className={styles.navItemTitle}>{it.title}</div>
                {it.desc ? <div className={styles.navItemDesc}>{it.desc}</div> : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Mobile Accordion */}
        <div className={styles.mobileNavWrap}>
          <details className={styles.mobileNav} open={false}>
            <summary className={styles.mobileSummary}>
              <span className={styles.mobileLabel}>Kapitel</span>
              <span className={styles.mobileCurrent}>
                {current?.title ?? "Übersicht"}
              </span>
              <span className={styles.chev} aria-hidden="true">▾</span>
            </summary>

            <div className={styles.mobilePanel}>
              {items.map((it) => {
                const active = it.href === current?.href;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`${styles.mobileItem} ${active ? styles.mobileActive : ""}`}
                  >
                    <div className={styles.mobileItemTitle}>{it.title}</div>
                    {it.desc ? (
                      <div className={styles.mobileItemDesc}>{it.desc}</div>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </details>
        </div>

        <header className="pageHeader">
          <p className="pageKicker">Docs</p>
          <h1 className="pageTitle">{current?.title ?? "Übersicht"}</h1>
          {current?.desc ? <p className="pageLead">{current.desc}</p> : null}
        </header>

        <section className="section">
          <div className="card">
            <div className="prose">{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
