import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function InputField({
  name,
  label,
  help,
  required = false,
  ...rest
}) {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        if (rest.type === "number" && input.value)
          input.onChange(parseInt(input.value, 10));
        return (
          <div className="field">
            <label className="label">
              {label}
              {required && " *"}
            </label>
            <div className="control">
              <input id={name} {...input} {...rest} className="input" />
            </div>
            {!meta.error && help && <p className="help">{help}</p>}
            {meta.error && meta.touched && (
              <p className="help is-danger">{meta.error}</p>
            )}
          </div>
        );
      }}
    </Field>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  required: PropTypes.bool,
};
