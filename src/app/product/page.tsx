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

export default function ProductPage() {
  return (
    <>
      <header className="pageHeader">
        <p className="pageKicker">Produkt</p>
        <h1 className="pageTitle">Überblick über DigiEmu</h1>
        <p className="pageLead">Funktionen, Betriebsmodi und Grundlagen – kompakt zur Einordnung.</p>
      </header>

      <section className="section">
        <div className="stackLoose">
          <CardItem title="Produktübersicht" desc="Überblick über DigiEmu als Informationsinfrastruktur." href="/product/overview" />
          <CardItem title="Lizenzmodell" desc="Lizenzierung für Gemeinden und Institutionen." href="/product/licensing" />
          <CardItem title="Technische Kurzbeschreibung" desc="Architektur, Betrieb, Datenschutz – kompakt für IT & Projektleitung." href="/product/technical" />
          <CardItem title="Custom Setup" desc="Individuelle Einrichtung, Branding und Betrieb." href="/product/custom" />
          <CardItem title="Admin & Reports" desc="Admin-Funktionen, CSV-Export und Auswertungen." href="/product/admin" />
          <CardItem title="Datenschutz" desc="Datenverarbeitung (CH/EU), Prinzipien und Umsetzung." href="/product/privacy" />
        </div>
      </section>
    </>
  );
}
