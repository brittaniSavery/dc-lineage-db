import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

export default function CustomTextField({
  id,
  label,
  value,
  required,
  ...rest
}) {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        disableAnimation
        required={required}
        htmlFor={id}
        classes={{ shrink: classes.shrink }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        value={value}
        classes={{
          root: classes.root,
        }}
        {...rest}
      />
    </FormControl>
  );
}

CustomTextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  required: PropTypes.bool,
};

CustomTextField.defaultProps = {
  value: null,
  required: false,
};
