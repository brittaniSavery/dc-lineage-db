import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CustomRadioGroup from "../components/fields/CustomRadioGroup";
import CustomSelectField from "../components/fields/CustomSelectField";
import CustomTextField from "../components/fields/CustomTextField";
import Layout from "../components/Layout";
import { getFemaleBreeds, getMaleBreeds } from "../lib/breeds";
import {
  ADD_LINEAGE,
  LINEAGE_SITES_STATUS,
  LINEAGE_TYPES,
} from "../lib/constants";

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
            <Typography variant="button" color="primary">
              Male Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomTextField
              required
              id="male-code"
              name="male-code"
              label="Male Code"
            />
          </Grid>
          <Grid item xs={8}>
            <CustomTextField
              id="male-name"
              name="male-name"
              label="Male Name"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelectField
              required
              id="male-breed"
              label="Male Breed"
              data={maleBreeds}
              getOptionLabel={(option) => option.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" color="primary">
              Female Information
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <CustomTextField
              required
              id="female-code"
              name="female-code"
              label="Female Code"
            />
          </Grid>
          <Grid item xs={8}>
            <CustomTextField
              id="female-name"
              name="female-name"
              label="Female Name"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelectField
              required
              id="female-breed"
              label="Female Breed"
              data={femaleBreeds}
              getOptionLabel={(option) => option.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="button" color="primary">
              Lineage Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelectField
              required
              id="type"
              label="Type"
              data={LINEAGE_TYPES}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <CustomTextField
              required
              id="generation"
              name="generaton"
              label="Generation"
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <CustomTextField
              id="offspring-code"
              name="offspring-code"
              label="Sample Offspring Code"
            />
          </Grid>
          <Grid item xs>
            <CustomRadioGroup
              id="cdc"
              label="CDC Entry"
              items={LINEAGE_SITES_STATUS}
            />
          </Grid>
          <Grid item xs>
            <CustomRadioGroup
              id="srogg"
              label="SROGG Entry"
              items={LINEAGE_SITES_STATUS}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField id="notes" label="Notes" multiline rows={4} />
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
