import "./globals.css";
import type { Metadata } from "next";
import ActiveLink from "@/components/ActiveLink";
import MobileNav from "@/components/MobileNav";
import styles from "@/components/Nav.module.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://digiemu.ch";
const SITE_TITLE = "DigiEmu – Digitale Produkte & Lizenzlösungen";
const SITE_DESC =
  "Modulare Plattform für digitale Produkte – Marktplatz oder Lizenz-/Custom-Lösung.";
const OG_IMAGE = "/og-1200x630.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | DigiEmu",
  },
  description: SITE_DESC,

  alternates: {
    canonical: new URL(SITE_URL),
  },

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    url: SITE_URL,
    siteName: "DigiEmu",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DigiEmu – Digitale Produkte & Lizenzlösungen",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "DigiEmu",
        url: SITE_URL,
        email: "bruno@brainbloom.ch",
        brand: "Bellu – Baumgartner Web Design & Development",
      },
      {
        "@type": "SoftwareApplication",
        name: "DigiEmu",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "Modulare Informationsinfrastruktur für digitale Inhalte – Marktplatz oder Lizenz-/Custom-Lösung.",
      },
    ],
  };

  return (
    <html lang="de" suppressHydrationWarning>
      <body>
        {/* Theme bootstrap */}
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
    var prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute(
      'data-theme',
      prefersDark ? 'dark' : 'light'
    );
  } catch (e) {}
})();`,
          }}
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Header */}
        <header className={`${styles.topbar} topbar`}>
          <div className={`container ${styles.nav}`}>
            <a className={`${styles.brand} brand`} href="/">
              DigiEmu <span className={`${styles.badge} badge`}>beta</span>
            </a>

            <nav
              className={`${styles.navlinks} navlinks`}
              aria-label="Hauptnavigation"
            >
              <ActiveLink className={`${styles.link} link`} href="/municipalities">
                Gemeinden
              </ActiveLink>
              <ActiveLink
                className={`${styles.link} link`}
                href="/faq/municipalities"
              >
                FAQ
              </ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/product">
                Produkt
              </ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/use-cases">
                Use-Cases
              </ActiveLink>
              <ActiveLink className={`${styles.link} link`} href="/docs">
                Docs
              </ActiveLink>
              <ActiveLink
                className={`${styles.link} link`}
                href="/contact/municipalities"
              >
                Kontakt
              </ActiveLink>
            </nav>

            <div className={`${styles.navMobile} navMobile`}>
              <MobileNav />
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="container pageShell">
          <div className="pageContent">{children}</div>
        </main>

        {/* Footer */}
            <footer className="container footer">
      <div className="footerRow">
        <span>
          © {new Date().getFullYear()} DigiEmu • Bellu – Baumgartner Web Design & Development
        </span>
        <span className="dot">•</span>
        <a href="/about">Über</a>
        <a href="/comparison">Vergleich</a>
        <a href="/legal/impressum">Impressum</a>
        <a href="/legal/datenschutz">Datenschutz</a>
        <a href="/legal/agb">AGB</a>
      </div>
    </footer>

      </body>
    </html>
  );
}
