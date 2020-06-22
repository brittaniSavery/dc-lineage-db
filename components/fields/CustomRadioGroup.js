import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";

export default function CustomRadioGroup({ id, label, items }) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row aria-label="SROGG entry" id={id} name={id}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.description}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

CustomRadioGroup.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
