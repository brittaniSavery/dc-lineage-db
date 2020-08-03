import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function InputField({ name, label, required = false, ...rest }) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label className="label">
            {label}
            {required && " *"}
          </label>
          <div className="control">
            <input id={name} {...input} {...rest} className="input" />
          </div>
          {meta.error && meta.touched && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};
