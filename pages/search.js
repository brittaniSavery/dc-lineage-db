import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import {
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  FormGroup,
  Checkbox,
  FormLabel,
  Grid,
  Button,
} from "@material-ui/core";
import {
  SEARCH_LINEAGES,
  HOLIDAYS,
  LINEAGE_TYPES,
  LINEAGE_SUB_TYPES,
} from "../lib/constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { getMaleBreeds, getFemaleBreeds } from "../lib/breeds";

const useStyles = makeStyles((theme) => ({
  submitButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  generation: {
    alignSelf: "flex-start",
  },
}));

export default function Search() {
  const router = useRouter();
  const { breed } = router.query;

  const maleBreeds = getMaleBreeds();
  const femaleBreeds = getFemaleBreeds();

  const classes = useStyles();

  return (
    <Layout title="Search">
      <Typography variant="h2" component="h1">
        {SEARCH_LINEAGES}
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Use the form below to search the database for lineages.
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={12} md={5}>
            <Autocomplete
              fullwidth
              id="male-breed"
              options={maleBreeds}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField {...params} label="Male Breed" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Typography component="div" align="center">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item xs>
                  And
                </Grid>
                <Grid item xs={6}>
                  <Switch
                    //checked={state.checkedB}
                    //onChange={handleChange}
                    id="conditional-search"
                    name="conditional"
                    color="primary"
                  />
                </Grid>
                <Grid item xs>
                  Or
                </Grid>
              </Grid>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Autocomplete
              fullwidth
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
          <Grid item xs={12} sm={12} md={6}>
            <Autocomplete
              id="type"
              options={LINEAGE_TYPES}
              renderInput={(params) => (
                <TextField {...params} label="Type" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Autocomplete
              id="subtype"
              options={LINEAGE_SUB_TYPES}
              renderInput={(params) => (
                <TextField {...params} label="Subtype" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={4} md={2} className={classes.generation}>
            <TextField
              fullWidth
              id="generation"
              label="Generation"
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={8} md={10}>
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
            Search
          </Button>
        </Grid>
      </form>
    </Layout>
  );
}
