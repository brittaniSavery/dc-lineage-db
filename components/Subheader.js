import React from "react";
import PropTypes from "prop-types";

export default function Subheader({ children }) {
  return (
    <h2
      className="is-uppercase has-text-weight-light has-text-info is-size-5-touch
    is-size-4-desktop"
    >
      {children}
    </h2>
  );
}

Subheader.propTypes = {
  children: PropTypes.node.isRequired,
};
