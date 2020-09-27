import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "../../lib/hooks";
import { SITE_NAME } from "../../lib/constants";

export default function Layout({ title, children }) {
  const { auth, isLoading } = useAuth();
  const [activeMenu, setActiveMenu] = React.useState(false);

  return (
    <section className="section">
      <Head>
        <title>{`${SITE_NAME}: ${
          title === "Home" ? "A Dragon Cave fansite for lineage lovers" : title
        }`}</title>
      </Head>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item is-size-4 has-text-weight-medium">
              DCLDB
            </a>
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
            <Link href="/database">
              <a className="navbar-item is-uppercase has-text-weight-medium">
                Database
              </a>
            </Link>
            {!isLoading && auth && auth.user.isSetup && (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link is-uppercase has-text-weight-medium">
                  My Lineages
                </a>

                <div className="navbar-dropdown">
                  <Link href="/lineages/add">
                    <a className="navbar-item is-uppercase">Add</a>
                  </Link>
                  <Link href="/lineages">
                    <a className="navbar-item is-uppercase">View</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="navbar-end">
            {!isLoading && !auth && (
              <div className="navbar-item">
                <a
                  href="/api/auth/login"
                  className={classNames(
                    "button is-primary is-uppercase has-text-weight-medium",
                    { "is-inverted": !activeMenu }
                  )}
                >
                  Login
                </a>
              </div>
            )}
            {!isLoading && auth && auth.user.isSetup && (
              <>
                <Link
                  href="/users/[username]"
                  as={`/users/${auth.user.username}`}
                >
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
  title: PropTypes.string,
  children: PropTypes.node,
};
