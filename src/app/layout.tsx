import "./globals.css";
import type { Metadata } from "next";
import ActiveLink from "@/components/ActiveLink";
import MobileNav from "@/components/MobileNav";
import styles from "@/components/Nav.module.css";

export const metadata: Metadata = {
  title: {
    default: "DigiEmu – Digitale Produkte & Lizenzlösungen",
    template: "%s | DigiEmu",
  },
  description:
    "Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch"),
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch" },
  openGraph: {
    title: "DigiEmu – Digitale Produkte & Lizenzlösungen",
    description:
      "Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch",
    siteName: "DigiEmu",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "DigiEmu" }],
    locale: "de_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiEmu – Digitale Produkte & Lizenzlösungen",
    description:
      "Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "DigiEmu",
        url: base,
        email: "bruno@brainbloom.ch",
        brand: "Bellu – Baumgartner Web Design & Development",
      },
      {
        "@type": "SoftwareApplication",
        name: "DigiEmu",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: base,
        description:
          "Modulare Informationsinfrastruktur für digitale Inhalte – Marktplatz oder Lizenz-/Custom-Lösung.",
      },
    ],
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {/* Theme bootstrap: uses data-theme on <html> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
      return;
    }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } catch (e) {}
})();`,
          }}
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className={`${styles.topbar} topbar`}>
          <div className={`container ${styles.nav}`}>
            <a className={`${styles.brand} brand`} href="/">
              DigiEmu <span className={`${styles.badge} badge`}>beta</span>
            </a>

            <nav className={`${styles.navlinks} navlinks`} aria-label="Hauptnavigation">
              <ActiveLink className={`${styles.link} link`} href="/municipalities">Gemeinden</ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/faq/municipalities">FAQ</ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/product">Produkt</ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/use-cases">Use-Cases</ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/docs">Docs</ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/contact/municipalities">Kontakt</ActiveLink>
            </nav>

            <div className={`${styles.navMobile} navMobile`}>
              <MobileNav />
            </div>
          </div>
        </header>

        <main className="container pageShell">
          <div className="pageContent">
            {children}
          </div>
        </main>

        <footer className="container footer">
          <div className="footerRow">
            <span>
              © {new Date().getFullYear()} DigiEmu • Bellu – Baumgartner Web Design & Development
            </span>
            <span className="dot">•</span>
            <a href="/legal/impressum">Impressum</a>
            <a href="/legal/datenschutz">Datenschutz</a>
            <a href="/legal/agb">AGB</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
