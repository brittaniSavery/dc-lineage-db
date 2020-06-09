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
} from "@material-ui/core";
import { SEARCH_LINEAGES, HOLIDAYS, LINEAGE_TYPES } from "../lib/constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getMaleBreeds, getFemaleBreeds } from "../lib/breeds";

export default function Search() {
  const router = useRouter();
  const { breed } = router.query;

  const maleBreeds = getMaleBreeds();
  const femaleBreeds = getFemaleBreeds();

  return (
    <Layout title="Search">
      <Typography variant="h2" component="h1">
        {SEARCH_LINEAGES}
      </Typography>
      <Typography variant="h6" component="p">
        Use the form below to search the database for lineages.
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs sm>
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
            <FormControlLabel
              control={
                <Switch
                  //checked={state.checkedB}
                  //onChange={handleChange}
                  id="conditional-search"
                  name="conditional"
                  color="primary"
                />
              }
              label="AND/OR"
            />
          </Grid>
          <Grid item xs sm>
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
        </Grid>

        <Autocomplete
          id="type"
          options={LINEAGE_TYPES}
          renderInput={(params) => (
            <TextField {...params} label="Type" variant="outlined" />
          )}
        />
        <TextField
          id="generation"
          label="Generation"
          type="number"
          variant="outlined"
        />
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
      </form>
    </Layout>
  );
}
