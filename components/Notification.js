import React from "react";
import PropTypes from "prop-types";
import { STATUSES } from "../lib/constants";

export default function Notification({ status, title, children, ...rest }) {
  return (
    <div
      className={`notification is-light ${status && `is-${status}`}`}
      {...rest}
    >
      <button className="delete" />
      <h2 className="title">{title}</h2>
      <p className="subtitle">{children}</p>
    </div>
  );
}

Notification.propTypes = {
  status: PropTypes.oneOf(STATUSES),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
