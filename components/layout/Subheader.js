import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Subheader({ children, classes }) {
  return (
    <h2
      className={classNames(
        "is-uppercase has-text-weight-medium has-text-info is-size-5-touch is-size-4-desktop",
        classes
      )}
    >
      {children}
    </h2>
  );
}

Subheader.propTypes = {
  children: PropTypes.string.isRequired,
  classes: PropTypes.oneOf([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
};
