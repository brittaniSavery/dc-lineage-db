import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function ButtonContainer({
  alignment = "left",
  children,
  className,
}) {
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
    <div className={classNames("field is-grouped", alignmentClass, className)}>
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
  className: PropTypes.node,
  children: PropTypes.node,
};
