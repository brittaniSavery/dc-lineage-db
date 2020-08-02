import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function CheckboxGroup({
  name,
  label,
  options,
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
  required = false,
}) {
  return (
    <div className="field">
      {label && (
        <label className="label">
          {label}
          {required && " *"}
        </label>
      )}
      {options.map((option, index) => (
        <div key={`checkboxGroup-${name}-${index}`} className="control">
          <label className="checkbox">
            <Field
              name={name}
              component="input"
              type="checkbox"
              value={options.length > 1 ? getOptionValue(option) : undefined}
            />
            &nbsp;
            {getOptionLabel(option)}
          </label>
        </div>
      ))}
    </div>
  );
}

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};
