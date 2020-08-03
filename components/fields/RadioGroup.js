import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";

export default function RadioGroup({
  name,
  label,
  options,
  getOptionLabel = (option) => option,
  getOptionValue = (option) => option,
  required = false,
}) {
  return (
    <div className="field">
      <label className="label">
        {label}
        {required && " *"}
      </label>
      {options.map((option, index) => (
        <div key={`radioGroup-${name}-${index}`} className="control">
          <label className="radio">
            <Field
              id={`${name}-${getOptionValue(option)}`}
              name={name}
              component="input"
              type="radio"
              value={getOptionValue(option)}
            />
            &nbsp;
            {getOptionLabel(option)}
          </label>
        </div>
      ))}
    </div>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};
