import React from "react";
import PropTypes from "prop-types";
import { STATUSES } from "../lib/constants";

export default function Notification({ status, title, children, ...rest }) {
  status = status === "error" ? "danger" : status;
  return (
    <div
      className={`notification is-light ${status && `is-${status}`}`}
      {...rest}
    >
      <button className="delete" />
      <h2 className="is-size-3-tablet is-size-4-touch has-text-weight-semibold	">
        {title}
      </h2>
      <p className="is-size-5-tablet is-size-6-touch">{children}</p>
    </div>
  );
}

Notification.propTypes = {
  status: PropTypes.oneOf([...STATUSES, "error"]),
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};
