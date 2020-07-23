import React from "react";
import { Field } from "react-final-form";

export default function InputField({
  name,
  label,
  length,
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
            <textarea className="textarea" {...input} {...rest}></textarea>
          </div>
          {meta.error && meta.touched && (
            <p class="help is-danger">{meta.error}</p>
          )}
        </div>
      )}
    </Field>
  );
}
