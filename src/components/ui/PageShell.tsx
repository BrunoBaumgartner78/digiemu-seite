import React from "react";

type Props = {
  kicker?: string;
  title: string;
  lead?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export default function PageShell({ kicker, title, lead, actions, children }: Props) {
  return (
    <>
      <header className="pageHeader">
        {kicker ? <p className="pageKicker">{kicker}</p> : null}
        <h1 className="pageTitle">{title}</h1>
        {lead ? <p className="pageLead">{lead}</p> : null}
        {actions ? <div className="btnRow">{actions}</div> : null}
      </header>

      <section className="section">
        <div className="card">
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
