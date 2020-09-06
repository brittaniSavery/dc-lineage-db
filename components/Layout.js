import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "../lib/hooks";

export default function Layout({ title, children }) {
  const siteName = "Dragon Cave Lineage Database";
  const { auth } = useAuth();
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
            className={classNames("navbar-burger", { "is-active": activeMenu })}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div className={classNames("navbar-menu", { "is-active": activeMenu })}>
          <div className="navbar-start">
            <Link href="/search">
              <a className="navbar-item is-uppercase has-text-weight-medium">
                Database
              </a>
            </Link>
            {auth && (
              <Link href="/lineages">
                <a className="navbar-item is-uppercase has-text-weight-medium">
                  My Lineages
                </a>
              </Link>
            )}
          </div>
          <div className="navbar-end">
            {!auth && (
              <div className="navbar-item">
                <a
                  href="/api/auth/login"
                  className="button is-primary is-inverted is-uppercase has-text-weight-medium"
                >
                  Login
                </a>
              </div>
            )}
            {auth && (
              <>
                <Link href="/users/">
                  <a className="navbar-item is-uppercase has-text-weight-medium">
                    Profile
                  </a>
                </Link>
                <a
                  href="/api/auth/logout"
                  className="navbar-item is-uppercase has-text-weight-medium"
                >
                  Logout
                </a>
              </>
            )}
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

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
