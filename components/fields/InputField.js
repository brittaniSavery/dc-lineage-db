import React from "react";
import { Field } from "react-final-form";

export default function InputField({
  name,
  label,
  type = "text",
  required,
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
            <input {...input} {...rest} className="input" type={type} />
          </div>
          {meta.error && meta.touched && (
            <p class="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}
