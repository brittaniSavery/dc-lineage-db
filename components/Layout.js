import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ title, children }) {
  const siteName = "Dragon Cave Lineage Database";
  const [activeMenu, setActiveMenu] = React.useState(false);

  return (
    <section className="section">
      <Head>
        <title>{`${siteName}: ${
          title === "Home" ? "A Dragon Cave fansite for lineage lovers" : title
        }`}</title>
      </Head>
      <nav
        className="navbar is-transparent is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item is-size-4">DCLDB</a>
          </Link>
          <a
            role="button"
            onClick={() => setActiveMenu(!activeMenu)}
            className={`navbar-burger ${activeMenu && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${activeMenu && "is-active"}`}>
          <div className="navbar-start">
            <a className="navbar-item is-uppercase has-text-weight-medium	">
              My Lineages
            </a>
            <a className="navbar-item is-uppercase has-text-weight-medium	">
              Documentation
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button is-primary is-inverted is-uppercase has-text-weight-medium	">
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="container is-fluid">
        <div className="columns is-centered">
          <div className="column is-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
