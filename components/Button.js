import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { BUTTON } from "../lib/constants";

export default function Button({
  variant,
  color: fullColor,
  size,
  fullWidth = false,
  loading = false,
  link = false,
  children,
  ...rest
}) {
  const variantClass = BUTTON.VARIANTS.includes(variant) && `is-${variant}`;
  const sizeClass = BUTTON.SIZES.includes(size) && `is-${size}`;
  const colorClass = () => {
    if (!fullColor) return;

    const [color, shade] = fullColor.split("-");
    if (!BUTTON.COLORS.includes(color)) return;

    let classes = {};
    classes[`is-${color}`] = true;
    if (shade && BUTTON.SHADES.includes(shade)) classes[`is-${shade}`] = true;

    return classes;
  };

  const ButtonTag = link ? "a" : "button";

  return (
    <ButtonTag
      className={classNames("button", variantClass, sizeClass, colorClass(), {
        "is-fullwidth": fullWidth,
        "is-loading": loading,
      })}
      {...rest}
    >
      {children}
    </ButtonTag>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(BUTTON.VARIANTS),
  color: function (props, propName, componentName) {
    if (!props[propName]) return;

    const [color, shade] = props[propName].split("-");
    if (
      !BUTTON.COLORS.includes(color) ||
      (shade && !BUTTON.SHADES.includes(shade))
    )
      return new Error(
        `Invalid prop ${props[propName]} suppplied to ${componentName}. Validation failed.`
      );
  },
  size: PropTypes.oneOf(BUTTON.SIZES),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  link: PropTypes.bool,
  children: PropTypes.node,
};
