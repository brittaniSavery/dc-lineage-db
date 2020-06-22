import React from "react";
import PropTypes from "prop-types";
import { OutlinedInput, InputLabel, FormControl } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  shrink: {
    fontSize: "1rem",
    bottom: theme.spacing(3),
    transform: "none",
  },
}));

export default function CustomSelectField({
  id,
  label,
  data,
  required,
  getOptionLabel,
  ...rest
}) {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        disableAnimation
        htmlFor={id}
        required={required}
        classes={{ shrink: classes.shrink }}
      >
        {label}
      </InputLabel>
      <Autocomplete
        id={id}
        options={data}
        getOptionLabel={getOptionLabel}
        classes={{ root: classes.root }}
        renderInput={(params) => (
          <OutlinedInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            endAdornment={params.InputProps.endAdornment}
            {...params}
          />
        )}
        {...rest}
      />
    </FormControl>
  );
}

CustomSelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.node).isRequired,
  required: PropTypes.bool,
  getOptionLabel: PropTypes.func,
};

CustomSelectField.defaultProps = {
  required: false,
  getOptionLabel: (option) => option,
};
