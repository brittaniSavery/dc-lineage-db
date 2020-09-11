import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function SelectField({
  name,
  label,
  help,
  options,
  required = false,
  getOptionLabel = (x) => x,
  getOptionValue = (x) => x,
}) {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label className="label">
            {label}
            {required && " *"}
          </label>
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select id={name} {...input}>
                <option value="">Select...</option>
                {options.map((option) => (
                  <option
                    key={getOptionValue(option)}
                    value={getOptionValue(option)}
                  >
                    {getOptionLabel(option)}
                  </option>
                ))}
              </select>
              {!meta.error && help && <p className="help">{help}</p>}
              {meta.error && meta.touched && (
                <p className="help is-danger">{meta.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Field>
  );
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};
