import React from "react";
import PropTypes from "prop-types";
import { Field, useField } from "react-final-form";
import Button from "../Button";

export default function RadioGroup({
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
      {!field.meta.error && help && <p className="help">{help}</p>}
      {field.meta.error && field.meta.touched && (
        <p className="help is-danger">{field.meta.error}</p>
      )}
      {field.input.value && (
        <Button color="text" onClick={() => field.input.onChange()}>
          Clear
        </Button>
      )}
    </div>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  help: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
};
