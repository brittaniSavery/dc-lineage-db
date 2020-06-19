import React from "react";
import Layout from "../components/Layout";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  Typography,
  Grid,
  TextField,
  makeStyles,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { ADD_LINEAGE, LINEAGE_TYPES, HOLIDAYS } from "../lib/constants";
import { getMaleBreeds, getFemaleBreeds } from "../lib/breeds";

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Add() {
  const classes = useStyles();
  const maleBreeds = getMaleBreeds();
  const femaleBreeds = getFemaleBreeds();
  return (
    <Layout title="Add">
      <Typography variant="h2" component="h1">
        {ADD_LINEAGE}
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Add your new lineage to the database.
      </Typography>
      <form noValidate autoComplete="off" className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" color="textSecondary">
              Male Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="male-code"
              name="male-code"
              label="Male Code"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="male-name"
              name="male-name"
              label="Male Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              required
              id="male-breed"
              options={maleBreeds}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Male Breed" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" color="textSecondary">
              Female Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="female-code"
              name="female-code"
              label="Female Code"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              id="female-name"
              name="female-name"
              label="Female Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              required
              id="female-breed"
              options={femaleBreeds}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Female Breed"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" color="textSecondary">
              Lineage Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="generation"
              name="generaton"
              label="Generation"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              id="type"
              options={LINEAGE_TYPES}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              id="offspring-code"
              name="offspring-code"
              label="Sample Offspring Code"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Holiday</FormLabel>
              <FormGroup row>
                {HOLIDAYS.map((holiday) => (
                  <FormControlLabel
                    key={holiday}
                    control={<Checkbox name={holiday.toLowerCase()} />}
                    label={holiday}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Add
          </Button>
        </Grid>
      </form>
    </Layout>
  );
}
