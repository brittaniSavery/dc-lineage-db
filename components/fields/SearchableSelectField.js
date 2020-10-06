import React from "react";
import PropTypes from "prop-types";
import { Field } from "react-final-form";
import Select, { createFilter } from "react-select";
import { getReactSelectOptions } from "../../lib/helpers";

export default function SearchableSelectField({
  name,
  label,
  help,
  options,
  getOptionLabel,
  getOptionValue,
  required,
  matchFromStart,
  ...rest
}) {
  const filterConfig = {
    ignoreCase: true,
    ignoreAccents: true,
    trim: true,
    matchFrom: matchFromStart ? "start" : "any",
  };
  //React-Select expects an array of objects of the {label: "label", value: value} variety
  const generatedOptions = getReactSelectOptions(
    options,
    getOptionLabel,
    getOptionValue
  );

  //setting the initial value

  return (
    <Field
      name={name}
      parse={(v) => v && v.value}
      format={(v) => options.find((o) => o.value === v)}
    >
      {({ input, meta }) => {
        const initialValue = getReactSelectOptions(
          [meta.initial],
          getOptionLabel,
          getOptionLabel
        )[0];

        return (
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
                filterOption={createFilter(filterConfig)}
                defaultValue={initialValue}
                {...input}
                {...rest}
              />
            </div>
            {!meta.error && help && <p className="help">{help}</p>}
            {meta.error && meta.touched && (
              <p className="help is-danger">{meta.error}</p>
            )}
          </div>
        );
      }}
    </Field>
  );
}

SearchableSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
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
