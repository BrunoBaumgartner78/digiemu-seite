import Link from "next/link";

function CardItem({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="card" style={{ display: "block" }}>
      <div className="stack">
        <p className="cardTitle" style={{ margin: 0 }}>{title}</p>
        <p className="cardText">{desc}</p>
      </div>
    </Link>
  );
}

export default function DocsPage() {
  return (
    <>
      <header className="pageHeader">
        <p className="pageKicker">Docs</p>
        <h1 className="pageTitle">Dokumentation</h1>
        <p className="pageLead">Kapitelübersicht – tippe auf ein Kapitel, um Details zu öffnen.</p>
      </header>

      <section className="section">
        <div className="stackLoose">
          <CardItem title="Übersicht" desc="Was DigiEmu ist und wie die Module zusammenspielen." href="/docs/overview" />
          <CardItem title="Schnellstart" desc="Erste Schritte mit DigiEmu." href="/docs/getting-started" />
          <CardItem title="Rollen" desc="Vendor, Buyer, Admin – Rollenmodell." href="/docs/roles" />
          <CardItem title="Vendor Onboarding" desc="Wie Verkäufer starten und ihr Profil einrichten." href="/docs/vendor-onboarding" />
          <CardItem title="Produkt hochladen" desc="Produkt anlegen und Dateien hochladen." href="/docs/upload" />
          <CardItem title="Checkout" desc="Was Käufer im Checkout erleben." href="/docs/checkout" />
        </div>
      </section>
    </>
  );
}
