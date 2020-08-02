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
    if (shade && BUTTON.SHADES.includes(color)) classes[`is-${shade}`] = true;

    return classes;
  };

  return (
    <button
      className={classNames("button", variantClass, sizeClass, colorClass(), {
        "is-fullwidth": fullWidth,
        "is-loading": loading,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
};
