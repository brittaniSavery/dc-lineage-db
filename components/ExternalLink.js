import React from "react";
import PropTypes from "prop-types";

export default function ExternalLink({ url, children }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
