import React from "react";

export default function Header({ centered = false, children, ...rest }) {
  let classes = [
    "is-size-3-touch",
    "is-size-2-desktop",
    "is-size-1-widescreen",
    "has-text-primary",
  ];
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
