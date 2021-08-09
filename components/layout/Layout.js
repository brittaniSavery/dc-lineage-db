import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { SITE_NAME } from "../../lib/constants";
import Footer from "./Footer";
import Navigation from "./Navigation";

export default function Layout({ title, children }) {
  return (
    <section>
      <Head>
        <title>{`${SITE_NAME}: ${
          title === "Home" ? "A Dragon Cave fansite for lineage lovers" : title
        }`}</title>
      </Head>
      <Navigation />
      <main className="container full-viewport is-fluid">
        <div className="columns is-centered">
          <div className="column is-9">{children}</div>
        </div>
      </main>
      <Footer />
    </section>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
