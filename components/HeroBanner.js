import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";

export default function HeroBanner({
  title,
  subtitle,
  color = "primary",
  fullHeight = false,
  children,
}) {
  return (
    <section className={`hero is-${color} ${fullHeight && "is-fullheight"}`}>
      <Head>
        <title>{`${SITE_NAME}: ${title}${subtitle && `—${subtitle}`}`}</title>
      </Head>
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title">{title}</h1>
          {subtitle && <h2 className="subtitle">{subtitle}</h2>}
          {children}
        </div>
      </div>
    </section>
  );
}

HeroBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  fullHeight: PropTypes.bool,
  children: PropTypes.node,
};
