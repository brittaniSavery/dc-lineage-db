import React from "react";
import { Field } from "react-final-form";

export default function SelectField({
  name,
  label,
  options,
  required = false,
}) {
  return (
    <div className="field">
      <label className="label">
        {label}
        {required && " *"}
      </label>
      <div className="control">
        {options.map((option) => (
          <label className="radio">
            <Field
              name={name}
              component="input"
              type="radio"
              value={option.value}
            />
            &nbsp;
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
