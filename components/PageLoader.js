import React from "react";
import PropTypes from "prop-types";

export default function PageLoader({ loading, children }) {
  return (
    <div className={loading ? "page-loader" : ""}>
      {loading ? <div className="page-loader-body" /> : children}
    </div>
  );
}

PageLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
