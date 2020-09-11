import React from "react";
import PropTypes from "prop-types";

export default function Header({ centered = false, children, ...rest }) {
  let classes = ["is-size-2", "is-size-1-widescreen", "has-text-primary"];
  if (centered) {
    classes.push("has-text-centered");
    classes.push("site-header");
  }

  return (
    <h1 className={classes.join(" ")} {...rest}>
      {children}
    </h1>
  );
}

Header.propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
