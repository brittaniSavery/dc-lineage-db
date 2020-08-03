import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import Select, { createFilter } from "react-select";
import { createReactSelectOptions } from "../../lib/helpers";

export default function SearchableSelectField({
  name,
  label,
  options,
  getOptionLabel,
  getOptionValue,
  required,
  matchFromStart,
  ...rest
}) {
  const filterConfig = { matchFrom: "start" };
  //React-Select expects an array of objects of the {label: "label", value: value} variety
  const generatedOptions = createReactSelectOptions(
    options,
    getOptionLabel,
    getOptionValue
  );

  return (
    <Field
      name={name}
      parse={(v) => v && v.value}
      format={(v) => options.find((o) => o.value === v)}
    >
      {({ input, meta }) => (
        <div className="field">
          <label className="label">
            {label}
            {required && " *"}
          </label>
          <div className="control">
            <Select
              id={name}
              inputId={name}
              options={generatedOptions}
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

SearchableSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.object])
  ).isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  required: PropTypes.bool,
  matchFromStart: PropTypes.bool,
};

SearchableSelectField.defaultProps = {
  getOptionLabel: (option) => option,
  getOptionValue: (option) => option,
  required: false,
  matchFromStart: false,
};
