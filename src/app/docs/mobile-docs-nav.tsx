"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type PageMeta = {
  slug: string;
  title: string;
  description?: string;
};

export default function MobileDocsNav({ pages }: { pages: PageMeta[] }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement | null>(null);

  const currentSlug = pathname?.startsWith("/docs/") ? pathname.replace("/docs/", "") : "";
  const currentTitle = useMemo(() => {
    if (!currentSlug) return "Übersicht";
    return pages.find((p) => p.slug === currentSlug)?.title ?? "Kapitel";
  }, [currentSlug, pages]);

  // Close the accordion when route changes
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  return (
    <div className="docsMobileNav">
      <details ref={ref} className="docsMobileDetails">
        <summary className="docsMobileSummary">
          <span className="docsMobileSummaryLabel">Kapitel</span>
          <span className="docsMobileSummaryValue">{currentTitle}</span>
        </summary>

        <div className="docsMobilePanel" role="navigation" aria-label="Docs Kapitel">
          <Link
            className={`docsMobileLink ${currentSlug === "" ? "isActive" : ""}`}
            href="/docs"
            aria-current={currentSlug === "" ? "page" : undefined}
          >
            Übersicht
          </Link>

          {pages.map((p) => {
            const active = p.slug === currentSlug;
            return (
              <Link
                key={p.slug}
                className={`docsMobileLink ${active ? "isActive" : ""}`}
                href={`/docs/${p.slug}`}
                aria-current={active ? "page" : undefined}
              >
                {p.title}
              </Link>
            );
          })}
        </div>
      </details>

      <p className="docsMobileNavHint">
        Tippe auf „Kapitel“, um zwischen den Docs-Seiten zu wechseln.
      </p>
    </div>
  );
}
