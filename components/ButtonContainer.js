import React from "react";
import PropTypes from "prop-types";

export default function ButtonContainer({ alignment = "left", children }) {
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
      {React.Children.map(children, (child, index) => (
        <p key={`buttonGroup-${index}`} className="control">
          {child}
        </p>
      ))}
    </div>
  );
}

ButtonContainer.propTypes = {
  alignment: PropTypes.string,
  children: PropTypes.node,
};
