import React from "react";

export default function ButtonGroup({ alignment = "left", children }) {
  let alignmentClass;
  switch (alignment) {
    case "center":
      alignmentClass = "is-grouped-centered";
      break;

    case "right":
      alignmentClass = "is-grouped-right";
      break;

    default:
      alignmentClass = "";
  }

  return (
    <div className={`field is-grouped ${alignmentClass}`}>
      {children.map((child, index) => (
        <p key={`buttonGroup-${index}`} className="control">
          {child}
        </p>
      ))}
    </div>
  );
}
