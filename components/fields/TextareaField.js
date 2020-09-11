import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function TextareaField({
  name,
  label,
  help,
  required = false,
  ...rest
}) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label className="label">
            {label}
            {required && " *"}
          </label>
          <div className="control">
            <textarea id={name} className="textarea" {...input} {...rest} />
          </div>
          {!meta.error && help && <p className="help">{help}</p>}
          {meta.error && meta.touched && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}

TextareaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  required: PropTypes.bool,
};
