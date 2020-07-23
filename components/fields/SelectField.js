import React from "react";
import { Field } from "react-final-form";

export default function SelectField({
  name,
  label,
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
              <select {...input}>
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
              {meta.error && meta.touched && (
                <p class="help is-danger">{meta.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Field>
  );
}
