//import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import CustomSelectField from "../components/fields/CustomSelectField";
import CustomTextField from "../components/fields/CustomTextField";
import Layout from "../components/Layout";
import { getFemaleBreeds, getMaleBreeds } from "../lib/breeds";
import { HOLIDAYS, LINEAGE_TYPES } from "../lib/constants";

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  generation: {
    alignSelf: "flex-start",
  },
}));

export default function Search() {
  //const router = useRouter();
  //const { breed } = router.query;

  const maleBreeds = getMaleBreeds();
  const femaleBreeds = getFemaleBreeds();

  const classes = useStyles();

  return (
    <Layout title="Search">
      <Typography variant="h2" component="h1">
        Search Database
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Use the form below to search the database for lineages.
      </Typography>
      <form noValidate autoComplete="off" className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <CustomSelectField
              id="male-breed"
              label="Male Breed"
              data={maleBreeds}
              getOptionLabel={(option) => option.name}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <CustomSelectField
              id="female-breed"
              label="Female Breed"
              data={femaleBreeds}
              getOptionLabel={(option) => option.name}
            />
          </Grid>
          <Grid item xs={3} md={2} className={classes.generation}>
            <CustomTextField id="generation" label="Generation" type="number" />
          </Grid>
          <Grid item xs={6} md={5}>
            <CustomSelectField id="type" label="Type" data={LINEAGE_TYPES} />
          </Grid>
          <Grid item xs={3} md={5}>
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
          <Grid item xs={12}>
            <CustomTextField id="owner" label="Owner" />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Search
          </Button>
        </Grid>
      </form>
    </Layout>
  );
}
