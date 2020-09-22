import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import classNames from "classnames";
import { SITE_NAME } from "../lib/constants";

export default function HeroBanner({
  title,
  subtitle = "",
  color = "primary",
  fullHeight = false,
  showTitle = false,
  children,
}) {
  return (
    <section
      className={classNames(
        "hero",
        { [`is-${color}`]: true },
        { "is-fullheight": fullHeight }
      )}
    >
      <Head>
        <title>{`${SITE_NAME}: ${title}${subtitle && `—${subtitle}`}`}</title>
      </Head>
      <div
        className={classNames("hero-body", { "has-text-centered": showTitle })}
      >
        <div className="container">
          {showTitle && <h1 className="title">{title}</h1>}
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
  showTitle: PropTypes.bool,
  children: PropTypes.node,
};
