import React from "react";
import { Field } from "react-final-form";
import Select, { createFilter } from "react-select";

export default function SearchableSelectField({
  name,
  label,
  options,
  required,
  matchFromStart,
  ...rest
}) {
  const filterConfig = { matchFrom: "start" };

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <div className="field">
          <label className="label">
            {label}
            {required && " *"}
          </label>
          <div className="control">
            <Select
              inputId={name}
              options={options}
              filterOption={matchFromStart && createFilter(filterConfig)}
              {...input}
              {...rest}
            />
          </div>
          {meta.error && meta.touched && (
            <p className="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}
