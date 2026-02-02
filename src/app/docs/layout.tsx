import type { ReactNode } from "react";
import DocsLayoutClient, { DocsNavItem } from "@/components/DocsLayoutClient";

const items: DocsNavItem[] = [
  { href: "/docs/getting-started", title: "Übersicht", description: "Erste Schritte mit DigiEmu." },
  { href: "/docs/roles", title: "Rollen", description: "Vendor, Buyer, Admin." },
  { href: "/docs/vendor-onboarding", title: "Vendor Onboarding", description: "Profil einrichten." },
  { href: "/docs/upload-product", title: "Produkt hochladen", description: "Produkt & Dateien hochladen." },
  { href: "/docs/product-price", title: "Produktpreis", description: "Währung & Regeln." },
  { href: "/docs/checkout", title: "Checkout", description: "Was Käufer erleben." },
];

export default function DocsRootLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayoutClient
      title="Docs"
      kicker="Kapitelübersicht"
      items={items}
    >
      {children}
    </DocsLayoutClient>
  );
}
