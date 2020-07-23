import React from "react";
import { Field } from "react-final-form";
import Select from "react-select";

export default function SearchableSelectField({
  name,
  label,
  options,
  required,
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
            <Select inputId={name} options={options} {...input} />
          </div>
          {meta.error && meta.touched && (
            <p class="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}
