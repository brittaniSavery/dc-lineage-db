import React from "react";

export default function Button({ primary = false, children, ...rest }) {
  return (
    <button className={`button ${primary && "is-primary"}`} {...rest}>
      {children}
    </button>
  );
}
