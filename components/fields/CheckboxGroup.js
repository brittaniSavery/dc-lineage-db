import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "react-final-form";

export default function CheckboxGroup({
  name,
  label,
  help,
  options,
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
  required = false,
}) {
  const field = useField(name);
  return (
    <div className="field">
      {label && (
        <label className="label">
          {label}
          {required && " *"}
        </label>
      )}
      {options.map((option, index) => {
        const hasValue = options.length > 1;

        return (
          <div key={`checkboxGroup-${name}-${index}`} className="control">
            <label className="checkbox">
              <Field
                id={`${name}${hasValue ? `-${getOptionValue(option)}` : ""}`}
                name={name}
                component="input"
                type="checkbox"
                value={hasValue ? getOptionValue(option) : undefined}
              />
              &nbsp;
              {getOptionLabel(option)}
            </label>
          </div>
        );
      })}
      {!field.meta.error && help && <p className="help">{help}</p>}
      {field.meta.error && field.meta.touched && (
        <p className="help is-danger">{field.meta.error}</p>
      )}
    </div>
  );
}

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};
