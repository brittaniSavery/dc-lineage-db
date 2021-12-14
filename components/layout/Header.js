import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
export default function Header({
  site = false,
  centered = false,
  children,
  ...rest
}) {
  return (
    <h1
      className={classNames("has-text-weight-semibold", "has-text-primary", {
        "has-text-centered": centered,
        [`${site ? "site-" : ""}header`]: true,
      })}
      {...rest}
    >
      {children}
    </h1>
  );
}

Header.propTypes = {
  centered: PropTypes.bool,
  site: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
