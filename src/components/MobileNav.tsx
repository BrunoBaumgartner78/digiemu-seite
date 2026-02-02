"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./MobileNav.module.css";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div ref={wrapRef} className={`${styles.mobileNav} mobileNav`}>
      <button
        type="button"
        className={`${styles.iconButton} iconButton`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Menü
      </button>

      {open && (
        <div className={`${styles.mobileMenu} mobileMenu`} role="menu">
          <Link className={styles.link} href="/municipalities" onClick={closeMenu}>Gemeinden</Link>
          <Link className={styles.link} href="/faq/municipalities" onClick={closeMenu}>FAQ</Link>
          <Link className={styles.link} href="/product" onClick={closeMenu}>Produkt</Link>
          <Link className={styles.link} href="/use-cases" onClick={closeMenu}>Use-Cases</Link>
          <Link className={styles.link} href="/docs" onClick={closeMenu}>Docs</Link>
          <Link className={styles.link} href="/contact/municipalities" onClick={closeMenu}>Kontakt</Link>
        </div>
      )}
    </div>
  );
}
